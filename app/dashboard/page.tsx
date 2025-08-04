"use client";

import AssetComponent from "@/components/dashboard/assets/AssetComponent";
import ControlPanel from "@/components/dashboard/control-panel";
import { useEffect, useState } from "react";
import GraphStyleModal from "@/components/dashboard/graphStyleModal";
import TopTraderFeedCard from "@/components/dashboard/topTraderFeed";
import { DashboardContext } from "@/context/DashboardContext";
import { DashboardPropsType } from "@/types/dashboard";
import SideNav from "@/components/dashboard/sideNav";
import TopNav from "@/components/dashboard/TopNav";
import { apiClient } from "@/lib/api-client";
import type { TraderDataType } from "@/types/TraderDataType";
import TradingChart from "@/components/dashboard/tradingChart";
import getBalanceAmount from "@/lib/getBalanceAmount";
import AutoTradeButton from "@/components/dashboard/AutoTradeButton/AutoTradeButton";
import { SeriesType } from "@/lib/models";
import ZoomButton from "@/components/dashboard/ZoomButton";
import MobileButtons from "@/components/dashboard/control-panel/MobileButtons";
import tradingAll from "@/data/trading/all.json";

export default function DashboardPage() {
  const [openGraphStyleModal, setOpenGraphStyleModal] = useState(false);
  const [chartStyle, setChartStyle] = useState<SeriesType>(SeriesType.Area);
  const [showTraderFeed, setShowTraderFeed] = useState(false);
  const [openCashierModal, setOpenCashierModal] = useState<boolean>(false);
  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
  const [closeConfirmation, setCloseConfirmation] = useState<boolean>(false);
  const [openAutoTrade, setOpenAutoTrade] = useState<boolean>(false);
  const [isAutoTrade, setIsAutoTrade] = useState<string>("");
  const [showTradeStatus, setShowTradeStatus] = useState<boolean>(false);
  const [switchAssetManagerModal, setSwitchAssetManagerModal] =
    useState<boolean>(false);
  const [form, setForm] = useState<boolean>(false);

  const [selectedSideNavTab, setSelectedSideNavTab] = useState("Trade");
  const [selectedAccount, setSelectedAccount] = useState("DEMO");
  const [traderData, setTraderData] = useState<TraderDataType | null>(null);
  const [tradeDuration, setTradeDuration] = useState(300);
  const [selectedBalanceAmount, setSelectedBalanceAmount] = useState(0);
  const [tradeAmount, setTradeAmount] = useState(1);
  const [selectedAssets, setSelectedAssets] = useState([
    {
      name: "EUR/USD",
      icon: "/images/eur-usd.png",
      profit: 0,
    },
  ]);

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
      //console.log(data);
    } catch (err) {
      console.error("Failed to fetch trader data", err);
    }
  };

  const fetchEURUSD = () => {
    const asset = tradingAll.find((asset) => asset.name === "EUR/USD");
    if (asset) {
      setSelectedAssets([
        {
          name: asset.name,
          icon: asset.icon,
          profit: asset.profit,
        },
      ]);
    }
  };

  useEffect(() => {
    fetchTrader();
    fetchEURUSD();
    if (typeof window !== "undefined") {
      const isAutoTrade = localStorage.getItem("isAutoTrade") ?? "";
      setIsAutoTrade(isAutoTrade);
      setSelectedSideNavTab(isAutoTrade || "Trade");
    }
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
    openConfirmation,
    setOpenConfirmation,
    closeConfirmation,
    setCloseConfirmation,
    openAutoTrade,
    setOpenAutoTrade,
    isAutoTrade,
    setIsAutoTrade,
    showTradeStatus,
    setShowTradeStatus,
    selectedAssets,
    setSelectedAssets,
    form,
    setForm,
    switchAssetManagerModal,
    setSwitchAssetManagerModal,
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      <div className="relative max-h-[100dvh] overflow-clip bg-[#01060e] text-white max-sm:flex max-sm:flex-col max-sm:items-center max-sm:justify-end">
        <TopTraderFeedCard />
        <TopNav />
        <AssetComponent />
        <TradingChart />
        {selectedSideNavTab === "Auto trade" &&
          !showTradeStatus &&
          !openAutoTrade && <AutoTradeButton />}
        <MobileButtons />
        <ZoomButton />
        <ControlPanel />
      </div>
      <SideNav />
      <GraphStyleModal />
    </DashboardContext.Provider>
  );
}
