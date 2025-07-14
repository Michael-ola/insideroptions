"use client";

import { useState } from "react";
import ModalWrapper from "../modalWrapper";
import { StaticImageData } from "next/image";
import CashierList from "./deposit/CashierList";
import DepositList from "./deposit/DepositList";
import CryptoView from "./deposit/CryptoView";
import BankTransfer from "./deposit/BankTransfer";
import CryptoPayView from "./deposit/cryptoPayView";
import WithdrawalView from "./withdrawal/WithdrawalView";
import OtpModal from "./withdrawal/OtpModal";
import SuccessModal from "./withdrawal/SuccessModal";

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
  | "History"
  | DepositOption
  | SelectedCrypto;

export type CryptoData = {
  id: string;
  coin: string;
  depositAddress: string;
  redeemScript: string;
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CashierModal({ isOpen, onClose }: Props) {
  const [view, setView] = useState<ModalView>("My Cashier");
  const [iconOrImage, setIconOrImage] = useState<StaticImageData | string>("");
  const [selectedCrypto, setSelectedCrypto] = useState<string | null>(null);
  const [openOtp, setOpenOtp] = useState<boolean>(false);
  const [openSuccess, setOpenSuccess] = useState<boolean>(false);
  const [cryptoData, setCryptoData] = useState<CryptoData | null>(null);

  if (!isOpen) return null;

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
      default:
        return null;
    }
  };

  return (
    <div>
      <ModalWrapper
        title={view}
        icon={iconOrImage}
        onClose={onClose}
        onCloseHandler={onCloseHandler}
        handleViewChange={handleViewChange}
        setIconOrImage={setIconOrImage}
      >
        {renderView()}
      </ModalWrapper>

      {openOtp && (
        <OtpModal
          title={view}
          icon={iconOrImage}
          onCloseModal={() => setOpenOtp(false)}
          setOpenSuccess={setOpenSuccess}
        />
      )}
      {openSuccess && <SuccessModal close={() => setOpenSuccess(false)} />}
    </div>
  );
}
