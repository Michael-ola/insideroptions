"use client";

import React, { useState } from "react";
import { AlertCircle, Check, ChevronRight } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import usdt from "@/lib/assets/usdt.png";
import profile from "@/data/trader/profile.json";
import btc from "@/lib/assets/btc.png";
import trc20 from "@/lib/assets/trc20.png";
import eth from "@/lib/assets/eth.png";
import { RiLoader4Line } from "@remixicon/react";
import { CryptoData, ModalView } from "../cashierModal";
import { apiClient } from "@/lib/api-client";
import { getErrorMessage } from "@/lib/authUtils";
import { toast } from "react-toastify";

type CryptoList = {
  label: string;
  icon: StaticImageData;
  speed?: "FASTEST" | "FAST";
};

interface Props {
  handleViewChange: (view: ModalView) => void;
  setSelectedCrypto: React.Dispatch<React.SetStateAction<string | null>>;
  selectedCrypto?: string | null;
  setIconOrImage: React.Dispatch<
    React.SetStateAction<StaticImageData | string>
  >;
  setCryptoData: (value: CryptoData) => void;
}

export const cryptoOptions: CryptoList[] = [
  {
    label: "USDT (ERC20)",
    icon: usdt,
    speed: "FASTEST",
  },
  {
    label: "BITCOIN (BTC)",
    icon: btc,
  },
  {
    label: "USDT (TRC20)",
    icon: trc20,
    speed: "FAST",
  },
  {
    label: "ETHEREUM (ETH)",
    icon: eth,
  },
];

const CryptoView = ({
  handleViewChange,
  setIconOrImage,
  selectedCrypto,
  setSelectedCrypto,
  setCryptoData,
}: Props) => {
  const [confirmed, setConfirmed] = useState<boolean>(false);

  const [isConfirming, setIsConfirming] = useState(false);

  const cryptoConfig: Record<string, { type: string; onToken: string, label:string }> = {
    "USDT (ERC20)": { type: "teth4", onToken: "ofcusdt", label: "ERC20" },
    "USDT (TRC20)": { type: "ttrx4", onToken: "ofcusdt", label: "TRC20" },
    "BITCOIN (BTC)": { type: "tbtc4", onToken: "ofcbtc", label: "BTC" },
    "ETHEREUM (ETH)": { type: "teth4", onToken: "ofceth", label: "ETH" },
  };

  const generatePayload = () => {
    if (typeof selectedCrypto !== "string") {
      throw new Error("Unsupported crypto selection");
    }
    const config = cryptoConfig[selectedCrypto];

    if (!config) {
      throw new Error("Unsupported crypto selection");
    }

    return {
      type: config.type,
      onToken: config.onToken,
      label: config.label,
      gasPrice: "",
      eip1559: {
        maxFeePerGas: 0,
        maxPriorityFeePerGas: 0,
      },
      accountId: profile.id,
    };
  };

  const handleConfirmedCrypto = async () => {
    try {
      setIsConfirming(true);
      const payload = generatePayload();
      const url = `deposit/get-address`;
      const res = await apiClient.post(url, payload);
      setCryptoData(res.data);
      setIsConfirming(false);
      handleViewChange(selectedCrypto as ModalView);
    } catch (error) {
      const err = getErrorMessage(error);
      toast.error(err);
      console.error("Error confirming crypto:", error);
      setIsConfirming(false);
    }
  };

  return (
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

      <hr className="border-gray-700/50" />

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

        <hr className="border-gray-700/50" />

        <div className="flex items-start gap-3 text-sm">
          <div
            onClick={() => setConfirmed(!confirmed)}
            className={`
                    w-5 h-5 rounded-sm border  cursor-pointer flex items-center justify-center transition-colors 
                    ${
                      confirmed
                        ? "border-green-500 p-[0.5px]"
                        : "border-gray-400"
                    }
                     `}
          >
            <Check
              className={`w-5 text-green-500 opacity-0  ${
                confirmed ? "opacity-100" : ""
              } transition-opacity duration-500`}
            />
          </div>
          <span className="text-gray-400">
            I, {profile.firstName} {profile.lastName}, hereby confirm that I
            have read and understood Deposit & Withdrawal Terms for
            Cryptocurrencies
          </span>
        </div>
      </div>

      <button
        type="button"
        className={`w-full text-center py-3 rounded-xl text-[#545c5c]  font-medium text-sm transition-opacity flex items-center justify-center gap-3 ${
          !confirmed || !selectedCrypto
            ? "bg-[#171f24] cursor-not-allowed"
            : isConfirming
            ? "opacity-50 cursor-not-allowed"
            : "bg-[#74d67f] text-black cursor-pointer"
        }`}
        disabled={!confirmed || !selectedCrypto || isConfirming}
        onClick={() => {
          if (confirmed && selectedCrypto) {
            setIconOrImage(
              cryptoOptions.find((option) => option.label === selectedCrypto)
                ?.icon || ""
            );
            handleConfirmedCrypto();
          }
        }}
      >
        {isConfirming && <RiLoader4Line className="size-5 mr-2 animate-spin" />}{" "}
        Pay Now {!isConfirming && <ChevronRight className="w-4 h-4" />}
      </button>
    </div>
  );
};

export default CryptoView;
