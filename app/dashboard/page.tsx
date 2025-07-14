"use client";

import CashierModal from "@/components/cashier/cashierModal";
import AssetComponent from "@/components/dashboard/assets/AssetComponent";
import ControlPanel from "@/components/dashboard/control-panel";
import { useState } from "react";
import GraphStyleModal from "@/components/dashboard/graphStyleModal";

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

  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <DashboardContext.Provider value={contextValue}>
      <div className="relative min-h-screen bg-[#0d181c] text-white max-sm:flex max-sm:flex-col max-sm:items-center">
        <AssetComponent />
        <ControlPanel />
        <GraphStyleModal />
        <CashierModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    </DashboardContext.Provider>
  );
}
