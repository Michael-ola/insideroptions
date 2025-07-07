"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import AssetCategorySelect from "@/components/dashboard-assets/AssetCategorySelect";
import AssetSearch from "@/components/dashboard-assets/AssetSearch";

import tradingAll from "@/data/trading/all.json";
import tradingCurrencies from "@/data/trading/currencies.json";
import tradingStocks from "@/data/trading/stocks.json";
import tradingCrypto from "@/data/trading/crypto.json";
import tradingCommodities from "@/data/trading/commodities.json";

import stocksAll from "@/data/stocks/all.json";

interface AssetModalProps {
  isOpen: boolean;
  onClose: () => void;
}
interface Asset {
  name: string;
  icon: string;
  change: number;
  profit: number;
}

export default function AssetModal({ isOpen, onClose }: AssetModalProps) {
  const [activeTab, setActiveTab] = useState<"trading" | "stocks">("trading");
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  const cardRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const out = (e: MouseEvent) =>
      cardRef.current &&
      !cardRef.current.contains(e.target as Node) &&
      onClose();
    document.addEventListener("keydown", esc);
    document.addEventListener("mousedown", out);
    return () => {
      document.removeEventListener("keydown", esc);
      document.removeEventListener("mousedown", out);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !listRef.current) return;
    const el = listRef.current;
    const wheel = (e: WheelEvent) => {
      const atTop = el.scrollTop === 0;
      const atBot = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
      if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBot))
        e.preventDefault();
      e.stopPropagation();
    };
    el.addEventListener("wheel", wheel, { passive: false });
    return () => el.removeEventListener("wheel", wheel);
  }, [isOpen]);

  const tradingMap: Record<string, Asset[]> = {
    all: tradingAll,
    currencies: tradingCurrencies,
    stocks: tradingStocks,
    crypto: tradingCrypto,
    commodities: tradingCommodities,
  };

  const activeAssets: Asset[] =
    activeTab === "trading" ? tradingMap[category] ?? [] : stocksAll;

  const visibleAssets = activeAssets.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  const tradingOptions = [
    { value: "all", label: "All Market" },
    { value: "currencies", label: "Currencies" },
    { value: "stocks", label: "Stocks" },
    { value: "crypto", label: "Crypto" },
    { value: "commodities", label: "Commodities" },
  ];

  if (!isOpen) return null;

  return (
    <div
      ref={cardRef}
      className="absolute top-15 max-sm:-top-1 max-sm:w-[80vw] max-sm:fixed max-sm:h-[70vh] inset-0 max-sm:-left-[35vw] z-[60] pb-10 flex flex-col w-[293px] md:w-[320px] h-[80vh]
                 overflow-hidden rounded-2xl text-sm ring-1 ring-white/10"
    >
      <div className="absolute inset-0 -z-10">
        <div className="bg-[#050d15] h-[90%] max-sm:backdrop-blur-sm max-sm:bg-transparent" />
        <div className="h-[10%] backdrop-blur-sm" />
      </div>

      <div className="flex items-center justify-center relative px-6 py-3.5">
        <h2 className="text-lg font-semibold">Asset list</h2>
        <button
          onClick={onClose}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition cursor-pointer"
        >
          <IoClose size={20} />
        </button>
      </div>

      <div className="flex gap-6 px-6 mt-1">
        {(["trading", "stocks"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setCategory("all");
            }}
            className={`relative pb-2 font-medium transition ${
              activeTab === tab
                ? "text-white"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            {tab === "trading" ? "Trading" : "Stocks"}
            {activeTab === tab && (
              <span className="absolute left-0 -bottom-[1px] h-[2px] w-full rounded-full bg-green-500" />
            )}
          </button>
        ))}
      </div>

      <div className="px-6 space-y-3 mt-4">
        {activeTab === "trading" && (
          <AssetCategorySelect
            value={category}
            onChange={setCategory}
            options={tradingOptions}
          />
        )}
        <AssetSearch value={search} onChange={setSearch} />
      </div>

      <div className="mt-5 px-6 pb-2 flex text-neutral-500 text-xs font-medium cursor-default">
        <span className="flex-1">Pair</span>
        <span className="w-25">24h change</span>
        <span className="w-12 text-center">Profit</span>
      </div>

      <ul
        ref={listRef}
        className="thin-dark-scrollbar flex-1 overflow-y-auto overscroll-contain px-1 pb-6"
      >
        {visibleAssets.map(({ name, icon, change, profit }, idx) => {
          const up = change >= 0;
          return (
            <li
              key={name}
              className="relative flex items-center gap-3 px-6 py-[14px] hover:bg-white/5 cursor-default"
            >
              <div
                className={`absolute left-[8%] right-[8%] bottom-0 h-px bg-white/3 ${
                  idx === visibleAssets.length - 1 ? "hidden" : ""
                }`}
              />
              <div className="relative h-5 w-5 shrink-0">
                <Image
                  src={icon}
                  alt={name}
                  fill
                  sizes="20px"
                  className="object-contain"
                />
              </div>
              <span className="flex-1">{name}</span>
              <span
                className={`w-15 text-center rounded-md px-0.5 py-2 text-xs font-medium ${
                  up ? "bg-[#43B75D] text-white" : "bg-[#EE443F] text-white"
                }`}
              >
                {up ? "+" : ""}
                {change.toFixed(2)}%
              </span>
              <span className="w-12 text-right font-semibold text-[#00C06B]">
                {profit}%
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
