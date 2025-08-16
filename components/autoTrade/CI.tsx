"use client";

import Image from "next/image";
import { useDashboardContext } from "@/context/DashboardContext";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Icon } from "@iconify/react";
import euro from "@/lib/assets/Euro_Icons.png";
import starter from "@/lib/assets/starter_lever.png";
import gold from "@/lib/assets/gold_lever.png";
import premium from "@/lib/assets/premium_lever.png";
import TradeStatus from "./TradeStatus";
import { Asset } from "./AutoTradeModal";
import { toast } from "react-toastify";
import { useEffect } from "react";

export const plans = [
  {
    name: "Starter",
    logo: starter,
    color: "text-[#0273c4]",
    rate: 15,
    // desc: "Make 0.5% daily profit on trade amount",
    desc: "15% interest for 30days",
    range: "(Min: $100 - Max: $1,000)",
  },
  {
    name: "Gold",
    logo: gold,
    color: "text-[#e08402]",
    rate: 18,
    // desc: "Make 0.6% daily profit on trade amount",
    desc: "18% interest every 30days for 90days",
    range: "(Min: $50 - Max: $10,000)",
  },
  {
    name: "Premium",
    logo: premium,
    color: "text-[#e03f3d]",
    rate: 22,
    // desc: "Make 0.73% daily profit on trade amount",
    desc: "22% interest for every 30days for 180days",
    range: "(Min: $50 - Max: $10,000)",
  },
];

const CI = ({
  onClose,
  handleViewChange,
  tradingPlan,
  setTradingPlan,
  selectedAsset,
  setSelectedTradeOption,
  selectedTradeOption,
  setAmount,
  amount,
  setIsStartAutoTrade,
  showTradeStatus,
  assets,
  selectedBalance,
  setSelectedBalance,
  setProfitValue,
  profitValue,
}: {
  onClose: () => void;
  handleViewChange: (val: string) => void;
  tradingPlan: string;
  setTradingPlan: (val: string) => void;
  selectedAsset: string;
  setSelectedTradeOption: (val: string) => void;
  selectedTradeOption: string;
  setAmount: (val: string | number) => void;
  amount: string | number;
  setIsStartAutoTrade: (val: boolean) => void;
  showTradeStatus: boolean;
  assets: Asset[] | null;
  selectedBalance: string;
  setSelectedBalance: (val: string) => void;
  setProfitValue: (val: number | null) => void;
  profitValue: number | null;
}) => {
  const { traderData, activeAutoTrade } = useDashboardContext();

  const plan = plans.find((plan) => plan.name === tradingPlan);
  const asset =
    assets && assets.find((asset: Asset) => asset.assetName === selectedAsset);

  const realAccount = traderData?.accounts.find(
    (account) => account.accountType === "INDIVIDUAL"
  );

  const demoAccount = traderData?.accounts.find(
    (account) => account.accountType === "DEMO"
  );

  const validationCheck = () => {
    if (selectedBalance === "real" && activeAutoTrade.length === 2) {
      return toast.error("Maximum of 2 Auto Trade reached");
    }
    if (
      selectedBalance === "demo" &&
      demoAccount &&
      demoAccount?.accountBalance <= 50
    ) {
      return toast.error("Insufficient Demo Balance");
    }
    if (
      selectedBalance === "real" &&
      realAccount &&
      realAccount?.accountBalance <= 50
    ) {
      return toast.error("Insufficient Real Balance");
    }
    if (
      selectedBalance === "real" &&
      tradingPlan.toLowerCase() === "starter" &&
      (Number(amount) < 300 || Number(amount) > 1000)
    ) {
      return toast.error(`You need Min $300 - $1,000 for Starter Plan`);
    }
    if (
      selectedBalance === "real" &&
      tradingPlan.toLowerCase() === "gold" &&
      (Number(amount) < 50 || Number(amount) > 10000)
    ) {
      return toast.error(`You need Min $50 - $10,000 for Gold Plan`);
    }
    if (
      selectedBalance === "real" &&
      tradingPlan.toLowerCase() === "premium" &&
      (Number(amount) < 50 || Number(amount) > 10000)
    ) {
      return toast.error(`You need Min $50 - $10,000 for Platinum Plan`);
    }

    return true;
  };

  const timeOptions = [
    {
      label: "43,200 mins/30days/15%",
      value: "43,200 mins/30days/15%",
      plan: "Starter",
    },
    {
      label: "129,600 mins/90days/18%",
      value: "129,600 mins/90days/18%",
      plan: "Gold",
    },
    {
      label: "259,200 mins/180days/22%",
      value: "259,200 mins/180days/22%",
      plan: "Premium",
    },
  ];

  const perc = selectedTradeOption.split("/")[2].split("%")[0];
  const day = selectedTradeOption.split("/")[1].split("days")[0];

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "" || /^\d*\.?\d{0,2}$/.test(val)) {
      setAmount(val);
    }
  };
  // const profit = (Number(amount) * Number(perc) * Number(day)) / 30 / 100;
  // setProfitValue(profit);
  useEffect(() => {
    const profit = (Number(amount) * Number(perc) * Number(day)) / 30 / 100;
    setProfitValue(profit);
  }, [amount, perc, day]);
  const handleAutoTrade = () => {
    const val = validationCheck();
    if (val === true) {
      setIsStartAutoTrade(true);
    }
  };
  return (
    <div className="w-full h-full px-8 pt-6 pb-8 overflow-y-auto custom-scrollbar">
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
                    setSelectedTradeOption(opt.value);
                    setTradingPlan(opt.plan);
                  }}
                  className={`w-full relative bg-[#EEFFEF]/3 py-2 rounded-lg text-sm text-white text-center hover:bg-[#EEFFEF]/5 ${
                    selectedTradeOption === opt.value && "border border-primary"
                  }`}
                >
                  {opt.value}
                  {selectedTradeOption === opt.value && (
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
                  {asset?.assetName}{" "}
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
                className={`w-full flex items-center gap-2 px-3 py-2 bg-[#EEFFEF]/5 rounded-lg cursor-default ${
                  tradingPlan ? "justify-between" : "justify-center py-3"
                }`}
              >
                <div className="w-full flex items-center gap-2.5">
                  {tradingPlan && plan && (
                    <Image
                      src={plan.logo}
                      alt={plan.name}
                      className="w-6 h-6"
                    />
                  )}
                  <div className="flex flex-col items-start gap-2">
                    <span>{tradingPlan}</span>
                    {tradingPlan && plan && (
                      <span className={`${plan.color} text-xs`}>
                        {plan.rate}% interest
                      </span>
                    )}
                  </div>
                </div>

                {tradingPlan && plan && (
                  <div className="flex flex-col gap-2 text-xs">
                    <span className="text-white/70">{plan?.desc}</span>
                    <span className="text-white/70">{plan?.range}</span>
                  </div>
                )}
                {!tradingPlan && <ChevronDown />}
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
            disabled={!tradingPlan || !amount || !profitValue || !selectedAsset}
            onClick={handleAutoTrade}
            className={`w-full text-center font-semibold px-6 py-3 rounded-xl flex items-center justify-center gap-3 ${
              !tradingPlan || !amount || !profitValue || !selectedAsset
                ? "bg-[#171f24] cursor-not-allowed"
                : "bg-primary text-black cursor-pointer hover:bg-gradient-to-tr  from-primary to-[#b4e6b8] transition"
            }`}
          >
            Start Auto Trade
          </button>
        </div>
      )}
      {showTradeStatus && (
        <TradeStatus onClose={onClose} handleViewChange={handleViewChange} />
      )}
    </div>
  );
};

export default CI;
