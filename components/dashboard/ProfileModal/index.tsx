"use client";

import { X, MapPin, Settings, Check } from "lucide-react";

import { Icon } from "@iconify/react";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useDashboardContext } from "@/context/DashboardContext";
import Button from "@/components/Button2";
import copyToClipboardFallback from "@/lib/copyToClipboard";
interface ProfileModalProps {
  onClose: () => void;
}

export default function ProfileModal({ onClose }: ProfileModalProps) {
  const [copied, setCopied] = useState(false);
  const { traderData } = useDashboardContext();

  const profileData = [
    {
      icon: (
        <Icon
          icon="iconamoon:profile-light"
          height="18px"
          className=" text-white/70"
        />
      ),
      label: "Profile ID",
      value: traderData?.id,
    },
    {
      icon: (
        <Icon icon="fontisto:email" height="18px" className=" text-white/70" />
      ),
      label: "Email",
      value: traderData?.email,
    },
    {
      icon: <MapPin size={18} className="text-white/70" />,
      label: "Location",
      value: "unavailable",
    },
  ];

  const name = `${traderData?.firstName} ${traderData?.lastName}`;

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const copyToClipboard = (text: string) => {
    if (
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === "function"
    ) {
      navigator.clipboard
        .writeText(text)
        .catch(() => copyToClipboardFallback(text));
    } else {
      copyToClipboardFallback(text);
    }
  };

  const handleCopy = () => {
    copyToClipboard(traderData ? traderData.id.toString() : "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-offset fixed inset-0 z-50 bg-black/50 flex justify-start">
      <div className="relative w-[25%] min-w-[359px] max-sm:min-w-full z-40 max-w-md max-sm:w-full max-sm:max-w-full backdrop-blur-sm max-sm:backdrop-blur-none max-sm:bg-[#00040D] border-r border-[#1D3F2F] text-white p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <button onClick={onClose}>
            <Image
              src="/images/left.png"
              alt="Left Arrow"
              width={5}
              height={5}
              className="w-2 h-[14px] text-white"
            />
          </button>
          <h2 className="text-lg font-semibold">Profile</h2>
          <X className="text-white cursor-pointer" onClick={onClose} />
        </div>

        <div className="flex flex-col items-center gap-1 mb-4 mt-[20%] overflow-y-auto custom-scrollbar">
          <Image
            src="/images/traderAvatar.png"
            alt="Profile"
            width={64}
            height={64}
            className="rounded-full border border-white/10"
          />
          <h3 className="text-white font-semibold text-base mt-2">{name}</h3>
          <div className="flex items-center text-sm text-white/70 gap-2">
            {traderData?.id}
            <button onClick={handleCopy}>
              {copied ? (
                <Check size={14} className="text-white/70" />
              ) : (
                <Icon
                  icon="mynaui:copy"
                  height="18px"
                  className="cursor-pointer text-[#79DA7E]"
                />
              )}
            </button>
          </div>
          <button className="mt-3 mb-3 text-[#79DA7E] font-semibold text-sm flex items-center gap-2">
            Edit profile{" "}
            <Icon
              icon="cuida:edit-outline"
              height="18px"
              className="cursor-pointer text-[#79DA7E]"
            />
          </button>
        </div>

        <div className="rounded-xl bg-[#09201E] backdrop-blur-sm p-4 mb-7 border-2 border-[#1D3F2F]">
          {profileData.map((item, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-between py-3 ${
                idx < profileData.length - 1 ? "border-b border-white/10" : ""
              }`}
            >
              <div className="flex items-center">
                {item.icon}
                <span className="text-white/60 text-sm ml-3">{item.label}</span>
              </div>
              <span className="text-white/80 text-sm">{item.value}</span>
            </div>
          ))}
        </div>

        <div className="space-y-4 border-t-2 border-white/10 pt-[8%]">
          <button className="w-full flex items-center justify-center gap-3 rounded-xl border border-green-500 text-green-500 py-3 font-semibold text-sm hover:bg-[#0b1118] transition">
            <Settings size={16} />
            Settings
          </button>

          <Button className="w-full rounded-xl !gap-1 py-3 font-semibold text-sm text-black bg-[#79DA7E]">
            <Icon icon="bitcoin-icons:verify-outline" height="24px" />
            Account Verification
          </Button>
        </div>
      </div>
    </div>
  );
}
