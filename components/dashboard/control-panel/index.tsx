"use client";

import Image from "next/image";
import { useState } from "react";
import { useDashboardContext } from "@/context/DashboardContext";

const BuySellButtons = ({ className }: { className?: string }) => {
  function handleClick(action: string) {
    console.log(`${action} clicked`);
  }
  return (
    <div
      className={`flex flex-1 max-sm:pb-3 bg-transparent max-sm:w-full max-sm:flex max-sm:justify-center max-sm:flex-0 max-sm:px-3 ${className}`}
    >
      <button
        onClick={() => handleClick("SELL")}
        className="relative bg-[#EC221F] hover:bg-[#C00F0C] w-1/2 text-white px-10 py-1 text-center rounded-xl font-semibold flex flex-col items-center justify-center transition max-sm:h-10 "
      >
        SELL
        <Image
          src="/images/sell.png"
          alt="sell"
          width={20}
          height={30}
          className="absolute top-0 right-3"
        />
      </button>
      <button
        onClick={() => handleClick("BUY")}
        className="relative bg-[#14AC5B] w-1/2 hover:bg-[#009951] rounded-xl text-white px-10 py-1 text-center font-semibold flex flex-col items-center justify-center transition"
      >
        BUY
        <Image
          src="/images/buy.png"
          alt="buy"
          width={20}
          height={20}
          className="absolute bottom-0 right-3"
        />
      </button>
    </div>
  );
};

export default function ControlPanel() {
  const [amount, setAmount] = useState(100);
  const increaseAmount = () => {
    setAmount((prev) => prev * 2);
  };

  const decreaseAmount = () => {
    setAmount((prev) => Math.max(1, Math.floor(prev / 2)));
  };

  const ICON_BUTTONS = [
    {
      label: "Arrow Left",
      icon: "/images/right.png",
      className: "w-16 h-5 rotate-180",
      alt: "Arrow Left",
    },
    {
      label: "Arrow Right",
      icon: "/images/right.png",
      className: "w-16 h-5",
      alt: "Arrow Right",
    },
    {
      label: "Settings",
      icon: "/images/arc.png",
      className: "w-16 h-5",
      alt: "Settings",
    },
    {
      label: "Chart",
      icon: "/images/chart-type.png",
      className: "w-16 h-5",
      alt: "Waves",
    },
    {
      label: "User",
      icon: "/images/user_.png",
      className: "w-16 h-5",
      alt: "User",
    },
  ];

  function IconButton({ label, icon, className, onClick, alt }: any) {
    return (
      <button
        onClick={() => onClick(label)}
        className={`${className} bg-[#0e161d] border border-[#192f2c] rounded flex items-center justify-center hover:bg-[#151d24] transition`}
      >
        <Image
          src={icon}
          alt={alt}
          width={10}
          height={10}
          className={`${label.includes("Arrow") && "w-[5px]"}`}
        />
      </button>
    );
  }

  const { setOpenGraphStyleModal, setShowTraderFeed } = useDashboardContext();

  function handleClick(action: string) {
    console.log(`${action} clicked`);
    if (action === "Chart") {
      setOpenGraphStyleModal(true);
    } else if (action === "User") {
      setShowTraderFeed(true);
    }
  }

  return (
    <>
      <div className="fixed bottom-0 z-5 left-1/2 -translate-x-1/2 flex bg-transparent max-sm:w-full max-sm:flex max-sm:justify-center max-sm:items-center max-sm:rounded-none max-sm:bottom-[110px] max-sm:gap-2 max-sm:border-none rounded-lg overflow-hidden text-white shadow-lg p-3">
        {/* Trade Amount Panel */}
        <div className="flex flex-col justify-center items-center max-sm:flex-row-reverse max-sm:gap-2 max-sm:items-stretch max-sm:w-[50%]">
          <div className="bg-[#0e161d] border border-[#192f2c] w-full flex-1 flex flex-col items-center justify-center rounded-lg py-0">
            <span className="text-xs text-neutral-400 mb-1/2">
              Trade Amount
            </span>
            <span className="text-md font-semibold">${amount}</span>
          </div>

          <div className="flex items-center mt-1 max-sm:mt-0 space-x-2 max-sm:flex-col max-sm:space-x-0 max-sm:space-y-2">
            <button
              onClick={decreaseAmount}
              className="w-14 h-5 max-sm:w-9 bg-[#0e161d] border border-[#192f2c] rounded flex items-center justify-center hover:bg-[#151d24] transition"
            >
              −
            </button>
            <span className="text-xs bg-[#0e161d] border border-[#192f2c] rounded w-13 h-6  flex items-center justify-center max-sm:hidden">
              100%
            </span>
            <button
              onClick={increaseAmount}
              className="w-14 h-5 max-sm:w-9 bg-[#0e161d] border border-[#192f2c] rounded flex items-center justify-center hover:bg-[#151d24] transition"
            >
              +
            </button>
          </div>
        </div>

        {/* Center Panel */}
        <div className="flex flex-col justify-between px-3 max-sm:hidden">
          {/* Top Row: Nav & Icons */}
          <div className="flex items-center justify-center space-x-2 mb-2">
            {ICON_BUTTONS.map((btn) => (
              <IconButton
                key={btn.label}
                label={btn.label}
                icon={btn.icon}
                className={btn.className}
                alt={btn.alt}
                onClick={handleClick}
              />
            ))}
          </div>

          <BuySellButtons />
        </div>

        {/* Trade Duration Panel */}
        <div className="flex flex-col justify-between items-center max-sm:flex-row max-sm:gap-2 max-sm:items-stretch max-sm:w-[50%]">
          <div className="border border-[#192f2c] bg-[#0e161d] flex-1 hover:bg-[#151d24] cursor-pointer rounded-md flex flex-col items-center justify-center w-full py-1 max-sm:w-[60%]">
            <span className="text-xs text-neutral-400 flex items-center justify-center gap-1">
              {" "}
              <Image
                src="/images/time.png"
                alt="time"
                width={12}
                height={12}
                className="w-[12px] h-[12px]"
              />
              Trade Duration
            </span>
            <span className="text-md font-semibold">00:30</span>
          </div>

          <div className="flex items-center mt-1 space-x-2 max-sm:flex-col max-sm:space-x-0 max-sm:space-y-2 max-sm:mt-0">
            <button
              onClick={() => handleClick("Decrease Duration")}
              className="w-14 h-5 max-sm:w-9 border bg-[#0e161d] border-[#192f2c] rounded-md flex items-center justify-center hover:bg-[#151d24] transition"
            >
              −
            </button>
            <button
              onClick={() => handleClick("Increase Duration")}
              className="w-14 h-5 max-sm:w-9 bg-[#0e161d] border border-[#192f2c] rounded-md flex items-center justify-center hover:bg-[#151d24] transition"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <BuySellButtons className="sm:hidden max-sm:fixed max-sm:bottom-[60px]" />
    </>
  );
}
