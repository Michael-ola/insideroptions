"use client";

import { getErrorMessage } from "@/lib/authUtils";
import { RiLoader4Line } from "@remixicon/react";
import { ChevronDown } from "lucide-react";
import profile from "@/data/trader/profile.json";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { apiClient } from "@/lib/api-client";

const SwapView = () => {
  const [source, setSource] = useState<"profit" | "referral">("profit");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [isSwapping, setIsSwapping] = useState<boolean>(false);
  const [percent, setPercent] = useState<number>(0);

  let realBalance = 0;
  let profitBalance = 0;
  let referralBalance = 0;

  const realAccount = profile.accounts.find(
    (account) => account.accountType === "INDIVIDUAL"
  );
  if (realAccount) {
    ({
      profitBalance,
      referralBalance,
      accountBalance: realBalance,
    } = realAccount);
  }
  // const realBalance = 50000;
  // const profitBalance = 10000;
  // const referralBalance = 1000;

  const handleQuickSelect = (value: number) => {
    setPercent(value);
  };

  const getFromAmount = () => {
    return (
      (percent / 100) *
      (source === "profit" ? profitBalance : referralBalance)
    ).toFixed(2);
  };

  const handleSwap = async () => {
    try {
      if (percent === 0) return;
      setIsSwapping(true);
      const url = `/transactions/${profile.id}/swap`;
      const payload = {
        toBalance: "REAL_BALANCE",
        fromBalance: source === "profit" ? "PROFIT_BALANCE" : "REFERRAL_BALANCE",
        percent: percent,
      };
      await apiClient.post(url, payload);
      setPercent(0);
      setIsSwapping(false);
    } catch (error) {
      const err = getErrorMessage(error);
      toast.error(err);
      console.error(error);
      setIsSwapping(false);
    }
  };

  return (
    <div className="space-y-6 p-4">
      {!showDropdown && (
        <>
          <div className="w-full relative space-y-6">
            {/* Source Balance Dropdown */}
            <div className="w-full relative px-6 py-4 bg-[#1A2E22] flex items-start justify-between">
              <div className="w-full text-white">
                <button
                  onClick={() => setShowDropdown((prev) => !prev)}
                  className="w-full flex items-center gap-3"
                >
                  <div className="flex flex-col gap-2 items-start">
                    <span className="capitalize">{source} balance</span>
                    <span className="text-xl font-semibold">
                      $
                      {(
                        (source === "profit"
                          ? profitBalance
                          : referralBalance) - parseFloat(getFromAmount())
                      ).toFixed(2)}
                    </span>
                  </div>
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>

              <span className="text-gray-400 text-xs">From:</span>
            </div>
            <div className="absolute z-50 right-[20%] top-[50%] -translate-x-1/2 -translate-y-1/2 bg-[#0C0F16] w-12 h-12 rounded-full"></div>

            <div className="w-full relative bg-[#20282b] px-6 py-4 text-white flex items-start justify-between">
              <div className="flex flex-col gap-2 items-start">
                <span className="capitalize">real balance</span>
                <span className="text-xl font-semibold">
                  $ {(realBalance + parseFloat(getFromAmount())).toFixed(2)}
                </span>
              </div>
              <span className="text-xs text-gray-400">To:</span>
            </div>
          </div>

          <div className="flex justify-between gap-2">
            {[25, 35, 50, 100].map((p) => (
              <button
                key={p}
                onClick={() => handleQuickSelect(p)}
                className={`flex-1 py-2 rounded-md text-white text-sm 
              ${
                percent === p
                  ? "bg-[#306139] text-black"
                  : "bg-[#22383765] text-white"
              }`}
              >
                {p}%
              </button>
            ))}
          </div>

          {/* Swap Now Button */}
          <button
            onClick={handleSwap}
            disabled={percent === 0}
            className={`w-full px-6 py-3 rounded-xl mt-4 text-white text-sm flex items-center justify-center ${
              percent === 0 || isSwapping
                ? "bg-secondary cursor-not-allowed"
                : "bg-primary"
            }`}
          >
            {isSwapping ? (
              <RiLoader4Line className="size-5 mr-2 animate-spin" />
            ) : (
              "Swap now"
            )}
          </button>
        </>
      )}

      {showDropdown && (
        <div className="w-full flex flex-col gap-3">
          {["profit", "referral"].map((item) => (
            <button
              key={item}
              onClick={() => {
                setSource(item as "profit" | "referral");
                setPercent(0);
                setShowDropdown(false);
              }}
              className="w-full bg-white/20 px-6 py-4 cursor-pointer text-sm capitalize flex flex-col gap-2 items-start text-white"
            >
              {item} balance
              <span className="text-xl font-semibold">
                $
                {item === "profit"
                  ? profitBalance.toFixed(2)
                  : referralBalance.toFixed(2)}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SwapView;
