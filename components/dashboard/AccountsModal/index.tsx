"use client";

import Image from "next/image";
import { X, AlertTriangle, Plus } from "lucide-react";
import { useDashboardContext } from "@/context/DashboardContext";
import { useState } from "react";
import toFloat from "@/lib/toFloat";
interface AccountStyle {
  bgColor: string;
  textColor: string;
  borderColor: string;
  icon: string;
  selectable: boolean;
  filled: boolean;
  disabled: boolean;
}

const defaultAccountStyle: AccountStyle = {
  bgColor: "#000000",
  textColor: "text-white",
  borderColor: "border-white",
  icon: "alert",
  selectable: false,
  filled: false,
  disabled: false,
};

const accountStyles: Record<string, AccountStyle> = {
  real: {
    ...defaultAccountStyle,
    bgColor: "#79DA7E",
    textColor: "text-black",
    borderColor: "border-black",
    selectable: true,
    filled: false,
  },
  frozen: {
    ...defaultAccountStyle,
    bgColor: "#410D0E",
    textColor: "text-white",
    borderColor: "border-white",
    disabled: true,
  },
  tt: {
    ...defaultAccountStyle,
    bgColor: "#2A2A2C",
    disabled: true,
  },
  demo: {
    ...defaultAccountStyle,
    bgColor: "#1c1c1f",
    textColor: "text-[#FFD580]",
    borderColor: "border-[#FFD580]",
    selectable: true,
    filled: false,
    icon: "",
  },
};

type AccountType = "real" | "frozen" | "tt" | "demo";

export default function AccountModal({
  accounts,
  openAccountsModal,
  setOpenAccountsModal,
}: {
  accounts: { id: string; name: string; amount: string }[];
  openAccountsModal: boolean;
  setOpenAccountsModal: (value: boolean) => void;
}) {
  const {
    setSelectedAccount: setGlobalSelectedAccount,
    setSelectedBalanceAmount,
    setTradeAmount,
  } = useDashboardContext();
  const [selectedAccount, setSelectedAccount] = useState("real");
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) setOpenAccountsModal(false);
  };

  const handleSelection = (id: string, amount: number | string) => {
    const value = toFloat(amount);
    setSelectedBalanceAmount(value ? value : 0);
    setTradeAmount(value ? value : 0);
    setGlobalSelectedAccount(id);
    setOpenAccountsModal(false);
  };

  return (
    <div
      className={`fixed inset-0 z-50 max-sm:px-[5%] flex items-center justify-center bg-black/80 ${
        openAccountsModal ? "flex" : "hidden"
      }`}
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-sm rounded-xl bg-[#05090D] border border-[#2e4230] p-6 shadow-lg">
        <button
          onClick={() => setOpenAccountsModal(false)}
          className="absolute right-4 top-4 text-white/70 hover:text-white"
        >
          <X size={20} />
        </button>

        <div className="flex justify-center mb-2 mt-2">
          <Image src="/images/logo.png" alt="Logo" width={45} height={45} />
        </div>

        <h2 className="text-center text-white font-semibold text-md mb-4">
          Accounts
        </h2>

        <div className="space-y-2">
          {accounts.map(({ id, name, amount }) => {
            const style = accountStyles[id as AccountType];
            const isSelected = selectedAccount === id;
            const isDisabled = style.disabled;
            const isSelectable = style.selectable && !isDisabled;

            return (
              <div
                key={id}
                className={`flex items-center justify-between rounded-md px-4 py-3 ${
                  isSelectable ? "cursor-pointer" : "cursor-default"
                } ${
                  isDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : id === "demo"
                    ? isSelected
                      ? "opacity-100"
                      : "opacity-60"
                    : isSelectable && !isSelected
                    ? "opacity-50"
                    : ""
                }`}
                style={{ backgroundColor: style.bgColor }}
                onClick={() => {
                  if (isSelectable) setSelectedAccount(id as AccountType);
                }}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-4 h-4 rounded-full flex justify-center items-center border-[5px] ${
                      style.borderColor
                    } ${
                      style.filled
                        ? style.borderColor.replace("border-", "bg-")
                        : "bg-transparent"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${style.bgColor} ${
                        isSelected ? "block" : "hidden"
                      }`}
                    />
                  </div>
                  <div
                    className={`text-sm leading-4 ${style.textColor} ${
                      id === "demo" ? "font-semibold" : ""
                    }`}
                  >
                    <div>{name}</div>
                    <div>{amount}</div>
                  </div>
                </div>
                {isSelected && (
                  <button
                    className="bg-black text-white p-0.5 rounded-sm mr-auto ml-5"
                    onClick={() => handleSelection(id, amount)}
                  >
                    <Plus size={14} />
                  </button>
                )}
                {style.icon === "alert" && (
                  <AlertTriangle size={16} className={style.textColor} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
