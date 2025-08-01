import { useDashboardContext } from "@/context/DashboardContext";
import React from "react";

const AutoTradeButton = () => {
  const { setShowTradeStatus } = useDashboardContext();
  const { setOpenAutoTrade } = useDashboardContext();
  const { setSelectedSideNavTab } = useDashboardContext();
  return (
    <div
      onClick={() => {
        setSelectedSideNavTab("Auto trade");
        setOpenAutoTrade(true);
        setShowTradeStatus(true);
      }}
      className="fixed bottom-[19%] max-sm:bottom-[190px] z-5 left-1/2 max-sm:mx-auto -translate-x-1/2 text-center bg-transparent sm:hover:bg-primary/5 rounded-xl border border-primary/60 text-white shadow-lg py-2 px-8 max-sm:px-6 cursor-pointer"
    >
      View Auto Trade
      <div className="absolute w-2 h-2 p-2 -top-2 z-5 right-[10%] text-xs rounded-full bg-red-800 flex items-center justify-center">
        1
      </div>
    </div>
  );
};

export default AutoTradeButton;
