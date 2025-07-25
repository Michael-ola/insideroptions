"use client";

import { useState } from "react";
import ModalWrapper from "../modalWrapper";
import { AnimatePresence, motion } from "framer-motion";
import { StaticImageData } from "next/image";
import HelpList from "./HelpList";
import Support from "./Support";
import Faq from "./Faq";
import Suggestion from "./Suggestion";

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

export default function HelpModal({ onClose }: { onClose: () => void }) {
  const [view, setView] = useState<string>("Help");
  const [iconOrImage, setIconOrImage] = useState<StaticImageData | string>("");

  const handleViewChange = (nextView: string) => setView(nextView);

  const renderView = () => {
    switch (view) {
      case "Help":
        return (
          <HelpList
            handleViewChange={handleViewChange}
            setIconOrImage={setIconOrImage}
          />
        );
      case "Support":
        return <Support />;
      case "FAQ":
        return <Faq />;
      case "Suggestions":
        return <Suggestion />;
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
          //   onCloseHandler={onCloseHandler}
          handleViewChange={handleViewChange}
          setIconOrImage={setIconOrImage}
        >
          {renderView()}
        </ModalWrapper>
      </AnimatePresence>
    </motion.div>
  );
}
