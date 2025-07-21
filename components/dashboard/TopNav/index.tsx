"use client";

import React from "react";
import BalanceCard from "./BalanceCard";
import CashierButton from "./CashierButton";
import UserMenu from "./UserMenu";
import Image from "next/image";
import { useDashboardContext } from "@/context/DashboardContext";

export default function TopNav() {
  const { selectedAccount } = useDashboardContext();

  return (
    <nav className="relative w-full px-6 py-3 h-[13vh] xl:h-[11vh] flex justify-between items-center bg-[#0D1117] max-sm:mb-auto max-sm:pt-7 max-sm:h-[12vh] max-sm:bg-transparent">
      <Image
        src="/images/logo.png"
        className="ml-2 pt-2 max-sm:hidden"
        alt="Logo"
        width={45}
        height={45}
      />
      <div className="flex gap-2 ml-auto h-[57px] items-center max-sm:mx-auto">
        <div className="h-full bg-[#374143] mr-auto border-2 border-[#1A2C28] flex items-center justify-center cursor-pointer rounded-xl px-4 sm:hidden">
          <Image
            src="/images/hamburger-stack.png"
            className=""
            alt="harmburger"
            width={20}
            height={20}
          />
        </div>
        <BalanceCard
          label="Profit Balance"
          className="max-sm:hidden cursor-default"
        />
        <BalanceCard
          accountType={selectedAccount}
          dropdown
          className="bg-[#374143] max-sm:hidden cursor-pointer"
        />
        <BalanceCard
          accountType={selectedAccount}
          dropdown
          className="bg-[#374143] sm:hidden cursor-pointer"
        />
        <CashierButton />
        <UserMenu />
      </div>
      <div className="nav-bottom-line absolute left-0 right-0 bottom-0 w-full max-sm:hidden"></div>
    </nav>
  );
}
