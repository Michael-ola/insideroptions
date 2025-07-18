"use client";

import CashierModal from "@/components/cashier/cashierModal";
import AssetComponent from "@/components/dashboard/assets/AssetComponent";
import ControlPanel from "@/components/dashboard/control-panel";
import { useState } from "react";
import GraphStyleModal from "@/components/dashboard/graphStyleModal";
import TopTraderFeedCard from "@/components/dashboard/topTraderFeed";
import { DashboardContext } from "@/context/DashboardContext";
import type { DashboardPropsType } from "@/types/dashboard";
import SideNav from "@/components/dashboard/sideNav";

export default function DashboardPage() {
  const [openGraphStyleModal, setOpenGraphStyleModal] = useState(false);
  const [chartStyle, setChartStyle] = useState("lines");
  const [showTraderFeed, setShowTraderFeed] = useState(false);
  const [openCashierModal, setOpenCashierModal] = useState<boolean>(true);
  const [selectedSideNavTab, setSelectedSideNavTab] = useState("Trade");

  const contextValue: DashboardPropsType = {
    openGraphStyleModal,
    setOpenGraphStyleModal,
    chartStyle,
    setChartStyle,
    showTraderFeed,
    setShowTraderFeed,
    selectedSideNavTab,
    setSelectedSideNavTab,
    openCashierModal,
    setOpenCashierModal,
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      <div
        className="relative overflow-clip bg-[#0d181c] text-white max-sm:flex max-sm:flex-col max-sm:items-center max-sm:justify-end"
        style={{ minHeight: "100dvh" }}
      >
        <TopTraderFeedCard />
        <AssetComponent />
        <ControlPanel />
        <SideNav />
        <GraphStyleModal />
        <CashierModal />
      </div>
    </DashboardContext.Provider>
  );
}
