"use client";

import CashierModal from "@/components/cashier/cashierModal";
import AssetComponent from "@/components/dashboard/assets/AssetComponent";
import ControlPanel from "@/components/dashboard/control-panel";
import { useState } from "react";
import GraphStyleModal from "@/components/dashboard/graphStyleModal";
import TopTraderFeedCard from "@/components/dashboard/topTraderFeed";
import { DashboardContext } from "@/context/DashboardContext";
import type { DashboardPropsType } from "@/types/dashboard";

export default function DashboardPage() {
  const [openGraphStyleModal, setOpenGraphStyleModal] = useState(false);
  const [chartStyle, setChartStyle] = useState("lines");
  const [showTraderFeed, setShowTraderFeed] = useState(false);

  const contextValue: DashboardPropsType = {
    openGraphStyleModal,
    setOpenGraphStyleModal,
    chartStyle,
    setChartStyle,
    showTraderFeed,
    setShowTraderFeed,
  };

  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <DashboardContext.Provider value={contextValue}>
      <div className="relative min-h-screen bg-[#0d181c] text-white max-sm:flex max-sm:flex-col max-sm:items-center">
        <TopTraderFeedCard />
        <AssetComponent />
        <ControlPanel />
        <GraphStyleModal />
        <CashierModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    </DashboardContext.Provider>
  );
}
