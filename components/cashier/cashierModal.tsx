"use client";

import { useState } from "react";
import ModalWrapper from "../modalWrapper";
import { cashierOptions } from "./data/cashierOptions";
import Image, { StaticImageData } from "next/image";
import { depositOptions } from "./data/depositOption";
import { IconType } from "react-icons";
import { cryptoOptions } from "./data/cyptoOptions";
import { AlertCircle, Check, ChevronRight, Copy } from "lucide-react";
import { withdrawalOptions } from "./data/withdrawalOption";
import { cryptoData } from "./data/cryptoData";

type SelectedCrypto =
  | "USDT (ERC20)"
  | "BITCOIN (BTC)"
  | "USDT (TRC20)"
  | "ETHEREUM (ETH)";

type DepositOption =
  | "USDT, BITCOIN, ETHEREUM"
  | "Bank Transfer"
  | "Binance Pay"
  | "Visa/Master Card";

type ModalView =
  | "My Cashier"
  | "Deposit"
  | "Withdrawals"
  | "Swap"
  | "History"
  | DepositOption
  | SelectedCrypto;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CashierModal({ isOpen, onClose }: Props) {
  const [view, setView] = useState<ModalView>("My Cashier");
  const [iconOrImage, setIconOrImage] = useState<
    IconType | StaticImageData | string
  >("");
  const [selectedCrypto, setSelectedCrypto] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleViewChange = (nextView: ModalView) => setView(nextView);

  const onCloseHandler = () => {
    setSelectedCrypto(null);
    setConfirmed(false);
  };

  const handleConfirmedCrypto = () => {
    // Handle the confirmed crypto action here
    console.log("Confirmed Crypto:", selectedCrypto);

    handleViewChange(selectedCrypto as ModalView);
  };

  const renderMainView = () => (
    <div className="space-y-6">
      {cashierOptions.map(({ label, icon: Icon }) => (
        <div
          key={label}
          className="flex items-center gap-3 cursor-pointer text-gray-400 hover:text-green-400"
          onClick={() => {
            setIconOrImage(Icon);
            handleViewChange(label as ModalView);
            return;
          }}
        >
          <Icon className="text-lg" />
          <span className="text-sm">{label}</span>
        </div>
      ))}
    </div>
  );

  const renderDepositList = (
    title: string,
    options: {
      label: string;
      icon: string | StaticImageData;
      comingSoon?: boolean;
    }[]
  ) => (
    <>
      <div className="space-y-4">
        {options.map(({ label, icon, comingSoon }) => (
          <div
            key={label}
            className="border-[0.5px] sm:border-0 bg-[#0d111a] sm:bg-transparent sm:pl-0 pl-9 py-4 rounded-xl border-gray-400/20 flex items-center gap-3 cursor-pointer text-gray-400"
            onClick={() => {
              if (comingSoon) {
                return;
              }
              setIconOrImage(icon);
              handleViewChange(label as ModalView);
            }}
          >
            <Image src={icon} alt={label} className="w-6" priority />
            <span className="text-sm hover:scale-105 transition duration-500 hover:text-green-400 flex items-center gap-3">
              {label}{" "}
              {comingSoon && (
                <span className="text-[8px] bg-red-500 text-white px-2 py-[2px] rounded-lg">
                  COMING SOON
                </span>
              )}
            </span>
          </div>
        ))}
      </div>
    </>
  );

  const renderCryptoView = () => (
    <div className="space-y-16 sm:space-y-13 px-8 pt-6">
      <div className="space-y-6">
        {cryptoOptions.map(({ label, icon, speed }) => (
          <div
            key={label}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setSelectedCrypto(label)}
          >
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedCrypto === label
                  ? "border-[#74d67f]"
                  : "border-[#545c5c]"
              }`}
            >
              <div
                className={`w-[8px] h-[8px] rounded-full ${
                  selectedCrypto === label ? "bg-[#74d67f]" : "bg-[#545c5c]"
                }`}
              ></div>
            </div>

            <Image src={icon} alt={label} className="w-4" />
            <div className="flex items-center gap-4">
              <span className="text-xs">{label}</span>
              {speed && (
                <span className="ml-auto text-[5px] bg-green-800 text-gray-100 px-2 py-[2px] rounded-lg flex items-center">
                  {speed}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <hr className="border-gray-700 mb-4" />

      <div className="flex flex-col gap-8">
        <div className="flex items-start gap-3 text-xs sm:text-sm text-gray-400 mb-4">
          <AlertCircle className="w-24 text-red-400" />
          <p>
            Failure to send the correct token will result in loss of funds which{" "}
            <span className="font-semibold">InsiderOption LLC</span> is not
            liable for. The tokens we accept are mentioned in brackets beside
            the coins above.
          </p>
        </div>

        <hr className="border-gray-700 mb-4" />

        <div className="flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={() => setConfirmed(!confirmed)}
            className="mt-1 w-6 h-3 border rounded-xs appearance-none border-gray-400
            checked:border-green-400 
           checked:focus-ring-2   
                transition-colors duration-500 peer sr-only"
          />
          <div
            className={`
          w-5 h-5 rounded-sm border border-gray-400 
          peer-checked:border-green-500 p-[0.5px]
          flex items-center justify-center transition-colors peer
        `}
          >
            <Check
              className={`w-5 text-green-500 opacity-0  ${
                confirmed ? "opacity-100" : ""
              } transition-opacity duration-500`}
            />
          </div>
          <span className="text-gray-400">
            I, Prince Genesis, hereby confirm that I have read and understood
            Deposit & Withdrawal Terms for Cryptocurrencies
          </span>
        </div>
      </div>

      <button
        className={`w-full text-center py-3 rounded-xl text-[#545c5c]  font-medium text-sm transition-opacity flex items-center justify-center gap-3 ${
          !confirmed || !selectedCrypto
            ? "bg-[#171f24] cursor-not-allowed"
            : "bg-[#74d67f] text-black cursor-pointer"
        }`}
        disabled={!confirmed || !selectedCrypto}
        onClick={() => {
          if (confirmed && selectedCrypto) {
            handleConfirmedCrypto();
          }
        }}
      >
        Pay Now <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
  const renderCryptoPayment = () => (
    <div className="space-y- 16 sm:space-y-13 px-8 pt-6">
      <div className="space-y-6">
        <p className="text-xs text-gray-400">
          Great, you are almost there! To complete the transaction, please
          follow the steps below. Make sure to keep the address and QR code
          available at hand.
        </p>
        <hr className="border-gray-700" />
        <div className="flex items-start gap-3 text-xs text-gray-400 mb-4">
          <AlertCircle className="w-24 text-red-400" />
          <p>
            Please note, we only accept {cryptoData?.network} to the below
            address. Any tokens/coins sent other than {cryptoData?.network} will
            not be applied to your trading account.
          </p>
        </div>
      </div>

      <div className="space-y-8 text-gray-400">
        <div className="w-full space-y-6 text-center text-gray-400 bg-[#79DA7E]/3 p-6 rounded-xl border border-gray-400/70">
          <p className="w-full break-words text-center">
            {cryptoData?.address}
          </p>
          <div
            className="w-full flex items-center justify-center gap-2 text-[#79DA7E] font-semibold"
            onClick={() => {
              navigator.clipboard.writeText(cryptoData?.address || "");
            }}
          >
            <Copy className="text-2xl" /> <span>Copy address</span>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-gray-400 text-center">
          Or Scan QR Code
        </p>
        <div className="flex items-center justify-center p-4">
          <Image
            src={cryptoData?.qrCode}
            alt="QR Code"
            width={200}
            height={200}
            className="w-full h-auto"
          />
        </div>
        <p className="text-xs sm:text-sm text-center">
          {cryptoData?.instructions}
        </p>
      </div>
    </div>
  );

  const renderBankTrasfer = () => (
    <div className="space-y-13 px-8 pt-6">
      <div className="space-y-3">
        <div className="flex flex-col gap-2">
          <label htmlFor="first name" className="text-sm font-medium">
            First Name
          </label>
          <input
            type="text"
            disabled
            value={"Prince"}
            className="w-full bg-transparent border border-gray-700 px-4 py-3 outline-none rounded-xl text-sm text-gray-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="last name" className="text-sm font-medium">
            Surname
          </label>
          <input
            type="text"
            disabled
            value={"Genesis"}
            className="w-full bg-transparent border border-gray-700 px-4 py-3 outline-none rounded-xl text-sm text-gray-500"
          />
        </div>
        <p className="text-end text-gray-400 text-xs">
          Not correct? <span className="text-green-400">change name</span>
        </p>
        {/* {cryptoOptions.map(({ label, icon, speed }) => (
          <div
            key={label}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setSelectedCrypto(label)}
          >
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedCrypto === label
                  ? "border-green-500"
                  : "border-gray-500"
              }`}
            >
                <div className={`w-[8px] h-[8px] rounded-full bg-gray-400 ${selectedCrypto === label ? "bg-green-500" : ""}`}>

                </div>
            </div>

            <Image src={icon} alt={label} className="w-4" />
            <div className="flex items-center gap-4">
              <span className="text-xs">{label}</span>
              {speed && (
                <span className="ml-auto text-[5px] bg-green-800 text-gray-100 px-2 py-[2px] rounded-lg flex items-center">
                  {speed}
                </span>
              )}
            </div>
          </div>
        ))} */}
      </div>

      <hr className="border-gray-700 mb-4" />

      <div className="space-y-8">
        <div className="space-y-8 text-xs text-gray-400 mb-4">
          <div className="flex flex-col gap-2">
            <label>Enter Amount</label>
            <input
              type="text"
              name="amount"
              placeholder="0.00"
              className="w-full text-white bg-transparent border border-gray-700 px-4 py-3 outline-none rounded-xl text-sm focus:border-0 focus:ring-1 focus-within:ring-green-500"
            />
            <span className="text-[10px] text-start mt-2">
              Min amount: N50,000 | Max amount: N20,000,000
            </span>
          </div>
        </div>

        <label className="flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={() => setConfirmed(!confirmed)}
            className="mt-1 w-6 h-3 border rounded-xs appearance-none border-gray-400
            checked:border-green-400 
           checked:focus-ring-2   
                transition-colors duration-500 peer sr-only"
          />
          <div
            className={`
          w-5 h-5 rounded-sm border border-gray-400 
          peer-checked:border-green-500 p-[0.5px]
          flex items-center justify-center transition-colors peer
        `}
          >
            <Check
              className={`w-5 text-green-500 opacity-0  ${
                confirmed ? "opacity-100" : ""
              } transition-opacity duration-500`}
            />
          </div>
          <span className="text-gray-400">
            I Prince John agree to 
            <a href="/company/terms-and-condition" className="text-green-400">
              Terms & Conditions
            </a>
            , Refund policy, Payment info policy.
          </span>
        </label>
      </div>

      <button
        className={`w-full text-center py-3 rounded-xl bg-[#79DA7E] text-white font-medium text-sm transition-opacity flex items-center justify-center gap-3 ${
          !confirmed || !selectedCrypto
            ? "opacity-30 cursor-not-allowed"
            : "hover:opacity-90 cursor-pointer"
        }`}
        disabled={!confirmed || !selectedCrypto}
      >
        Pay Now <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );

  const renderView = () => {
    switch (view) {
      case "My Cashier":
        return renderMainView();
      case "Deposit":
        return renderDepositList(view, depositOptions);
      case "USDT, BITCOIN, ETHEREUM":
        return renderCryptoView();
      case selectedCrypto:
        return renderCryptoPayment();
      case "Bank Transfer":
        return renderBankTrasfer();
      case "Withdrawals":
        return renderDepositList(view, withdrawalOptions);
      default:
        return null;
    }
  };

  return (
    <ModalWrapper
      title={view}
      icon={iconOrImage}
      onClose={onClose}
      onCloseHandler={onCloseHandler}
      handleViewChange={handleViewChange}
    >
      {renderView()}
    </ModalWrapper>
  );
}
