"use client";

import { ChevronDown } from "lucide-react";
import { HTMLAttributes } from "react";
import AccountModal from "../AccountsModal";
import { useState } from "react";
import api from "@/data/accounts/accountsdata.json";
import PortalWrapper from "@/components/PortalWrapper";
import { useDashboardContext } from "@/context/DashboardContext";
import getBalanceAmount from "@/lib/getBalanceAmount";

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
  const { traderData, selectedAccount } = useDashboardContext();
  let realBalanceToShow = 0;
  let demoBalanceToShow = 0;
  let realBalance = 0;
  let demoBalance = 0;

  const emptyBalanceObject = {
    accountBalance: 0,
    profitBalance: 0,
    ttBalance: 0,
    referralBalance: 0,
  };

  const selectedBalance = traderData
    ? getBalanceAmount(traderData.accounts, selectedAccount)
    : emptyBalanceObject;
  const profitBalance = selectedBalance ? selectedBalance.profitBalance : 0;

  if (accountType && traderData) {
    const realBalanceObject = getBalanceAmount(
      traderData.accounts,
      "INDIVIDUAL"
    );
    const demoBalanceObject = getBalanceAmount(traderData.accounts, "DEMO");
    realBalance = realBalanceObject.accountBalance;
    demoBalance = demoBalanceObject.accountBalance;

    realBalanceToShow = accountType.toLowerCase() === "real" ? realBalance : 0;

    demoBalanceToShow = accountType.toLowerCase() === "demo" ? demoBalance : 0;
  }

  api.profitBalance = profitBalance.toFixed(2).toString();
  api.accounts[0].amount = realBalance.toFixed(2).toString();
  api.accounts[3].amount = demoBalance.toFixed(2).toString();

  const amount =
    accountType?.toLowerCase() === "real"
      ? realBalanceToShow
      : accountType?.toLowerCase() === "demo"
      ? demoBalanceToShow
      : profitBalance;

  const displayLabel = label || (accountType && `${accountType} Balance`);

  return (
    <>
      <div
        className={`bg-[#1B1F23] border border-[#1A2C28] text-white px-4 py-1 pt-2 justify-center h-[70%] max-sm:h-[72%] rounded-xl flex flex-col items-start ${className}`}
        {...rest}
        onClick={() =>
          accountType &&
          ["real", "demo"].includes(accountType.toLowerCase()) &&
          setOpenAccountsModal(true)
        }
      >
        <span className="font-medium text-xs leading-2.5">{`$${amount}`}</span>
        <div className="flex items-center text-[10px] max-sm:text-[12px]">
          <span className="text-white/60 capitalize">
            {displayLabel ? displayLabel.toLowerCase() : ""}
          </span>
          {dropdown && <ChevronDown className="w-4 h-4 text-white/60 ml-1" />}
        </div>
      </div>
      <PortalWrapper>
        <AccountModal
          accounts={api.accounts}
          openAccountsModal={openAccountsModal}
          setOpenAccountsModal={setOpenAccountsModal}
        />
      </PortalWrapper>
    </>
  );
}
