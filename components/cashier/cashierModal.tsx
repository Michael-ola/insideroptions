"use client";

import { useEffect, useState } from "react";
import ModalWrapper from "../modalWrapper";
import { AnimatePresence, motion } from "framer-motion";
import { StaticImageData } from "next/image";
import CashierList from "./CashierList";
import DepositList from "./deposit/DepositList";
import profile from "@/data/trader/profile.json";
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
import { useDashboardContext } from "@/context/DashboardContext";

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
  id: string;
  type: string;
  pair: string;
  amount: string;
  status: string;
  date: string;
  time: string;
};

export type CryptoData = {
  id: string;
  coin: string;
  depositAddress: string;
  redeemScript: string;
};

export default function CashierModal() {
  const { openCashierModal, setOpenCashierModal } = useDashboardContext();
  const [view, setView] = useState<ModalView>("My Cashier");
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

  useEffect(() => {
    if (view === "Transaction History" && transactions.length === 0) {
      fetchTransactions({}, null, false);
    }
  }, [view]);

  //Transaction functions
  const fetchTransactions = async (
    incomingFilters = filters,
    cursorId: string | null = null,
    append = false
  ) => {
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
      if (cursorId) query.append("cursorId", cursorId);

      const res = await apiClient.get(
        `/transactions/${profile.id}/search?${query.toString()}`
      );

      const data = res.data;

      setTransactions((prev) =>
        append ? [...prev, ...data.transactions] : data.transactions
      );
      setNextCursorId(data.nextCursorId);
      setHasMore(data.hasMore);
      setFilters(incomingFilters);
    } catch (err) {
      console.error("Error fetching transactions", err);
    }
  };

  const handleFilterApply = (filters: any) => {
    setFilters(filters);
    fetchTransactions(filters);
  };

  if (!openCashierModal) return null;

  const handleViewChange = (nextView: ModalView) => setView(nextView);

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
        return (
          // setView("Swap");
          <SwapView />
        );
      case "Transaction History":
        return (
          <TxList
            handleViewChange={handleViewChange}
            transactions={transactions}
            fetchMore={() => fetchTransactions(filters, nextCursorId, true)}
            hasMore={hasMore}
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
          onClose={() => setOpenCashierModal(false)}
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
