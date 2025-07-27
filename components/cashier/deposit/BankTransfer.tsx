"use client";

import { Check, ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import candle from "@/lib/assets/green_candle.png";
import { RiLoader4Line } from "@remixicon/react";
import { useDashboardContext } from "@/context/DashboardContext";

const BankTransfer = () => {
  const { traderData } = useDashboardContext();
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [amount, setAmount] = useState<string | number>("");
  const [confirmPayment, setConfirmPayment] = useState<boolean>(false);
  const [isConfirming, setIsConfirming] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const tranferDetails = [
    { label: "Payment method", value: "Bank Transfer" },
    { label: "Bank", value: "Access Bank" },
    {
      label: "Receipeint full name",
      value: `${traderData?.firstName} ${traderData?.lastName}`,
    },
    { label: "Currency", value: "USD/NGN" },
    { label: "Receiving amount", value: "NGN378,250.00" },
  ];

  const handleConfirmPayment = () => {
    try {
      setIsConfirming(true);
      if ((amount as number) < 50000 || (amount as number) > 20000000) {
        setIsConfirming(false);
        return alert(
          "Please enter a valid amount between N50,000 and N20,000,000"
        );
      }
      setConfirmPayment(true);
      console.log("Payment confirmed with amount:", amount);

      setIsConfirming(false);
    } catch (error) {
      console.error(error);
      setIsConfirming(false);
    }
  };
  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "" || /^\d*\.?\d{0,2}$/.test(val)) {
      setAmount(val);
    }
  };
  const handleProcessPayment = () => {
    try {
      setIsSubmitting(true);

      console.log("Processing payment with amount:", amount);
      setIsSubmitting(false);
      // alert("Payment processed successfully!");

      setConfirmed(false);
      setAmount("");
      setConfirmPayment(false);
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      console.error("An error occurred while processing the payment.");
    }
  };
  return (
    <div>
      {!confirmPayment && (
        <div className="space-y-13 px-8 pt-6">
          <div className="space-y-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="first name" className="text-sm font-medium">
                First Name
              </label>
              <input
                type="text"
                disabled
                value={traderData?.firstName}
                className="w-full bg-transparent border border-gray-700 px-4 py-3 outline-none rounded-xl text-sm text-gray-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="last name" className="text-sm font-medium">
                Surname
              </label>
              <input
                type="text"
                disabled
                value={traderData?.lastName}
                className="w-full bg-transparent border border-gray-700 px-4 py-3 outline-none rounded-xl text-sm text-gray-500"
              />
            </div>
            <p className="text-end text-gray-400 text-xs">
              Not correct? <span className="text-green-400">change name</span>
            </p>
          </div>

          <hr className="border-gray-700/50" />

          <div className="space-y-8">
            <div className="space-y-8 text-xs text-gray-400 mb-4">
              <div className="flex flex-col gap-2">
                <label>Enter Amount</label>
                <input
                  type="text"
                  name="amount"
                  onChange={(e) => handleAmount(e)}
                  value={amount}
                  placeholder="0.00"
                  className="w-full text-white bg-transparent border border-gray-700 px-4 py-3 outline-none rounded-xl text-sm focus:border-0 focus:ring-1 focus-within:ring-green-500"
                />
                <span className="text-[10px] text-start mt-2">
                  Min amount: N50,000 | Max amount: N20,000,000
                </span>
              </div>
            </div>

            <label className="flex items-start gap-3 text-sm">
              <div
                onClick={() => setConfirmed(!confirmed)}
                className={`
                    w-5 h-5 rounded-sm border  cursor-pointer flex items-center justify-center transition-colors 
                    ${
                      confirmed
                        ? "border-green-500 p-[0.5px]"
                        : "border-gray-400"
                    }
                     `}
              >
                <Check
                  className={`w-5 text-green-500 opacity-0  ${
                    confirmed ? "opacity-100" : ""
                  } transition-opacity duration-500`}
                />
              </div>
              <span className="text-gray-400">
                I {traderData?.firstName} {traderData?.lastName} agree to 
                <a
                  href="/company/terms-and-condition"
                  className="text-green-400"
                >
                  Terms & Conditions
                </a>
                , Refund policy, Payment info policy.
              </span>
            </label>
          </div>

          <button
            onClick={handleConfirmPayment}
            className={`w-full text-center py-3 rounded-xl text-[#545c5c] font-medium text-sm flex items-center justify-center gap-3 ${
              !confirmed || !amount
                ? "bg-[#171f24] cursor-not-allowed"
                : isConfirming
                ? "bg-[#74d67f] opacity-50 cursor-not-allowed"
                : "bg-[#74d67f] text-black cursor-pointer"
            }`}
            disabled={!confirmed || !amount || isConfirming}
          >
            {isConfirming && (
              <RiLoader4Line className="size-5 mr-2 animate-spin" />
            )}{" "}
            Pay Now <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
      {confirmPayment && (
        <div className="sm:space-y-8 px-8 pt-6">
          <div className="space-y-6 py-6 rounded-xl border border-[#FFFFFF]/5">
            <Image
              src={candle}
              alt="Light stick"
              priority
              className="mx-auto"
            />
            <div className="text-center text-gray-400 text-sm space-y-2">
              <p>Confirm Payment</p>
              <p className="text-3xl">$250</p>
            </div>
            <hr className="text-gray-700/50" />
            <div className="text-gray-400 text-xs space-y-2 px-6">
              {tranferDetails.map((detail, index) => (
                <div key={index} className="flex justify-between">
                  <span>{detail.label}</span>
                  <span className="text-white">{detail.value}</span>
                </div>
              ))}
            </div>
            <hr className="text-gray-700/50" />
            <p className="text-xs text-gray-400 text-center">
              Please review the information carefully and make sure everything
              is correct before submitting.
            </p>
          </div>
          <button
            onClick={handleProcessPayment}
            className={`w-full text-center py-3 rounded-xl text-[#545c5c] font-medium text-sm flex items-center justify-center gap-3 ${
              !confirmed || !amount
                ? "bg-[#171f24] cursor-not-allowed"
                : "bg-[#74d67f] text-black cursor-pointer"
            }`}
            disabled={isSubmitting}
          >
            {" "}
            {isSubmitting && (
              <RiLoader4Line className="size-5 mr-2 animate-spin" />
            )}{" "}
            Continue <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default BankTransfer;
