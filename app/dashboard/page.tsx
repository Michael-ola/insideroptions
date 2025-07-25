"use client";

import AssetComponent from "@/components/dashboard/assets/AssetComponent";
import ControlPanel from "@/components/dashboard/control-panel";
import { useState } from "react";
import GraphStyleModal from "@/components/dashboard/graphStyleModal";
import TopTraderFeedCard from "@/components/dashboard/topTraderFeed";
import { DashboardContext } from "@/context/DashboardContext";
import type { DashboardPropsType, SeriesType } from "@/types/dashboard";
import SideNav from "@/components/dashboard/sideNav";
import TopNav from "@/components/dashboard/TopNav";
import TradingChart from "@/components/dashboard/tradingChart";

export default function DashboardPage() {
  const [openGraphStyleModal, setOpenGraphStyleModal] = useState(false);
  const [chartStyle, setChartStyle] = useState<SeriesType>("area");
  const [showTraderFeed, setShowTraderFeed] = useState(false);
  const [openCashierModal, setOpenCashierModal] = useState<boolean>(false);
  const [selectedSideNavTab, setSelectedSideNavTab] = useState("Trade");
  const [selectedAccount, setSelectedAccount] = useState("real");

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
    selectedAccount,
    setSelectedAccount,
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      <div
        className="relative overflow-clip bg-[#0d181c] text-white max-sm:flex max-sm:flex-col max-sm:items-center max-sm:justify-end"
        style={{ minHeight: "100dvh" }}
      >
        <TopTraderFeedCard />
        <TopNav />
        <AssetComponent />
        <ControlPanel />
        <SideNav />
        <TradingChart />
        <GraphStyleModal />
      </div>
    </DashboardContext.Provider>
  );
}
