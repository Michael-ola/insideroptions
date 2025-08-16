"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import euro from "@/lib/assets/Euro_Icons.png";
import { AnimatedCircularProgress } from "./AnimatedCircle";
import { apiClient } from "@/lib/api-client";
import { useDashboardContext } from "@/context/DashboardContext";
import { Asset } from "./AutoTradeModal";
import Loader from "../Loader";

export type History = {
  id: number;
  entryPrice: number;
  assetId: number;
  duration: string;
  tradedBalance: number;
  tradeAmount: number;
  tradingPlan: string;
  tradeProfit: number | null;
  initiatedDate: Date;
  expiryDate: Date;
  durationDays: number | null;
  profitValue: number | null;
};

interface TradeStatusProps {
  onClose: () => void;
  handleViewChange: (val: string) => void;
}

const TradeStatus: React.FC<TradeStatusProps> = ({
  onClose,
  handleViewChange,
}) => {
  const { activeAutoTrade } = useDashboardContext();
  const [reverse, setReverse] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [assets, setAssets] = useState<Asset[] | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setReverse((prev) => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const [countdowns, setCountdowns] = useState<{
    [id: string]: { mins: number; secs: number };
  }>({});

  useEffect(() => {
    getAssetLists();
    const timers: NodeJS.Timeout[] = activeAutoTrade.map((tx: History) => {
      const expiry = new Date(tx.expiryDate);
      return setInterval(() => {
        const now = new Date();
        const diffMs = expiry.getTime() - now.getTime();
        const totalSeconds = Math.max(Math.floor(diffMs / 1000), 0);

        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;

        setCountdowns((prev) => ({
          ...prev,
          [tx.id]: { mins, secs },
        }));
      }, 1000);
    });

    return () => timers.forEach((t) => clearInterval(t));
  }, []);

  const getAssetLists = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.get("/assets/");
      setAssets(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getAssetName = (assetId: number) => {
    const asset = assets?.find((asset: Asset) => asset.id === assetId);
    return asset ? asset.assetName : "Unknown Asset";
  };

  const getAssetProfitPercent = (assetId: number) => {
    const asset = assets?.find((asset: Asset) => asset.id === assetId);
    return asset ? asset.profit : "Unknown Asset";
  };

  if (isLoading) return <Loader />;

  return (
    <div className="w-full h-full px-6 space-y-6 text-white">
      {activeAutoTrade?.map((tx) => (
        <div
          key={tx.id}
          className="w-full bg-[#0f1c1b] rounded-xl px-4 py-6 space-y-4"
        >
          <div className="flex justify-between items-center gap-3">
            <AnimatedCircularProgress size={100} duration={1} reverse={reverse}>
              <div className="flex items-center justify-center text-sm font-medium">
                {countdowns[tx.id]?.mins ?? 0}:
                {(countdowns[tx.id]?.secs ?? 0).toString().padStart(2, "0")}
              </div>
            </AnimatedCircularProgress>
            <div className="flex items-center gap-2 bg-[#1d2a28] px-4 py-2 rounded-lg text-xs">
              <Image src={euro} alt="euro" className="w-5 h-auto" />
              <div className="flex flex-col gap-1">
                <p className="text-white">{getAssetName(tx?.assetId)}</p>
                <span className="text-white/60 font-medium">
                  TP •{" "}
                  <span className="text-primary">
                    {getAssetProfitPercent(tx?.assetId)}%
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-white/60">Traded balance:</p>
            <p className="text-xl font-bold">
              ${tx?.tradeProfit?.toFixed(2) || "0.00"}
            </p>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-white/60">
              <span>Amount</span>
              <span className="text-white font-semibold">
                ${tx?.tradeAmount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-white/60">
              <span>Trading Plan</span>
              <span className="text-white font-semibold">
                {tx?.tradingPlan}
              </span>
            </div>
            <div className="flex justify-between text-white/60">
              <span>Profit limit</span>
              <span className="text-white font-semibold">
                ${tx?.profitValue?.toFixed(2) || "0.00"}
              </span>
            </div>
          </div>
        </div>
      ))}

      <div className="w-full flex flex-col sm:flex-row justify-between gap-4">
        <button
          onClick={() => onClose()}
          className="w-full border border-primary rounded-xl px-6 py-3 text-primary hover:bg-green-400/10 transition whitespace-nowrap"
        >
          Show chart
        </button>
        <button className="w-full bg-[#0f1c1b] text-white/60 py-3 px-6 rounded-xl cursor-not-allowed whitespace-nowrap">
          Stop Auto trade
        </button>
      </div>

      <div className="text-center">
        <button
          onClick={() => handleViewChange("History")}
          className="text-primary text-sm mt-8 font-medium hover:text-green-300"
        >
          View trade history
        </button>
      </div>
    </div>
  );
};

export default TradeStatus;
