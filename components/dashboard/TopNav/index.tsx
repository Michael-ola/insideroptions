"use client";

import React, { useState } from "react";
import BalanceCard from "./BalanceCard";
import CashierButton from "./CashierButton";
import UserMenu from "./UserMenu";
import Image from "next/image";
import { useDashboardContext } from "@/context/DashboardContext";
import Link from "next/link";
import MobileSideNav from "@/components/dashboard/MobileSideNav";
import PortalWrapper from "@/components/PortalWrapper";

export default function TopNav() {
  const { selectedAccount } = useDashboardContext();
  const [hamburgerClicked, setHamburgerClicked] = useState(false);

  return (
    <nav
      style={{ height: "var(--top-nav-height)" }}
      className="relative w-full px-6 py-3 pt-4 flex z-10 justify-between items-center bg-transparent max-sm:mb-auto max-sm:pt-3 max-sm:h-[12vh] max-sm:bg-transparent"
    >
      <Link href="/dashboard">
        <Image
          src="/images/logo.png"
          className=" pt-2 mt-3 max-sm:hidden"
          alt="Logo"
          width={35}
          height={35}
        />
      </Link>
      <div className="flex gap-2 ml-auto h-[52px] items-center max-sm:mx-auto">
        <div
          onClick={() => setHamburgerClicked(true)}
          className="py-2.5 bg-[#374143] mr-auto border border-[#1A2C28] flex items-center justify-center cursor-pointer rounded-xl px-4 sm:hidden"
        >
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
      <div className="nav-bottom-line absolute left-0 right-0 bottom-0 w-full hidden max-sm:hidden"></div>
      {hamburgerClicked ? (
        <PortalWrapper>
          <MobileSideNav
            isOpen={hamburgerClicked}
            onClose={() => setHamburgerClicked(false)}
          />
        </PortalWrapper>
      ) : (
        <></>
      )}
    </nav>
  );
}
