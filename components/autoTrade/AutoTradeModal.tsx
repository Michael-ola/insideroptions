"use client";

export type Asset = {
  id: number;
  assetName: string;
  symbol: string;
  assetType: "STOCK" | "CRYPTO" | "FOREX" | string;
  basePrice: number;
  description: string;
  imageUrl: string;
  createdDate: string;
  lastModifiedDate: string;
  change: number;
  profit: number;
  status: "ACTIVE" | "INACTIVE" | string;
};

import { useEffect, useState } from "react";
import ModalWrapper from "../modalWrapper";
import { AnimatePresence, motion } from "framer-motion";
import { StaticImageData } from "next/image";
import CI from "./CI";
import TradingPlan from "./TradingPlan";
import Assets from "./Assets";
import ConfirmModal from "../ConfirmationModal";
import { useDashboardContext } from "@/context/DashboardContext";
import AutoTradeHistory from "./AutoTradeHistory";
import { apiClient } from "@/lib/api-client";
import Loader from "../Loader";
import PortalWrapper from "../PortalWrapper";

export default function AutoTradeModal({ onClose }: { onClose: () => void }) {
  const [view, setView] = useState<string>("Current Investment");
  const [isStartAutoTrade, setIsStartAutoTrade] = useState<boolean>(false);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [tradingPlan, setTradingPlan] = useState<string>("Starter");
  const [amount, setAmount] = useState<string | number>("");
  const [asset, setAsset] = useState<string>("EUR/USD");
  const [assets, setAssets] = useState<Asset[] | null>(null);
  const [selectedTradeOption, setSelectedTradeOption] = useState<string>(
    "43,200 mins/30days/15%"
  );
  const [iconOrImage, setIconOrImage] = useState<StaticImageData | string>("");
  const { showTradeStatus, setShowTradeStatus, setOpenAutoTrade } =
    useDashboardContext();

  useEffect(() => {
    getAssetLists();
  }, []);

  const getAssetLists = async () => {
    setIsloading(true);
    try {
      const res = await apiClient.get("/assets/");
      const mainAsset = res.data.find(
        (asset: Asset) => asset.assetName === "EUR/USD"
      );
      setAssets(res.data);
      setAsset(mainAsset.assetName);
      setIsloading(false);
    } catch (error) {
      setIsloading(false);
      console.log(error);
    }
  };

  const handleViewChange = (nextView: string) => setView(nextView);

  const startAutoTrade = () => {
    console.log("auto trade api wire");
    // onClose();
    setShowTradeStatus(true);
  };

  const mins = selectedTradeOption.split("/")[0];
  const days = selectedTradeOption.split("/")[1];
  const day = selectedTradeOption.split("/")[1].split("days")[0];
  const perc = selectedTradeOption.split("/")[2].split("%")[0];
  const percentage = (Number(perc) / Number(day)).toFixed(2);

  const renderView = () => {
    if (isLoading) return <Loader />;
    switch (view) {
      case "Current Investment":
        return (
          <CI
            onClose={onClose}
            handleViewChange={handleViewChange}
            tradingPlan={tradingPlan}
            setTradingPlan={setTradingPlan}
            selectedAsset={asset}
            setSelectedTradeOption={setSelectedTradeOption}
            selectedTradeOption={selectedTradeOption}
            setAmount={setAmount}
            amount={amount}
            setIsStartAutoTrade={setIsStartAutoTrade}
            showTradeStatus={showTradeStatus}
            assets={assets}
          />
        );
      case "Trading Plan":
        return (
          <TradingPlan
            handleViewChange={handleViewChange}
            setTradingPlan={setTradingPlan}
            tradingPlan={tradingPlan}
          />
        );
      case "Asset List":
        return (
          <Assets
            handleViewChange={handleViewChange}
            setAsset={setAsset}
            assets={assets}
          />
        );
      case "History":
        return <AutoTradeHistory />;
      default:
        return null;
    }
  };

  return (
    <div>
      <motion.div layout>
        <AnimatePresence>
          <ModalWrapper
            title={view}
            icon={iconOrImage}
            onClose={() => {
              onClose();
              setShowTradeStatus(false);
              setOpenAutoTrade(false);
            }}
            handleViewChange={handleViewChange}
            setIconOrImage={setIconOrImage}
          >
            {renderView()}
          </ModalWrapper>
        </AnimatePresence>
      </motion.div>

      {isStartAutoTrade && (
        <PortalWrapper>
          <ConfirmModal
            onCancel={() => setIsStartAutoTrade(false)}
            onConfirm={startAutoTrade}
            canCheck
            title="Auto trade"
            message={`You are about to trade for ${mins} with Trade Amount $${Number(
              amount
            ).toLocaleString()} with ${tradingPlan} Trading Plan at ${percentage}% daily profits for ${days}`}
          />
        </PortalWrapper>
      )}
    </div>
  );
}
