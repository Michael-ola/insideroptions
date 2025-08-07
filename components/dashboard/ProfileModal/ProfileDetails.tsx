"use client";

import Image from "next/image";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { Check, Settings } from "lucide-react";
import { useDashboardContext } from "@/context/DashboardContext";
import copyToClipboardFallback from "@/lib/copyToClipboard";
import Button from "@/components/Button2";
import ModalHeader from "@/components/ModalHeader";

interface ProfileDetailsProps {
  setModal: (val: string) => void;
  onClose: () => void;
}

export default function ProfileDetails({
  setModal,
  onClose,
}: ProfileDetailsProps) {
  const [copied, setCopied] = useState(false);
  const { traderData } = useDashboardContext();

  const name = `${traderData?.firstName} ${traderData?.lastName}`;

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
      icon: (
        <Icon icon="lucide:map-pin" height="18px" className="text-white/70" />
      ),
      label: "Location",
      value: "unavailable",
    },
  ];

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
    copyToClipboard(traderData ? traderData.refererCode.toString() : "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`h-full w-full`}>
      <ModalHeader title={"Profile"} onClose={onClose} className="-mt-[30px]" />
      <div className=" h-full max-h-[calc(100dvh-120px)] w-full overflow-y-auto custom-scrollbar pb-4 pt-[32px] mt-[28px] max-sm:pt-[98px]">
        <div className="flex flex-col items-center gap-1  ">
          <Image
            src="/images/traderAvatar.png"
            alt="Profile"
            width={64}
            height={64}
            className="rounded-full border border-white/10"
          />
          <h3 className="text-white font-semibold text-base mt-2">{name}</h3>
          <div className="flex items-center text-sm text-white/70 gap-2">
            {traderData?.refererCode}
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

          <button
            className="mt-3 mb-3 text-[#79DA7E] font-semibold text-sm flex items-center gap-2"
            onClick={() => setModal("Edit Profile")}
          >
            Edit profile{" "}
            <Icon
              icon="cuida:edit-outline"
              height="18px"
              className="cursor-pointer text-[#79DA7E]"
            />
          </button>
        </div>

        <div className="rounded-xl mx-6 bg-[#09201E] backdrop-blur-sm p-4 mb-7 border-2 border-[#1D3F2F]">
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

        <div className="space-y-4 mx-6 border-t-2 border-white/10 pt-[8%]">
          <button className="w-full flex items-center justify-center gap-3 rounded-xl border border-green-500 text-green-500 py-3 font-semibold text-sm hover:bg-[#0b1118] transition">
            <Settings size={16} />
            Settings
          </button>

          <Button
            className="w-full rounded-xl !gap-1 py-3 font-semibold text-sm text-black bg-[#79DA7E]"
            onClick={() => setModal("Verify Account")}
          >
            <Icon icon="bitcoin-icons:verify-outline" height="24px" />
            Account Verification
          </Button>
        </div>
      </div>
    </div>
  );
}
