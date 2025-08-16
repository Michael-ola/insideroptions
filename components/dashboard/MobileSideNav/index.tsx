"use client";

import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";
import CashierIcon from "../icons/cashierIcon";
import PartnerIcon from "../icons/partnerIcon";
import HelpIcon from "../icons/helpIcon";
import ProfileIcon from "../icons/profileIcon";
import AssetManagerIcon from "../icons/assetManagerIcon";
import LogoutIcon from "../icons/logoutIcon";
import { Settings, Check } from "lucide-react";
import copyToClipboardFallback from "@/lib/copyToClipboard";
import { useDashboardContext } from "@/context/DashboardContext";
import ModalComponent from "../ModalComponent";
import PortalWrapper from "@/components/PortalWrapper";
import { apiClient } from "@/lib/api-client";

type NavItem = {
  label: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
  onClick: () => void;
};

type SideNavProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SideNav: React.FC<SideNavProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { selectedSideNavTab, setSelectedSideNavTab } = useDashboardContext();

  const navItems: NavItem[] = [
    {
      label: "Profile",
      icon: ProfileIcon,
      onClick: () => setSelectedSideNavTab("Profile"),
    },
    {
      label: "Cashier",
      icon: CashierIcon,
      onClick: () => setSelectedSideNavTab("Cashier"),
    },
    {
      label: "Partner",
      icon: PartnerIcon,
      onClick: () => setSelectedSideNavTab("Partner"),
    },
    {
      label: "Asset Manager",
      icon: AssetManagerIcon,
      onClick: () => setSelectedSideNavTab("Asset Manager"),
    },
    {
      label: "Help",
      icon: HelpIcon,
      onClick: () => setSelectedSideNavTab("Help"),
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
    copyToClipboard("1582-6784-1943");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLogout = async () => {
    try {
      await apiClient.post(`auth/logout`);
      localStorage.removeItem("token");
      localStorage.removeItem("isAutoTrade");
      window.location.href = "/login";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-[#0D111C] z-40"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 w-[88%] h-full bg-[#0d111c] z-50 pb-4 shadow-lg p-4 flex flex-col sm:!hidden"
            >
              <div className="flex justify-end mb-[10%] mt-2">
                <button onClick={onClose}>
                  <Icon icon="ic:round-close" className="text-white text-2xl" />
                </button>
              </div>

              <div className="bg-[#1c2230] rounded-xl p-4 px-3 py-[10%] flex items-center mb-10">
                <Image
                  src="/images/traderAvatar.png"
                  alt="avatar"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="text-white font-semibold mb-1">Prince John</p>

                  <div className="flex items-center no-underline text-[13.3px] text-white/70 gap-1">
                    <span>{"1582-6784-1943"}</span>
                    <button onClick={handleCopy}>
                      {copied ? (
                        <Check size={14} className="text-white/70" />
                      ) : (
                        <Icon
                          icon="mynaui:copy"
                          height="16px"
                          className="cursor-pointer text-[#79DA7E]"
                        />
                      )}
                    </button>
                  </div>
                </div>
                <span className="ml-auto bg-[#c9a96e] text-black px-3 py-1.5 rounded-lg text-md">
                  Demo
                </span>
              </div>

              <nav className="flex flex-col gap-4 flex-grow">
                {navItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedIndex(idx);
                      onClose();
                      item.onClick();
                    }}
                    className={`flex items-center gap-4 px-4 py-2 rounded-md font-medium transition
            ${
              selectedSideNavTab === item.label && selectedIndex === idx
                ? "bg-[#D0F2D1] text-[#0D111C]"
                : "text-white/80 hover:bg-[#0b1118]"
            }`}
                  >
                    <item.icon className="text-xl w-6 h-6" />
                    <span>{item.label}</span>
                  </button>
                ))}

                <div className="flex flex-col gap-4 mb-2 mt-auto">
                  <button
                    onClick={() => setSelectedIndex(1000)}
                    className={`flex items-center gap-4 px-4 py-2 rounded-md font-medium transition ${
                      selectedIndex === 1000
                        ? "bg-[#D0F2D1] text-[#0D111C]"
                        : "text-white/80 hover:bg-[#0b1118]"
                    }`}
                  >
                    <Settings size={20} />
                    Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex gap-5 items-center pl-4 font-semibold text-sm text-red-500 hover:text-red-600 transition-all"
                  >
                    <LogoutIcon className="w-5 h-5" />
                    <div>Log out</div>
                  </button>
                </div>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
      <PortalWrapper>
        <ModalComponent
          nav={selectedSideNavTab}
          setSelectedSideNavTab={setSelectedSideNavTab}
        />
      </PortalWrapper>
    </>
  );
};

export default SideNav;
