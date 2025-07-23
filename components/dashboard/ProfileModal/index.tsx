"use client";

import {
  X,
  ArrowLeft,
  User,
  Mail,
  MapPin,
  Copy,
  Pencil,
  Settings,
} from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

interface ProfileModalProps {
  onClose: () => void;
}

const profileData = [
  {
    icon: <User size={18} className="text-white/70" />,
    label: "Profile ID",
    value: "1582–6784–7943",
  },
  {
    icon: <Mail size={18} className="text-white/70" />,
    label: "Profile ID",
    value: "1582–6784–7943",
  },
  {
    icon: <MapPin size={18} className="text-white/70" />,
    label: "Profile ID",
    value: "1582–6784–7943",
  },
];

export default function ProfileModal({ onClose }: ProfileModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 left-[100px] z-50 bg-black/50 flex pt-[11vh] max-xl:pt-[13vh] justify-start max-sm:hidden">
      <div className="relative w-[25%] max-w-md backdrop-blur-sm border-r border-[#1D3F2F] text-white p-6 shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <ArrowLeft className="text-white cursor-pointer" onClick={onClose} />
          <h2 className="text-lg font-semibold">Profile</h2>
          <X className="text-white cursor-pointer" onClick={onClose} />
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center gap-1 mb-4">
          <Image
            src="/avatar.png" // Replace with actual image path
            alt="Profile"
            width={64}
            height={64}
            className="rounded-full border border-white/10"
          />
          <h3 className="text-white font-semibold text-base mt-2">
            Prince John
          </h3>
          <div className="flex items-center text-sm text-white/70 gap-2">
            1582–6784–7943
            <Copy size={14} className="cursor-pointer text-white/70" />
          </div>
          <button className="mt-3 text-green-500 font-semibold text-sm flex items-center gap-2">
            Edit profile <Pencil size={14} />
          </button>
        </div>

        {/* Profile Info Box */}
        <div className="rounded-xl bg-[#09201E] p-4 mb-5 border-2 border-[#1D3F2F]">
          {profileData.map((item, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-between py-3 ${
                idx < profileData.length - 1 ? "border-b border-white/10" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="text-white/60 text-sm">{item.label}</span>
              </div>
              <span className="text-white/80 text-sm">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="space-y-4">
          <button className="w-full flex items-center justify-center gap-2 rounded-xl border border-green-500 text-green-500 py-3 font-semibold text-sm">
            <Settings size={16} />
            Settings
          </button>

          <button className="w-full rounded-xl bg-green-500 py-3 font-semibold text-sm text-black hover:bg-green-600 transition">
            Account Verification
          </button>
        </div>
      </div>
    </div>
  );
}
