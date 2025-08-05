"use client";

import { useState } from "react";
import { Asset } from "./AutoTradeModal";
// import Image from "next/image";

interface AssetRowProps {
  id: number;
  assetName: string;
  symbol: string;
  assetType: "STOCK" | "CRYPTO" | "FOREX" | string;
  basePrice: number;
  description: string;
  imageUrl: string;
  createdDate: string;
  lastModifiedDate: string;
  change: number;
  profit: number;
  status: "ACTIVE" | "INACTIVE" | string;
  onClick?: () => void;
}

const AssetRow: React.FC<AssetRowProps> = ({
  // imageUrl,
  assetName,
  change,
  profit,
  onClick,
}) => {
  const isPositive = change > 0;

  return (
    <div
      onClick={onClick}
      className="w-full px-8 flex items-center justify-between py-3 border-b border-white/5 last:border-0 cursor-pointer"
    >
      <div className="flex items-center gap-3 w-3/5">
        {/* <Image
          src={imageUrl}
          alt={assetName}
          className="w-6 h-6 object-contain"
        /> */}
        <span className="text-sm text-white">{assetName}</span>
      </div>

      <div className="w-2/5 text-center flex items-center gap-3">
        <span
          className={`text-sm text-center text-white font-medium px-4 py-2 rounded-lg ${
            isPositive ? "bg-[#44b85d]" : "bg-[#ed443e]"
          }`}
        >
          {`${isPositive ? "+" : ""}${change.toFixed(2)}%`}
        </span>
        <div className="w-1/4 text-right text-green-400 font-semibold text-sm">
          {profit}%
        </div>
      </div>
    </div>
  );
};

const Assets = ({
  handleViewChange,
  setAsset,
  assets,
}: {
  handleViewChange: (val: string) => void;
  setAsset: (val: string) => void;
  assets: Asset[] | null;
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const handleToggle = () => {
    const wasChecked = isChecked;
    setIsChecked((prev) => !prev);

    setTimeout(() => {
      if (!wasChecked) {
        choseHighestProfitAsset();
      }
    }, 800);
  };

  const choseHighestProfitAsset = () => {
    if (assets?.length === 0) return null;
    if (assets) {
      const maxProfit = Math.max(...assets.map((asset) => asset.profit));

      const topAssets = assets?.filter((asset) => asset.profit === maxProfit);

      const randomIndex = Math.floor(Math.random() * (topAssets?.length ?? 0));
      if (topAssets) {
        setAsset(topAssets[randomIndex]?.assetName);
      }
    }
    handleViewChange("Current Investment");
  };
  return (
    <section className="w-full h-full text-white rounded-xl flex flex-col gap-6 overflow-y-hidden">
      {/* Header */}
      <div className="w-full px-8 flex flex-col gap-3">
        <div className="w-full flex items-center justify-between">
          <div className="w-full flex-1">
            <h2 className="text-sm font-semibold">Auto selection</h2>
            <p className="text-[10px] max-w-[135px] text-white/60 text-left break-words">
              Chooses the asset with the highest profit percentage.
            </p>
          </div>
          <div
            onClick={handleToggle}
            role="switch"
            aria-checked={isChecked}
            tabIndex={0}
            // onKeyDown={(e) =>
            //   (e.key === "Enter" || e.key === " ") && handleToggle()
            // }
            className={`relative inline-flex items-center w-[42px] h-6 transition-all duration-300 rounded-full cursor-pointer border-4 ${
              isChecked ? "border-green-400" : "border-gray-400"
            }`}
          >
            <div
              className={`absolute top-[3px] left-[1px] h-3 w-3 rounded-full border-3 transition-all duration-300 ${
                isChecked
                  ? "translate-x-[calc(100%+6px)] border-green-400"
                  : "translate-x-0.5 border-gray-400"
              }`}
            ></div>
          </div>
        </div>
        {/* Table Header */}
        <div className="w-full flex items-center justify-between text-base text-white/60 pb-2">
          <span className="w-3/5">Pair</span>
          <div className="w-2/5 flex items-center gap-3">
            <span className="text-left whitespace-nowrap">24h change</span>
            <span className="text-right">Profit</span>
          </div>
        </div>
      </div>

      {/* Asset Rows */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {assets &&
          assets.map((asset, idx) => (
            <AssetRow
              key={idx}
              onClick={() => {
                setAsset(asset.assetName);
                handleViewChange("Current Investment");
              }}
              {...asset}
            />
          ))}
      </div>
    </section>
  );
};

export default Assets;
