"use client";

import AssetComponent from "@/components/dashboard/assets/AssetComponent";
import ControlPanel from "@/components/dashboard/control-panel";
import { useEffect, useState } from "react";
import GraphStyleModal from "@/components/dashboard/graphStyleModal";
import TopTraderFeedCard from "@/components/dashboard/topTraderFeed";
import { DashboardContext } from "@/context/DashboardContext";
import type { DashboardPropsType, SeriesType } from "@/types/dashboard";
import SideNav from "@/components/dashboard/sideNav";
import TopNav from "@/components/dashboard/TopNav";
import { apiClient } from "@/lib/api-client";
import type { TraderDataType } from "@/types/TraderDataType";
import TradingChart from "@/components/dashboard/tradingChart";
import getBalanceAmount from "@/lib/getBalanceAmount";

export default function DashboardPage() {
  const [openGraphStyleModal, setOpenGraphStyleModal] = useState(false);
  const [chartStyle, setChartStyle] = useState<SeriesType>("area");
  const [showTraderFeed, setShowTraderFeed] = useState(false);
  const [openCashierModal, setOpenCashierModal] = useState<boolean>(false);
  const [selectedSideNavTab, setSelectedSideNavTab] = useState("Trade");
  const [selectedAccount, setSelectedAccount] = useState("DEMO");
  const [traderData, setTraderData] = useState<TraderDataType | null>(null);
  const [tradeDuration, setTradeDuration] = useState(300);
  const [selectedBalanceAmount, setSelectedBalanceAmount] = useState(0);
  const [tradeAmount, setTradeAmount] = useState(1);

  useEffect(() => {
    const fetchTrader = async () => {
      try {
        const res = await apiClient.get("/get-trader");
        const data: TraderDataType = res.data;
        setTraderData(data);
        const accountBalance = getBalanceAmount(
          data.accounts,
          selectedAccount
        ).accountBalance;
        setSelectedBalanceAmount(accountBalance);
        setTradeAmount(accountBalance);
        console.log(data);
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
    tradeDuration,
    setTradeDuration,
    selectedBalanceAmount,
    setSelectedBalanceAmount,
    tradeAmount,
    setTradeAmount,
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      <div className="relative max-h-[100dvh] overflow-clip bg-[#01060e] text-white max-sm:flex max-sm:flex-col max-sm:items-center max-sm:justify-end">
        <TopTraderFeedCard />
        <TopNav />
        <AssetComponent />
        <TradingChart />
        <ControlPanel />
      </div>
      <SideNav />
      <GraphStyleModal />
    </DashboardContext.Provider>
  );
}
