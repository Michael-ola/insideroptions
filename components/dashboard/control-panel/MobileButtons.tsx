"use client";

import React from "react";
import Image from "next/image";
import { useState } from "react";
import { useDashboardContext } from "@/context/DashboardContext";

const IconButtons = [
  {
    label: "Settings",
    icon: "/images/arc.png",
    alt: "Settings",
  },
  {
    label: "Chart",
    icon: "/images/chart-type.png",
    alt: "Waves",
  },
  {
    label: "User",
    icon: "/images/user_.png",
    alt: "User",
  },
];

const MobileButtons = () => {
  const [isClicked, setIsClicked] = useState(false);

  const { setOpenGraphStyleModal, setShowTraderFeed } = useDashboardContext();

  function IconButton({ label, icon, onClick, alt }: any) {
    return (
      <button
        onClick={() => onClick(label)}
        className={` border border-[#2a352d] bg-[#10181b] h-[34px] w-[57px] rounded-xl py-1 px-4 flex items-center justify-center hover:bg-[#151d24] transition`}
      >
        <Image src={icon} alt={alt} width={16} height={16} />
      </button>
    );
  }

  function handleClick(action: string) {
    console.log(`${action} clicked`);
    if (action === "Chart") {
      setOpenGraphStyleModal(true);
    } else if (action === "User") {
      setShowTraderFeed(true);
    }
  }

  return (
    <div
      className={`${
        isClicked ? "rounded-b-md" : "rounded-md bg-transparent"
      } fixed z-20 bottom-[190px] left-[5%] w-[75px] h-[44px] bg-[#1b1b1d]  flex items-center justify-center`}
    >
      <button
        onClick={() => setIsClicked((prev) => !prev)}
        className=" w-[58px] h-[34px] rounded-xl py-1 px-4 border border-[#2a352d] bg-[#10181b] sm:hidden"
      >
        <Image
          className="text-white"
          src={
            isClicked
              ? "/images/slider-icon-green.png"
              : "/images/slider-icon.png"
          }
          width={24}
          height={28}
          alt="Zoom"
        />
        {isClicked && (
          <div className="flex absolute bottom-[99%] bg-[#1b1b1d] py-2 px-4 w-[75px] rounded-t-md left-0 flex-col gap-2 items-center justify-center">
            {IconButtons.map((btn) => (
              <IconButton
                key={btn.label}
                label={btn.label}
                icon={btn.icon}
                alt={btn.alt}
                onClick={handleClick}
              />
            ))}
          </div>
        )}
      </button>
    </div>
  );
};

export default MobileButtons;
