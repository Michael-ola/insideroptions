"use client";

import AssetComponent from "@/components/dashboard/assets/AssetComponent";
import ControlPanel from "@/components/dashboard/control-panel";
import { useEffect, useState } from "react";
import GraphStyleModal from "@/components/dashboard/graphStyleModal";
import TopTraderFeedCard from "@/components/dashboard/topTraderFeed";
import { DashboardContext } from "@/context/DashboardContext";
import type { DashboardPropsType } from "@/types/dashboard";
import SideNav from "@/components/dashboard/sideNav";
import TopNav from "@/components/dashboard/TopNav";
import { apiClient } from "@/lib/api-client";
import type { TraderDataType } from "@/types/TraderDataType";

export default function DashboardPage() {
  const [openGraphStyleModal, setOpenGraphStyleModal] = useState(false);
  const [chartStyle, setChartStyle] = useState("lines");
  const [showTraderFeed, setShowTraderFeed] = useState(false);
  const [openCashierModal, setOpenCashierModal] = useState<boolean>(false);
  const [selectedSideNavTab, setSelectedSideNavTab] = useState("Trade");
  const [selectedAccount, setSelectedAccount] = useState("real");
  const [traderData, setTraderData] = useState<TraderDataType | null>(null);

  useEffect(() => {
    const fetchTrader = async () => {
      try {
        const res = await apiClient.get("/get-trader");
        setTraderData(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Failed to fetch trader data", err);
      }
    };

    fetchTrader();
  }, []);

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
    traderData,
    setTraderData,
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      <div className="relative min-h:100dvh overflow-clip bg-[#01060e] text-white max-sm:flex max-sm:flex-col max-sm:items-center max-sm:justify-end">
        <TopTraderFeedCard />
        <TopNav />
        <AssetComponent />
        <div className="dashboard-chart-offset h-[100dvh] w-screen max-sm:h-[calc(100dvh-57px)] bg-[#142222]">
          CHART
        </div>
        <ControlPanel />
        <SideNav />
        <GraphStyleModal />
      </div>
    </DashboardContext.Provider>
  );
}
