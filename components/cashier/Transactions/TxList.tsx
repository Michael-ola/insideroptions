import React, { useRef, useState } from "react";
import bank from "@/lib/assets/bank_transfer.png";
import btc from "@/lib/assets/btc.png";
import withdraw from "@/lib/assets/scroll.png";
import swap from "@/lib/assets/swap.png";
import mask from "@/lib/assets/mask_deposit.png";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { ModalView } from "../cashierModal";
import filter from "@/lib/assets/Filter.png";
import { Transaction } from "../cashierModal";

const TxList = ({
  handleViewChange,
  transactions,
  fetchMore,
  hasMore,
}: {
  handleViewChange: (view: ModalView) => void;
  transactions: Transaction[];
  fetchMore: () => void;
  hasMore: boolean;
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const iconList = [
    { label: "Bank Deposit", src: bank },
    { label: "Bank Withdrawal", src: withdraw },
    { label: "Deposit", src: btc },
    { label: "Withdrawal", src: btc },
    { label: "Swap (Real – Profit)", src: swap },
  ];

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container || loading || !hasMore) return;

    const nearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <
      100;
    if (nearBottom) {
      setLoading(true);
      fetchMore();
      setTimeout(() => setLoading(false), 500);
    }
  };

  return (
    <div
      className="space-y-4 w-full h-full flex-1 overflow-y-auto px-4 py-4"
      ref={containerRef}
      onScroll={handleScroll}
    >
      <div className="flex justify-end">
        <div
          onClick={() => handleViewChange("Filters")}
          className="border border-primary/30 rounded-[8px] p-4"
        >
          <Image src={filter} alt="Filter" />
        </div>
      </div>
      <div className="w-full h-full pb-6">
        {transactions.length ? (
          transactions.map((tx, i) => (
            <div
              key={i}
              className="flex gap-3 items-start border-b border-white/10 pb-2"
            >
              {(() => {
                const icon = iconList.find(
                  (item) =>
                    item.label === tx.type || tx.type.includes(item.label)
                );
                return icon ? (
                  <Image src={icon.src} alt={icon.label} priority />
                ) : null;
              })()}

              <div className="flex-1">
                <p className="text-white font-semibold">{tx.type}</p>
                <p className="text-white/50 text-xs">{tx.pair}</p>
                <p className="text-white/30 text-xs">Txn hash ID: {tx.id}</p>
              </div>

              <div className="text-right">
                <p
                  className={`font-bold text-sm ${
                    tx.amount.includes("+") && tx.status === "confirmed"
                      ? "text-primary"
                      : tx.amount.includes("+") && tx.status === "pending"
                      ? "text-[#F49A47]"
                      : "text-[#F54B5F]"
                  }`}
                >
                  {tx.amount}
                </p>
                <span
                  className={`text-xs py-1 px-2 rounded-md capitalize ${
                    tx.status === "confirmed"
                      ? "text-primary bg-primary/30"
                      : tx.status === "pending"
                      ? "text-[#F49A47] bg-[#F49A47]/20"
                      : "text-[#F54B5F] bg-[#F54B5F]/20"
                  }`}
                >
                  {tx.status}
                </span>
                <p className="text-white/30 text-[10px]">
                  {tx.date} <br />
                  {tx.time}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-12">
            <Image src={mask} alt="mask" priority />
            <div className="text-gray-400 text-xs text-center space-y-1">
              <p>Transaction is empty</p>
              <p
                onClick={() => handleViewChange("Deposit")}
                className="text-primary text-base font-semibold flex items-center gap-2"
              >
                Make a Deposit <ChevronRight className="w-4 h-4" />
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TxList;
