"use client";

import CashierModal from "@/components/cashier/cashierModal";
import AssetComponent from "@/components/dashboard/assets/AssetComponent";
import ControlPanel from "@/components/dashboard/control-panel";
import { useState } from "react";
export default function AssetModalPage() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <div className="relative min-h-screen bg-[#0d181c] text-white max-sm:flex max-sm:flex-col max-sm:items-center">
      <AssetComponent />
      <ControlPanel />
      <CashierModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
