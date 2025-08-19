"use client";

import { X, ChevronUp, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import OrdersIcon from "../icons/OrdersIcon";
import { motion } from "framer-motion";
import PortalWrapper from "@/components/PortalWrapper";
import OrdersHistoryModal from "./OrdersHistoryModal";
import { useDashboardContext } from "@/context/DashboardContext";
import { getOrderHistoryByAccountId } from "@/services/orderService";
import Loader from "@/components/Loader";

interface NormalizedOrder {
  tradeId?: number;
  assetId?: number;
  tradeType: "BUY" | "SELL";
  initiatedDate: string;
  entryPrice?: number | null;
  tradeAmount: number;
  stake?: number;
  tradeProfit?: number | null;
  raw?: any;
}

type OrdersSection = [string, NormalizedOrder[]];

const pad = (n: number) => n.toString().padStart(2, "0");

const ordinal = (n: number) => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

const formatDateLabel = (dateStr: string) => {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) {
      const maybe = String(dateStr).split("T")[0];
      const d2 = new Date(maybe);
      if (isNaN(d2.getTime())) return String(dateStr);
      const day = d2.getDate();
      const monthName = d2.toLocaleString("en-US", { month: "long" });
      const year = d2.getFullYear();
      return `${ordinal(day)} ${monthName} ${year}`;
    }
    const day = d.getDate();
    const monthName = d.toLocaleString("en-US", { month: "long" });
    const year = d.getFullYear();
    return `${ordinal(day)} ${monthName} ${year}`;
  } catch {
    return String(dateStr);
  }
};

const formatTimeOnly = (dateTimeStr: string) => {
  if (!dateTimeStr) return "";
  const timeOnlyRegex = /^\d{1,2}:\d{2}(:\d{2})?$/;
  if (timeOnlyRegex.test(dateTimeStr)) {
    const parts = dateTimeStr.split(":");
    const hh = pad(Number(parts[0]));
    const mm = pad(Number(parts[1] ?? 0));
    const ss = pad(Number(parts[2] ?? 0));
    return `${hh}:${mm}:${ss}`;
  }

  try {
    const d = new Date(dateTimeStr);
    if (!isNaN(d.getTime())) {
      const hh = pad(d.getHours());
      const mm = pad(d.getMinutes());
      const ss = pad(d.getSeconds());
      return `${hh}:${mm}:${ss}`;
    }

    if (String(dateTimeStr).includes("T")) {
      const part = String(dateTimeStr).split("T")[1] ?? "";
      const timePart = part.split(".")[0];
      if (timeOnlyRegex.test(timePart)) return timePart;
    }

    return String(dateTimeStr);
  } catch {
    return String(dateTimeStr);
  }
};

const mergeSections = (
  existing: OrdersSection[],
  incoming: OrdersSection[]
) => {
  const map = new Map<string, NormalizedOrder[]>();
  for (const [dateLabel, orders] of existing) {
    map.set(dateLabel, [...orders]);
  }
  for (const [dateLabel, orders] of incoming) {
    const cur = map.get(dateLabel) ?? [];
    map.set(dateLabel, [...cur, ...orders]);
  }
  const result: OrdersSection[] = [];
  const added = new Set<string>();
  for (const [dateLabel] of existing) {
    const orders = map.get(dateLabel) ?? [];
    result.push([dateLabel, orders]);
    added.add(dateLabel);
  }
  for (const [dateLabel] of incoming) {
    if (!added.has(dateLabel)) {
      result.push([dateLabel, map.get(dateLabel) ?? []]);
      added.add(dateLabel);
    }
  }
  return result;
};

const OrdersModal = ({ onClose }: { onClose: () => void }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const { traderData } = useDashboardContext();
  const [ordersData, setOrdersData] = useState<OrdersSection[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  // per-account pagination state
  const accountPagingRef = useRef<
    Record<
      number,
      {
        nextCursor: string | null;
        hasMore: boolean;
        loading: boolean;
      }
    >
  >({});

  const listRef = useRef<HTMLDivElement | null>(null);

  // prevent body scroll while modal is mounted
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // initial load (first page for each individual account)
  useEffect(() => {
    if (!traderData?.accounts || traderData.accounts.length === 0) return;

    let cancelled = false;
    setLoading(true);
    setOrdersData([]);

    const individualAccounts = traderData.accounts.filter(
      (account) => account.accountType === "INDIVIDUAL"
    );

    const fetchInitial = async () => {
      try {
        const allSections: OrdersSection[] = [];
        const pagingState: typeof accountPagingRef.current = {};

        for (const account of individualAccounts) {
          // call service without cursor for first page
          const res = await getOrderHistoryByAccountId(account.id, null);

          if (!res || !res.data) {
            pagingState[account.id] = {
              nextCursor: null,
              hasMore: false,
              loading: false,
            };
            continue;
          }

          const entries = Object.entries(res.data || {}) as [string, any[]][];

          for (const [dateKey, ordersArray] of entries) {
            const normalized: NormalizedOrder[] = (ordersArray || []).map(
              (ord) => {
                const direction = (ord.direction || ord.tradeType || "down")
                  .toString()
                  .toLowerCase();
                const tradeType =
                  direction === "up" || direction === "buy" ? "BUY" : "SELL";

                const stakeValue = Number(
                  ord.stake ?? ord.amount ?? ord.tradeAmount ?? 0
                );
                const tradeAmountValue = Number(
                  ord.tradeAmount ?? ord.profit ?? ord.amount ?? 0
                );

                const entryPrice = ord.entryPrice ?? ord.openRate ?? null;
                const tradeProfit = ord.tradeProfit ?? ord.profit ?? null;
                const rawInitiated =
                  ord.initiatedDate ?? ord.time ?? ord.createdAt ?? "";
                const initiatedDate = formatTimeOnly(rawInitiated);

                return {
                  tradeId: ord.tradeId ?? undefined,
                  assetId: ord.assetId ?? undefined,
                  tradeType,
                  initiatedDate,
                  entryPrice,
                  tradeAmount: Number(tradeAmountValue) || 0,
                  stake: Number(stakeValue) || 0,
                  tradeProfit:
                    tradeProfit != null ? Number(tradeProfit) : undefined,
                  raw: ord,
                };
              }
            );

            const formattedDateLabel = formatDateLabel(dateKey);
            allSections.push([formattedDateLabel, normalized]);
          }

          pagingState[account.id] = {
            nextCursor: res.nextCursorId ?? null,
            hasMore: !!res.hasMore,
            loading: false,
          };
        }

        if (!cancelled) {
          setOrdersData(allSections);
          accountPagingRef.current = pagingState;
        }
      } catch (err) {
        console.error("Failed to fetch order history", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchInitial();
    return () => {
      cancelled = true;
    };
  }, [traderData]);

  // find first account id with hasMore true and not currently loading
  const getNextAccountToPage = () => {
    const state = accountPagingRef.current;
    for (const accIdStr of Object.keys(state)) {
      const accId = Number(accIdStr);
      if (state[accId] && state[accId].hasMore && !state[accId].loading) {
        return accId;
      }
    }
    return null;
  };

  const fetchNextPage = useCallback(async () => {
    const nextAccountId = getNextAccountToPage();
    if (!nextAccountId) return;
    const state = accountPagingRef.current;
    const cursor = state[nextAccountId].nextCursor ?? null;

    state[nextAccountId].loading = true;
    setLoadingMore(true);

    try {
      const res = await getOrderHistoryByAccountId(nextAccountId, cursor);
      if (!res || !res.data) {
        state[nextAccountId].hasMore = false;
        state[nextAccountId].nextCursor = null;
        return;
      }

      // Normalize incoming sections
      const incomingSections: OrdersSection[] = [];
      const entries = Object.entries(res.data || {}) as [string, any[]][];
      for (const [dateKey, ordersArray] of entries) {
        const normalized: NormalizedOrder[] = (ordersArray || []).map((ord) => {
          const direction = (ord.direction || ord.tradeType || "down")
            .toString()
            .toLowerCase();
          const tradeType =
            direction === "up" || direction === "buy" ? "BUY" : "SELL";

          const stakeValue = Number(
            ord.stake ?? ord.amount ?? ord.tradeAmount ?? 0
          );
          const tradeAmountValue = Number(
            ord.tradeAmount ?? ord.profit ?? ord.amount ?? 0
          );

          const entryPrice = ord.entryPrice ?? ord.openRate ?? null;
          const tradeProfit = ord.tradeProfit ?? ord.profit ?? null;
          const rawInitiated =
            ord.initiatedDate ?? ord.time ?? ord.createdAt ?? "";
          const initiatedDate = formatTimeOnly(rawInitiated);

          return {
            tradeId: ord.tradeId ?? undefined,
            assetId: ord.assetId ?? undefined,
            tradeType,
            initiatedDate,
            entryPrice,
            tradeAmount: Number(tradeAmountValue) || 0,
            stake: Number(stakeValue) || 0,
            tradeProfit: tradeProfit != null ? Number(tradeProfit) : undefined,
            raw: ord,
          };
        });

        incomingSections.push([formatDateLabel(dateKey), normalized]);
      }

      // Merge into existing sections
      setOrdersData((prev) => mergeSections(prev, incomingSections));

      // update paging state for this account
      state[nextAccountId].nextCursor = res.nextCursorId ?? null;
      state[nextAccountId].hasMore = !!res.hasMore;
    } catch (err) {
      console.error("Failed to fetch next page for orders", err);
    } finally {
      state[nextAccountId].loading = false;
      setLoadingMore(false);
    }
  }, []);

  // onScroll handler to trigger next page when near bottom
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const threshold = 300;
        const atBottom =
          el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
        if (atBottom && !loadingMore) {
          fetchNextPage();
        }
        ticking = false;
      });
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [fetchNextPage, loadingMore]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed side-nav-modal-offset inset-0 bg-black/20 z-50 w-screen cursor-default max-sm:left-0 max-sm:bg-[#000510]"
    >
      <div className="relative top-0 bottom-0 max-h-full h-full left-0 w-[25%] flex flex-col backdrop-blur-sm pt-3 max-sm:w-full">
        <div className="flex justify-between items-center px-4 py-3 text-white text-sm pl-8">
          <button onClick={onClose}>
            <Image
              src="/images/left.png"
              alt="Left Arrow"
              width={5}
              height={5}
              className="w-2 h-[14px] text-white"
            />
          </button>
          <OrdersIcon className="w-5 h-5 ml-8 transition-colors duration-150 max-sm:mt-2" />
          <div className="text-lg font-medium mr-auto ml-5">Orders</div>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-white max-sm:hidden" />
          </button>
        </div>

        <div
          ref={listRef}
          className="flex-1 overflow-y-auto text-white px-6 pb-10 mt-4 space-y-5 custom-scrollbar"
        >
          {loading ? (
            <Loader className="w-full h-28" />
          ) : ordersData.length > 0 ? (
            ordersData.map((section, index) => {
              const dateLabel = section[0];
              const orders = section[1];
              return (
                <div key={dateLabel + "-" + index}>
                  <div className="text-sm text-white/60 mb-2">{dateLabel}</div>

                  {orders.map((order, i) => (
                    <div
                      key={
                        order.tradeId ??
                        `${dateLabel}-${i}-${order.initiatedDate}`
                      }
                      className="border-b border-white/10 py-2 flex items-center justify-between cursor-pointer"
                      onClick={() => {
                        setSelectedOrder(order.raw ?? order);
                        setOpenModal(true);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        {order.tradeType === "BUY" ? (
                          <ChevronUp className="text-green-400 w-6 h-6" />
                        ) : (
                          <ChevronDown className="text-red-400 w-6 h-6" />
                        )}

                        <div className="flex flex-col">
                          <span className="text-md">
                            {order.raw.pair ?? "—"}
                          </span>
                          <span className="text-sm text-white/40">
                            {order.initiatedDate}
                          </span>
                          {order.entryPrice != null && (
                            <span className="text-[10px] text-white/30">
                              Entry price: {order.entryPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-md">
                          +${(order.tradeAmount ?? 0).toFixed(2)}
                        </div>
                        <div className="text-white/40 text-sm">
                          ${(order.stake ?? 0).toFixed(2)}
                        </div>
                      </div>

                      {order.tradeProfit != null && (
                        <div className="ml-2 text-sm pl-7 pr-3 flex flex-col items-end gap-1 justify-center text-left py-1 h-16 bg-[#1c1216] relative -bottom-[9.8px] text-[#fff] border-l-2 border-b-2 border-[#2f2629]">
                          <span>Close</span>
                          <div className="text-green-400 text-sm">
                            ${order.tradeProfit.toFixed(2)}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              );
            })
          ) : (
            <div className="flex flex-col h-full items-center justify-center gap-2">
              <Image
                src="/images/emptyOrders.png"
                alt="emptyOrders"
                width={72}
                height={72}
                className="w-[72px] h-[72px] text-white mb-6"
              />
              <p className="text-sm text-white/80">Nothing to display yet</p>
              <div
                className="flex items-center justify-center gap-2 cursor-pointer"
                onClick={onClose}
              >
                <span className="text-[#79DA7E]">Place a Trade</span>
                <Image
                  src="/images/right-green.png"
                  alt="Left Arrow"
                  width={5}
                  height={5}
                  className="w-1 h-2"
                />
              </div>
            </div>
          )}

          {loadingMore && (
            <div className="flex items-center justify-center py-3">
              <Loader className="w-10 h-10" />
            </div>
          )}
        </div>
      </div>

      <PortalWrapper>
        <OrdersHistoryModal
          isOpen={openModal}
          onClose={() => {
            setOpenModal(false);
            setSelectedOrder(null);
          }}
          order={selectedOrder}
        />
      </PortalWrapper>
    </motion.div>
  );
};

export default OrdersModal;
