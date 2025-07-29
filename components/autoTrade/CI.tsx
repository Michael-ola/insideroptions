"use client";

import { useState } from "react";
import Image from "next/image";
import { useDashboardContext } from "@/context/DashboardContext";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Icon } from "@iconify/react";
import euro from "@/lib/assets/Euro_Icons.png";
import { plans } from "./TradingPlan";
import { assets } from "./Assets";
import TradeStatus from "./TradeStatus";

const CI = ({
  onClose,
  handleViewChange,
  tradingPlan,
  selectedAsset,
  setSelectedTradeOption,
  selectedTradeOption,
  setAmount,
  amount,
  setIsStartAutoTrade,
  showTradeStatus,
}: {
  onClose: () => void;
  handleViewChange: (val: string) => void;
  tradingPlan: string;
  selectedAsset: string;
  setSelectedTradeOption: (val: string) => void;
  selectedTradeOption: string;
  setAmount: (val: string | number) => void;
  amount: string | number;
  setIsStartAutoTrade: (val: boolean) => void;
  showTradeStatus: boolean;
}) => {
  const { traderData } = useDashboardContext();
  const [selectedBalance, setSelectedBalance] = useState<string>("demo");

  const plan = plans.find((plan) => plan.name === tradingPlan);
  const asset = assets.find((asset) => asset.name === selectedAsset);

  const realAccount = traderData?.accounts.find(
    (account) => account.accountType === "INDIVIDUAL"
  );
  const demoAccount = traderData?.accounts.find(
    (account) => account.accountType === "DEMO"
  );

  const timeOptions = [
    "43,200 mins/30days/15%",
    "129,600 mins/90days/18%",
    "259,200 mins/180days/22%",
  ];

  const mins = selectedTradeOption.split("/")[0];

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "" || /^\d*\.?\d{0,2}$/.test(val)) {
      setAmount(val);
    }
  };
  const profitValue = "300";
  return (
    <div className="px-8 pt-6 w-full h-full overflow-y-auto custom-scrollbar">
      {!showTradeStatus && (
        <div className="space-y-8">
          <div className="flex gap-6">
            <div
              onClick={() => setSelectedBalance("demo")}
              className={`flex-1 cursor-pointer bg-[#0a0f17] px-6 py-4.5 rounded-xl text-center ${
                selectedBalance === "demo"
                  ? "border border-primary/80"
                  : "border border-white/10"
              }`}
            >
              <div className="text-sm text-white/60">Demo Balance</div>
              <div className="font-semibold text-lg">
                ${demoAccount?.accountBalance.toFixed(2)}
              </div>
            </div>
            <div
              onClick={() => setSelectedBalance("real")}
              className={`flex-1 cursor-pointer bg-[#0a0f17] px-6 py-4.5 rounded-xl text-center ${
                selectedBalance === "real"
                  ? "border border-primary/80"
                  : "border border-white/10"
              }`}
            >
              <div className="text-sm text-white/60">Real Balance</div>
              <div className="font-semibold text-lg">
                ${realAccount?.accountBalance.toFixed(2)}
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm mb-1 block text-white">Amount</label>
            <input
              type="text"
              name="amount"
              placeholder="$"
              value={amount}
              onChange={handleAmount}
              className="w-full bg-transparent outline-none text-sm border border-white/5 rounded-xl py-3 px-4 text-white placeholder:text-white/30 placeholder:text-sm focus:border-0 focus:ring-1 focus-within:ring-primary"
            />
          </div>

          <div>
            <label className="text-sm mb-1 block text-white">Time</label>
            <div className="space-y-2">
              {timeOptions.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedTradeOption(opt);
                  }}
                  className={`w-full relative bg-[#EEFFEF]/3 py-2 rounded-lg text-sm text-white text-center hover:bg-[#EEFFEF]/5 ${
                    selectedTradeOption === opt && "border border-primary"
                  }`}
                >
                  {opt}
                  {selectedTradeOption === opt && (
                    <Icon
                      icon="tdesign-secured"
                      width="12px"
                      height="12px"
                      className="text-primary absolute -top-1 right-[5%] z-10"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm mb-2 block text-white/70">
              Trading Asset
            </label>
            <button
              onClick={() => handleViewChange("Asset List")}
              className="w-full flex items-center justify-between bg-[#10171c] border border-white/5 px-6 py-2 rounded-lg text-sm"
            >
              <div className="w-full flex items-center gap-3">
                <Image src={euro} alt="euro" className="w-5 h-auto" />
                <span className="flex flex-col items-center">
                  {asset?.name}{" "}
                  <span className="text-white/60 font-medium">
                    TP + <span className="text-primary">{asset?.profit}%</span>
                  </span>
                </span>
              </div>
              <ChevronRight size={18} className="text-white" />
            </button>
          </div>

          <div className="bg-white/3 rounded-lg py-3 flex flex-col gap-2 shadow-xs">
            <div className="w-full flex justify-center items-center gap-3">
              <Icon
                icon="fluent-mdl2:diet-plan-notebook"
                width="12px"
                height="12px"
                className="text-white"
              />
              <label className="text-base text-white">Trading Plan</label>
            </div>
            <div className="w-full px-3 py-1">
              <button
                onClick={() => handleViewChange("Trading Plan")}
                className={`w-full flex items-center gap-2 bg-[#EEFFEF]/5 rounded-lg ${
                  tradingPlan
                    ? "justify-items-start px-3 py-1"
                    : "justify-center py-3"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {tradingPlan && plan && (
                    <Image
                      src={plan.logo}
                      alt={plan.name}
                      className="w-6 h-6"
                    />
                  )}
                  <div className="flex flex-col gap-0.6 items-start">
                    <span>{tradingPlan || "Select category"}</span>
                    {tradingPlan && plan && (
                      <span className={`${plan.color} text-xs`}>
                        {plan.rate}% interest
                      </span>
                    )}
                  </div>
                  {!tradingPlan && <ChevronDown />}
                </div>
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm mb-1 block text-white/70">
              Profit limit
            </label>
            <input
              type="text"
              name="amount"
              value={`${profitValue}`}
              disabled
              placeholder="$300"
              className="w-full bg-transparent border border-white/10 rounded-md py-2 px-3 text-white placeholder:text-white/30"
            />
          </div>

          <button
            disabled={!tradingPlan && !amount && !profitValue && !selectedAsset}
            onClick={() => setIsStartAutoTrade(true)}
            className="w-full bg-primary text-black font-semibold px-6 py-3 rounded-xl hover:bg-gradient-to-tr  from-primary to-[#b4e6b8] transition"
          >
            Start Auto Trade
          </button>
        </div>
      )}
      {showTradeStatus && (
        <TradeStatus
          onClose={onClose}
          duration={mins}
          asset={asset?.name}
          tradedBalance={800}
          profitPercent={asset?.profit}
          amount={amount}
          tradingPlan={tradingPlan}
          profitLimit={Number(profitValue)}
        />
      )}
    </div>
  );
};

export default CI;
