import Image, { StaticImageData } from "next/image";
import React from "react";
import visa from "@/lib/assets/visa_icon.png";
import crypto from "@/lib/assets/crypto.png";
import bankTransfer from "@/lib/assets/bank_transfer.png";
import binance from "@/lib/assets/binance_icon.png";
import { ModalView } from "../cashierModal";


type DepositOption = {
  label: string;
  icon: StaticImageData;
  comingSoon?: boolean;
};

interface Props {
  handleViewChange: (view: ModalView) => void;
  setIconOrImage: React.Dispatch<
    React.SetStateAction<StaticImageData | string>
  >;
}

export const depositOptions: DepositOption[] = [
  {
    label: "USDT, BITCOIN, ETHEREUM",
    icon: crypto,
  },
  {
    label: "Bank Transfer",
    icon: bankTransfer,
  },
  {
    label: "Binance Pay",
    icon: binance,
    comingSoon: true,
  },
  {
    label: "Visa/Master Card",
    icon: visa,
    comingSoon: true,
  },
];

const DepositList = ({ handleViewChange, setIconOrImage }: Props) => {
  return (
    <>
      <div className="space-y-4 sm:space-y-2 px-6 overflow-y-auto custom-scrollbar">
        {depositOptions.map(({ label, icon, comingSoon }) => (
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
};

export default DepositList;
