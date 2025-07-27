"use client";

import { ChevronDown } from "lucide-react";
import { HTMLAttributes } from "react";
import AccountModal from "../AccountsModal";
import { useState } from "react";
import api from "@/data/accounts/accountsdata.json";

interface BalanceCardProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  accountType?: string;
  dropdown?: boolean;
}

export default function BalanceCard({
  label,
  accountType,
  dropdown,
  className,
  ...rest
}: BalanceCardProps) {
  const [openAccountsModal, setOpenAccountsModal] = useState(false);
  const profitBalance = api.profitBalance;
  let realBalance = "";
  let demoBalance = "";

  api.accounts.forEach((account) => {
    if (account.id === "real") realBalance = account.amount;
    else if (account.id === "demo") demoBalance = account.amount;
  });

  const amount =
    accountType === "real"
      ? realBalance
      : accountType === "demo"
      ? demoBalance
      : profitBalance;

  const displayLabel = label || (accountType && `${accountType} Balance`);

  return (
    <>
      <div
        className={`bg-[#1B1F23] border border-[#1A2C28] text-white px-4 py-1 pt-2 justify-center h-[70%] max-sm:h-[72%] rounded-xl flex flex-col items-start ${className}`}
        {...rest}
        onClick={() =>
          accountType &&
          ["real", "demo"].includes(accountType) &&
          setOpenAccountsModal(true)
        }
      >
        <span className="font-medium text-xs leading-2.5">{`$${amount}`}</span>
        <div className="flex items-center text-[10px] max-sm:text-[12px]">
          <span className="text-white/60 capitalize">{displayLabel}</span>
          {dropdown && <ChevronDown className="w-4 h-4 text-white/60 ml-1" />}
        </div>
      </div>
      <AccountModal
        accounts={api.accounts}
        openAccountsModal={openAccountsModal}
        setOpenAccountsModal={setOpenAccountsModal}
      />
    </>
  );
}
