import React from "react";
import AssetModal from "@/components/dashboard/assets/AssetModal";
import { IoAdd, IoClose } from "react-icons/io5";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

const AssetComponent = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-[40px] h-[40px] z-[60] flex items-center justify-center rounded-[8px]
             bg-[#040b14] border border-[#10201f] text-white
             hover:bg-[#273134] transition cursor-pointer"
      >
        <div className="w-full h-full flex items-center justify-center">
          {open ? (
            <IoClose className="w-full h-full p-2" />
          ) : (
            <IoAdd className="w-full h-full p-2" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {open && <AssetModal isOpen={open} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default AssetComponent;
