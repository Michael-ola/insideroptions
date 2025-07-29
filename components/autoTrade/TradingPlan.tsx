import React from "react";
import starter from "@/lib/assets/starter_lever.png";
import gold from "@/lib/assets/gold_lever.png";
import premium from "@/lib/assets/premium_lever.png";
import Image from "next/image";


 export const plans = [
    {
      name: "Starter",
      logo: starter,
      color: "text-[#0273c4]",
      rate: 15,
      desc: "Make 0.5% daily profit on trade amount",
      range: "(Min: $100 - Max: $1,000)",
    },
    {
      name: "Gold",
      logo: gold,
      color: "text-[#e08402]",
      rate: 18,
      desc: "Make 0.6% daily profit on trade amount",
      range: "(Min: $50 - Max: $10,000)",
    },
    {
      name: "Premium",
      logo: premium,
      color: "text-[#e03f3d]",
      rate: 22,
      desc: "Make 0.73% daily profit on trade amount",
      range: "(Min: $50 - Max: $10,000)",
    },
  ];
  
const TradingPlan = ({
  handleViewChange,
  setTradingPlan,
  tradingPlan,
}: {
  handleViewChange: (val: string) => void;
  setTradingPlan: (val: string) => void;
  tradingPlan: string;
}) => {
 
  return (
    <section className="px-8 pt-6 w-full h-full space-y-12 overflow-y-auto custom-scrollbar">
      <div className="flex flex-col gap-3.5">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            onClick={() => {
              setTradingPlan(plan.name);
              handleViewChange("Current Investment");
            }}
            className={`py-3 pr-3 pl-6 cursor-pointer rounded-xl shadow-md ${
              tradingPlan === plan.name
                ? "bg-transparent border border-primary/60"
                : "bg-[#0a171a]"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Image src={plan.logo} alt={plan.name} className="w-8 h-8" />
              <div className="flex flex-col gap-0.6 text-xs text-white/60">
                <span className="text-lg text-white font-semibold mb-1">
                  {plan.name}
                </span>
                <span className={`${plan.color} mb-1`}>
                  {plan.rate}% interest
                </span>
                <span>{plan.desc}</span>
                <span>{plan.range}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TradingPlan;
