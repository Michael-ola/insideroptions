"use client";

import AssetComponent from "@/components/dashboard/assets/AssetComponent";
import ControlPanel from "@/components/dashboard/control-panel";
import GraphStyleModal from "@/components/dashboard/graphStyleModal";

import { useState } from "react";
import { DashboardContext } from "@/context/DashboardContext";
import type { DashboardPropsType } from "@/types/dashboard";

export default function DashboardPage() {
  const [openGraphStyleModal, setOpenGraphStyleModal] = useState(false);
  const [chartStyle, setChartStyle] = useState("lines");

  const contextValue: DashboardPropsType = {
    openGraphStyleModal,
    setOpenGraphStyleModal,
    chartStyle,
    setChartStyle,
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      <div className="relative min-h-screen bg-[#0d181c] text-white max-sm:flex max-sm:flex-col max-sm:items-center">
        <AssetComponent />
        <ControlPanel />
        <GraphStyleModal />
      </div>
    </DashboardContext.Provider>
  );
}
