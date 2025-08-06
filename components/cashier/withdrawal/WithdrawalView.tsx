"use client";

import { AlertCircle, ChevronRight, ChevronDown, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import bank from "@/lib/assets/bank_transfer.png";
import crypto from "@/lib/assets/crypto.png";
import Image, { StaticImageData } from "next/image";
import { IoSwapHorizontal } from "react-icons/io5";
import { cashierOptions } from "../CashierList";
import { ModalView } from "../cashierModal";
import { cryptoOptions } from "../deposit/CryptoView";
import { useDashboardContext } from "@/context/DashboardContext";
// import { RiLoader4Line } from "@remixicon/react";

type Props = {
  handleViewChange: (view: ModalView) => void;
  setIconOrImage: React.Dispatch<
    React.SetStateAction<StaticImageData | string>
  >;
  setOpenOtp: (value: boolean) => void;
};

const WithdrawalView = ({
  handleViewChange,
  setIconOrImage,
  setOpenOtp,
}: Props) => {
    const dropdownRef = useRef(null);
  const { traderData } = useDashboardContext();
  const [agreed, setAgreed] = useState<boolean>(false);

  const [amount, setAmount] = useState<string | number>("");
  const [method, setMethod] = useState<"Bank Transfer" | "Crypto">(
    "Bank Transfer"
  );
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [selectedCrypto, setSelectedCrypto] = useState<string>("");
  const [accountOrAddress, setAccountOrAddress] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const banks = [
    "Access Bank",
    "GTBank",
    "First Bank",
    "Zenith Bank",
    "UBA",
    "Fidelity Bank",
    "FCMB",
    "Union Bank",
    "Sterling Bank",
    "Wema Bank",
    "Polaris Bank",
    "Keystone Bank",
  ];

  const realAccount = traderData?.accounts.find(
    (account) => account.accountType === "INDIVIDUAL"
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as any).contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="w-full h-full space-y-6 text-white p-4 overflow-y-auto custom-scrollbar">
      {realAccount && realAccount?.accountBalance < 1 && (
        <div className="bg-[#79DA7E]/3 p-6 rounded-xl border border-white/3">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-8 h-8 text-gray-400" />
            <div className="space-y-[10px]">
              <p className="text-sm text-gray-400">
                You have insufficient funds to make a withdrawal from this
                account
              </p>
              <button
                onClick={() => {
                  setIconOrImage(
                    cashierOptions.find((opt) => opt.label === "Deposit")
                      ?.icon || ""
                  );
                  handleViewChange("Deposit");
                }}
                className="text-[#79DA7E] text-sm font-semibold"
              >
                Make deposit <ChevronRight className="inline w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <div className="w-full flex flex-col items-center justify-center bg-[#070c14] sm:bg-white/3 px-6 py-4 rounded-xl border border-[#79DA7E]/25">
          <p className="text-base font-semibold">
            ${realAccount?.profitBalance.toFixed(2)}
          </p>
          <p className="text-xs text-white/80">Profit Balance</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setIconOrImage(
              cashierOptions.find(
                (option) => option.label === "Swap (Profit bal - Real bal)"
              )?.icon || ""
            );
            handleViewChange("Swap (Profit bal - Real bal)");
            return;
          }}
          className="bg-[#79DA7E] text-black flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold hover:bg-gradient-to-tr  from-primary to-[#b4e6b8] transition"
        >
          SWAP
          <IoSwapHorizontal className="w-3 h-3" />
        </button>
      </div>

      <div className="relative">
        <button
          onClick={() => setShowDropdown((prev) => !prev)}
          className="w-full bg-[#B3B3B3]/3 p-3 rounded-tl-xl rounded-tr-xl border border-white/10 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            {method === "Bank Transfer" ? (
              <Image src={bank} alt="Bank Transfer" className="w-5 h-5" />
            ) : (
              <Image src={crypto} alt="Crypto" className="w-5 h-5" />
            )}
            <span className="text-sm">{method}</span>
          </div>
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </button>

        {showDropdown && (
          <div className="absolute w-full bg-black border-x border-b border-x-white/10 border-b-white/10 rounded-bl-xl rounded-br-xl z-10 overflow-hidden">
            {["Bank Transfer", "Crypto"].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setMethod(item as "Bank Transfer" | "Crypto");
                  setShowDropdown(false);
                }}
                className="w-full px-4 py-2 text-left hover:bg-[#79DA7E] text-sm"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-white/70">Enter Amount</label>
        <div className="relative w-full">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xl pointer-events-none">
            {method === "Bank Transfer" ? "₦" : "$"}
          </span>
          <input
            type="text"
            onChange={(e) => {
              const val = e.target.value;
              if (val === "" || /^\d*\.?\d{0,2}$/.test(val)) setAmount(val);
            }}
            value={amount}
            className="w-full appearance-none bg-transparent font-bold text-white border border-white/20 pr-4 py-4 pl-10 rounded-xl placeholder:text-gray-400 placeholder:font-bold placeholder:text-xl text-xl outline-none focus:border-0 focus:ring-1 focus-within:ring-primary"
            placeholder="0.00"
          />
        </div>
      </div>

      {method === "Bank Transfer" ? (
        <div className="relative text-sm text-white" ref={dropdownRef}>
          <button
            type="button"
            className="w-full rounded-tl-xl rounded-tr-xl border border-white/10 px-4 py-3 flex justify-between items-center bg-transparent text-left"
            onClick={() => setIsOpen(!isOpen)}
          >
            {selectedBank || "Select bank"}
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>

          {isOpen && (
            <ul className="absolute z-10 w-full bg-black/80 border border-white/10 rounded-bl-xl rounded-br-xl max-h-60 overflow-auto">
              {banks.map((bank) => (
                <li
                  key={bank}
                  onClick={() => {
                    setSelectedBank(bank);
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-[#79DA7E] cursor-pointer text-sm"
                >
                  {bank}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <div className="relative text-sm text-white">
          <button
            type="button"
            className="w-full rounded-tl-xl rounded-tr-xl border border-white/10 px-4 py-3 flex justify-between items-center bg-transparent text-left"
            onClick={() => setIsOpen(!isOpen)}
          >
            {selectedCrypto || "Select Crypto"}
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>

          {isOpen && (
            <ul className="absolute z-10 w-full bg-black/80 border border-white/10 rounded-bl-xl rounded-br-xl max-h-60 overflow-auto">
              {cryptoOptions.map(({ label }) => (
                <li
                  key={label}
                  onClick={() => {
                    setSelectedCrypto(label);
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-[#79DA7E] cursor-pointer text-sm"
                >
                  {label}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="flex flex-col gap-1">
        <label className="text-sm text-white/70">
          {method === "Bank Transfer"
            ? "Bank Account Number"
            : `${selectedCrypto} Address`}
        </label>
        <input
          type="text"
          className="w-full bg-transparent border border-white/20 px-4 py-3 rounded-xl placeholder:text-white/40 text-sm outline-none focus:border-0 focus:ring-1 focus-within:ring-primary"
          onChange={(e) => setAccountOrAddress(e.target.value)}
          value={accountOrAddress}
          placeholder={
            method === "Bank Transfer"
              ? "Bank Account Number"
              : `${selectedCrypto} Address`
          }
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-white/60">
        <div
          onClick={() => setAgreed(!agreed)}
          className={`
                    w-5 h-5 rounded-sm border  cursor-pointer flex items-center justify-center transition-colors 
                    ${agreed ? "border-green-500 p-[0.5px]" : "border-gray-400"}
                     `}
        >
          <Check
            className={`w-5 text-green-500 opacity-0  ${
              agreed ? "opacity-100" : ""
            } transition-opacity duration-500`}
          />
        </div>
        <span>
          I, {traderData?.firstName} {traderData?.lastName} agree that the above
          provided{" "}
          {method === "Bank Transfer" ? "Bank account" : "Bitcoin address"} is
          correct, and <span className="font-semibold">InsiderOption LLC</span>{" "}
          will not be liable for transfer to incorrect address.
        </span>
      </label>

      <button
        disabled={!agreed}
        onClick={() => setOpenOtp(true)}
        className={`w-full text-center py-3 rounded-xl text-[#545c5c]  font-medium text-sm transition-opacity flex items-center justify-center gap-3 ${
          !agreed
            ? "bg-[#171f24] cursor-not-allowed"
            : // : isConfirming
              // ? "opacity-50 cursor-not-allowed"
              "bg-[#74d67f] text-black cursor-pointer"
        }`}
      >
        {/* {isConfirming && <RiLoader4Line className="size-5 mr-2 animate-spin" />}{" "} */}
        Continue <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default WithdrawalView;
