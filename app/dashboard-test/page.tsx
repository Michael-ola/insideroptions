"use client";

import { useState } from "react";
import AssetModal from "@/components/dashboard-assets/AssetModal";
import { IoAdd, IoClose } from "react-icons/io5";
import CashierModal from "@/components/cashier/cashierModal";

export default function AssetModalPage() {
  const [open, setOpen] = useState(false);
   const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="relative min-h-screen bg-[#0d181c] text-white">
      {/* Centered top button */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="w-[40px] h-[40px] z-[60] flex items-center justify-center rounded-[8px]
                     bg-[#040b14] border border-[#10201f] text-white
                     hover:bg-[#273134] transition cursor-pointer"
        >
          {open ? <IoClose size={20} /> : <IoAdd size={22} />}
        </button>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-[40px] h-[40px] z-[60] flex items-center justify-center rounded-[8px]
                     bg-[#040b14] border border-[#10201f] text-white
                     hover:bg-[#273134] transition cursor-pointer"
        >
          {isOpen ? <IoClose size={20} /> : <IoAdd size={22} />}
        </button>
        <AssetModal
          isOpen={open}
          onClose={() => setOpen(false)} // Center modal under button
        />
      </div>
        <CashierModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />
    </div>
  );
}
