"use client";

import AssetComponent from "@/components/dashboard/assets/AssetComponent";
import ControlPanel from "@/components/dashboard/control-panel";
export default function AssetModalPage() {
  return (
    <div className="relative min-h-screen bg-[#0d181c] text-white max-sm:flex max-sm:flex-col max-sm:items-center">
      <AssetComponent />
      <ControlPanel />
    </div>
  );
}
