import React from "react";
import AssetModal from "@/components/dashboard/assets/AssetModal";
import { IoAdd, IoClose } from "react-icons/io5";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useDashboardContext } from "@/context/DashboardContext";
import Image from "next/image";

const AssetComponent = () => {
  const [open, setOpen] = useState(false);
  const { selectedAssets } = useDashboardContext();
  return (
    <div className="absolute flex items-center mx-auto gap-3 top-13 left-1/2 -translate-x-1/2 z-60 max-sm:top-[10%]">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`${
          selectedAssets.length >= 2 ? "hidden" : ""
        } w-[35px] h-[35px] z-[60] flex items-center justify-center rounded-[8px]
             bg-[#162125] border border-[#10201f] text-white
             hover:bg-[#273134] transition cursor-pointer`}
      >
        <div className="w-full h-full flex items-center justify-center">
          {open ? (
            <IoClose className="w-full h-full p-1" />
          ) : (
            <IoAdd className="w-full h-full p-1" />
          )}
        </div>
      </button>
      {selectedAssets.length > 0 &&
        selectedAssets.map((selectedAsset) => (
          <AssetTab key={selectedAsset.name} selectedAsset={selectedAsset} />
        ))}
      <AnimatePresence>
        {open && (
          <AssetModal add isOpen={open} onClose={() => setOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AssetComponent;

interface AssetTabType {
  selectedAsset: {
    name: string;
    icon: string;
    profit: number;
  };
}

function AssetTab({ selectedAsset }: AssetTabType) {
  const [open, setOpen] = useState(false);
  const { setSelectedAssets } = useDashboardContext();

  const closeTab = () => {
    setSelectedAssets((prev: AssetTabType["selectedAsset"][]) =>
      prev.filter((asset) => asset.name !== selectedAsset.name)
    );
  };

  return (
    <div className="relative">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="relative flex items-center justify-center gap-1 pl-[9px] pr-7 max-sm:w-[28vw] pt-1 pb-1 border-2 border-[#0e1c1c] rounded-xl bg-[#172226] hover:bg-[#273134] max-sm:bg-[#020712] cursor-pointer"
      >
        <Image
          src={selectedAsset.icon}
          alt={selectedAsset.name}
          className="w-6 h-6 rounded-full"
          width={30}
          height={30}
        />
        <div className="text-white flex flex-col">
          <span className="text-[11px] font-semibold leading-tight">
            {selectedAsset.name}
          </span>
          <p className="text-[9px] text-gray-400 flex items-center gap-1">
            <span className="text-[#595959] font-medium">TP</span>{" "}
            <span className="w-1 h-1 bg-[#595959] inline-block rounded-full"></span>{" "}
            <span className="text-[#79DA7E] ">{selectedAsset.profit}%</span>
          </p>
        </div>
        <div className="absolute right-1 top-0">
          <IoClose
            onClick={closeTab}
            className="text-neutral-400 hover:text-white transition cursor-pointer"
          />
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <AssetModal
            replace={selectedAsset}
            isOpen={open}
            onClose={() => setOpen(false)}
            className="left-0 top-11"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
