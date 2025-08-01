import React from "react";
import { plans } from "./CI";
import Image from "next/image";

  
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
