"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import euro from "@/lib/assets/Euro_Icons.png";
import { AnimatedCircularProgress } from "./AnimatedCircle";
import { getErrorMessage } from "@/lib/authUtils";
import { toast } from "react-toastify";
import { apiClient } from "@/lib/api-client";
import { useDashboardContext } from "@/context/DashboardContext";
import Loader from "../Loader";

type Transaction = {
  id: string;
  duration: string;
  assetName: string;
  tradedBalance: number;
  profitPercent: number;
  amount: number | string;
  tradingPlan: string;
  profitLimit: number;
};
type History = {
  transactions: Transaction[];
  nextCursorId: number | null;
  hasMore: boolean;
};
interface TradeStatusProps {
  onClose: () => void;
  duration: string;
  asset: string | undefined;
  profitPercent: number | undefined;
  tradedBalance: number;
  amount: string | number;
  tradingPlan: string;
  profitLimit: number;
  handleViewChange: (val: string) => void;
}

const TradeStatus: React.FC<TradeStatusProps> = ({
  onClose,
  duration,
  asset,
  profitPercent,
  tradedBalance,
  amount,
  tradingPlan,
  profitLimit,
  handleViewChange,
}) => {
  const { traderData } = useDashboardContext();
  const [reverse, setReverse] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [history, setHistory] = useState<History | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setReverse((prev) => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const initialMins = parseInt(duration.split("mins")[0].replace(/,/g, ""), 10);
  const [minutes, setMinutes] = useState(initialMins);
  const [seconds, setSeconds] = useState(60);
  useEffect(() => {
    fetchAutoTradeHistory();
    const interval = setInterval(() => {
      setSeconds((prevSec) => {
        if (prevSec === 0) {
          if (minutes > 0) {
            setMinutes((prevMins) => prevMins - 1);
            return 59;
          } else {
            clearInterval(interval);
            return 0;
          }
        }
        return prevSec - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [minutes]);


  const fetchAutoTradeHistory = async () => {
    try {
      const res = await apiClient.get(`trades/${traderData?.id}`);
      setHistory(res.data);
      setIsLoading(false);
    } catch (error) {
      const err = getErrorMessage(error);
      console.log(error);
      toast.error(err);
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="w-full h-full px-6 space-y-6 text-white">
      {history?.transactions.map((tx) => (
        <div
          key={tx.id}
          className="w-full bg-[#0f1c1b] rounded-xl px-4 py-6 space-y-4"
        >
          <div className="flex justify-between items-center gap-3">
            <AnimatedCircularProgress size={100} duration={1} reverse={reverse}>
              <div className="flex items-center justify-center text-sm font-medium">
                {minutes}:{seconds.toString().padStart(2, "0")}
              </div>
            </AnimatedCircularProgress>
            <div className="flex items-center gap-2 bg-[#1d2a28] px-4 py-2 rounded-lg text-xs">
              <Image src={euro} alt="euro" className="w-5 h-auto" />
              <div className="flex flex-col gap-1">
                <p className="text-white">{tx?.assetName || asset}</p>
                <span className="text-white/60 font-medium">
                  TP •{" "}
                  <span className="text-primary">
                    {tx?.profitPercent || profitPercent}%
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-white/60">Traded balance:</p>
            <p className="text-xl font-bold">
              ${tx?.tradedBalance.toFixed(2) || tradedBalance.toFixed(2)}
            </p>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-white/60">
              <span>Amount</span>
              <span className="text-white font-semibold">
                ${tx?.amount || Number(amount).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-white/60">
              <span>Trading Plan</span>
              <span className="text-white font-semibold">{tradingPlan}</span>
            </div>
            <div className="flex justify-between text-white/60">
              <span>Profit limit</span>
              <span className="text-white font-semibold">
                ${tx?.profitLimit.toFixed(2) || profitLimit.toFixed(2)}
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
