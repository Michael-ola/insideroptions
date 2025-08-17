"use client";

import { useEffect, useState } from "react";
import ModalWrapper from "../modalWrapper";
import { AnimatePresence, motion } from "framer-motion";
import { StaticImageData } from "next/image";
import CashierList from "./CashierList";
import { useDashboardContext } from "@/context/DashboardContext";
import DepositList from "./deposit/DepositList";
import CryptoView from "./deposit/CryptoView";
import BankTransfer from "./deposit/BankTransfer";
import CryptoPayView from "./deposit/cryptoPayView";
import WithdrawalView from "./withdrawal/WithdrawalView";
import OtpModal from "./withdrawal/OtpModal";
import SuccessModal from "./withdrawal/SuccessModal";
import TxList from "./Transactions/TxList";
import TxFilters from "./Transactions/TxFilters";
import { apiClient } from "@/lib/api-client";
import SwapView from "./swap/SwapView";

export type SelectedCrypto =
  | "USDT (ERC20)"
  | "BITCOIN (BTC)"
  | "USDT (TRC20)"
  | "ETHEREUM (ETH)";

export type DepositOption =
  | "USDT, BITCOIN, ETHEREUM"
  | "Bank Transfer"
  | "Binance Pay"
  | "Visa/Master Card";

export type ModalView =
  | "My Cashier"
  | "Deposit"
  | "Withdrawals"
  | "Swap (Profit bal - Real bal)"
  | "Transaction History"
  | "Filters"
  | DepositOption
  | SelectedCrypto;

export type Transaction = {
  id: number;
  accountId: number;
  transactionId: string;
  transactionType: string;
  fromCurrency: string;
  toCurrency: string;
  fromAccount: string;
  toAccount: string;
  type: string;
  pair: string;
  totalAmountInUsd: number;
  transactionStatus: string;
  isReversal: "Y" | "N";
  transactionReferenceId: string;
  isCryptoTransaction: "Y" | "N";
  isReferralTransaction: "Y" | "N";
  completedDate: Date;
  initiatedDate: Date;
  isAutomated: "Y" | "N";
};

export type CryptoData = {
  id: number;
  coin: string;
  depositAddress: string;
  redeemScript: string;
};

export default function CashierModal({ onClose }: { onClose: () => void }) {
  const { traderData } = useDashboardContext();
  const [view, setView] = useState<string>("My Cashier");
  const [iconOrImage, setIconOrImage] = useState<StaticImageData | string>("");
  const [selectedCrypto, setSelectedCrypto] = useState<string | null>(null);
  const [openOtp, setOpenOtp] = useState<boolean>(false);
  const [openSuccess, setOpenSuccess] = useState<boolean>(false);
  const [cryptoData, setCryptoData] = useState<CryptoData | null>(null);

  //Transaction states
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filters, setFilters] = useState<any>({});
  const [nextCursorId, setNextCursorId] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoadingTx, setIsLoadingTx] = useState<boolean>(false);

  useEffect(() => {
    if (view === "Transaction History" && transactions.length === 0) {
      fetchTransactions({}, null, false);
    }
  }, [view]);

  const realAccount = traderData?.accounts.find(
    (account) => account.accountType === "INDIVIDUAL"
  );

  const formatPeriod = (
    range: "today" | "this month" | "this week" | "previous month" | "this year"
  ) => {
    const now = new Date();

    const formatDate = (date: Date, time: "start" | "end" = "start") => {
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");
      const hhmmss = time === "start" ? "00:00:00" : "23:59:59";
      return `${yyyy}-${mm}-${dd}T${hhmmss}`;
    };

    let startDate: string;
    let endDate: string;

    if (range === "today") {
      startDate = formatDate(now, "start");
      endDate = formatDate(now, "end");
    } else if (range === "this month") {
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      startDate = formatDate(firstDayOfMonth, "start");
      endDate = formatDate(lastDayOfMonth, "end");
    } else if (range === "previous month") {
      const firstPrevMonth = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
      );
      const lastPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      startDate = formatDate(firstPrevMonth, "start");
      endDate = formatDate(lastPrevMonth, "end");
    } else if (range === "this week") {
      const day = now.getDay();
      const diffToMonday = (day === 0 ? -6 : 1) - day;
      const monday = new Date(now);
      monday.setDate(now.getDate() + diffToMonday);
      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);

      startDate = formatDate(monday, "start");
      endDate = formatDate(sunday, "end");
    } else {
      const firstDayOfYear = new Date(now.getFullYear(), 0, 1);
      const lastDayOfYear = new Date(now.getFullYear(), 11, 31);
      startDate = formatDate(firstDayOfYear, "start");
      endDate = formatDate(lastDayOfYear, "end");
    }

    return { startDate, endDate };
  };

  //Transaction functions
  const fetchTransactions = async (
    incomingFilters = filters,
    cursorId: string | null = null,
    append = false
  ) => {
    console.log("filters", incomingFilters);
    if (Object.keys(incomingFilters).length === 0 && !cursorId) {
      setIsLoadingTx(true);
    }
    try {
      const query = new URLSearchParams();

      if (incomingFilters.status)
        query.append("transactionStatus", incomingFilters.status);
      if (incomingFilters.category && incomingFilters.category !== "All Types")
        query.append("transactionType", incomingFilters.category);
      if (incomingFilters.from)
        query.append(
          "startDate",
          incomingFilters.from.toISOString().slice(0, 19)
        );
      if (incomingFilters.to)
        query.append("endDate", incomingFilters.to.toISOString().slice(0, 19));
      if (incomingFilters.period) {
        const period = incomingFilters.period.toLowerCase();

        const { startDate, endDate } = formatPeriod(period);
        query.append("startDate", startDate);
        query.append("endDate", endDate);
      }

      if (cursorId) query.append("cursorId", cursorId);

      const res = await apiClient.get(
        `/transactions/${realAccount?.id}/search?${query.toString()}`
      );

      const data = res.data;

      setTransactions((prev) =>
        append ? [...prev, ...data.transactions] : data.transactions
      );
      setNextCursorId(data.nextCursorId);
      setHasMore(data.hasMore);
      setFilters(incomingFilters);
      setIsLoadingTx(false);
    } catch (err) {
      console.error("Error fetching transactions", err);
      setIsLoadingTx(false);
    }
  };

  const handleFilterApply = (filters: any) => {
    setFilters(filters);
    fetchTransactions(filters);
  };

  const handleViewChange = (nextView: string) => setView(nextView);

  const onCloseHandler = () => {
    setSelectedCrypto(null);
    // setConfirmed(false);
  };

  const renderView = () => {
    switch (view) {
      case "My Cashier":
        return (
          <CashierList
            handleViewChange={handleViewChange}
            setIconOrImage={setIconOrImage}
          />
        );
      case "Deposit":
        return (
          <DepositList
            handleViewChange={handleViewChange}
            setIconOrImage={setIconOrImage}
          />
        );
      case "USDT, BITCOIN, ETHEREUM":
        return (
          <CryptoView
            handleViewChange={handleViewChange}
            setIconOrImage={setIconOrImage}
            selectedCrypto={selectedCrypto}
            setSelectedCrypto={setSelectedCrypto}
            setCryptoData={setCryptoData}
          />
        );
      case selectedCrypto:
        return <CryptoPayView cryptoData={cryptoData} />;
      case "Bank Transfer":
        return <BankTransfer />;
      case "Withdrawals":
        return (
          <WithdrawalView
            handleViewChange={handleViewChange}
            setIconOrImage={setIconOrImage}
            setOpenOtp={setOpenOtp}
          />
        );
      case "Swap (Profit bal - Real bal)":
        return <SwapView />;
      case "Transaction History":
        return (
          <TxList
            handleViewChange={handleViewChange}
            transactions={transactions}
            fetchMore={() => fetchTransactions(filters, nextCursorId, true)}
            hasMore={hasMore}
            isLoadingTx={isLoadingTx}
          />
        );

      case "Filters":
        return (
          <TxFilters
            onApply={handleFilterApply}
            handleViewChange={handleViewChange}
            transactions={transactions}
          />
        );
      default:
        return null;
    }
  };

  return (
    <motion.div layout>
      <AnimatePresence>
        <ModalWrapper
          title={view}
          icon={iconOrImage}
          onClose={() => {
            onClose();
          }}
          onCloseHandler={onCloseHandler}
          handleViewChange={handleViewChange}
          setIconOrImage={setIconOrImage}
        >
          {renderView()}
        </ModalWrapper>
      </AnimatePresence>
      {openOtp && (
        <OtpModal
          title={view}
          icon={iconOrImage}
          onCloseModal={() => setOpenOtp(false)}
          setOpenSuccess={setOpenSuccess}
        />
      )}
      {openSuccess && <SuccessModal close={() => setOpenSuccess(false)} />}
    </motion.div>
  );
}
