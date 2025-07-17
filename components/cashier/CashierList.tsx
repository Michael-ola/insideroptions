import Image, { StaticImageData } from "next/image";
import React from "react";
import wallet from "@/lib/assets/wallet_icon.png";
import withdraw from "@/lib/assets/scroll.png";
import history from "@/lib/assets/tx_history.png";
import swap from "@/lib/assets/swap.png";
import { ModalView } from "./cashierModal";


export interface CashierList {
  label: string;
  icon: StaticImageData;
}

interface Props {
  handleViewChange: (view: ModalView) => void;
  setIconOrImage: React.Dispatch<
    React.SetStateAction<StaticImageData | string>
  >;
}

export const cashierOptions: CashierList[] = [
  { label: "Deposit", icon: wallet },
  { label: "Withdrawals", icon: withdraw },
  { label: "Swap (Profit bal - Real bal)", icon: swap },
  { label: "Transaction History", icon: history },
];

const CashierList = ({ handleViewChange, setIconOrImage }: Props) => {
  return (
    <div className="space-y-6">
      {cashierOptions.map(({ label, icon }) => (
        <div
          key={label}
          className="flex items-center gap-3 cursor-pointer text-gray-400 hover:text-green-400"
          onClick={() => {
            setIconOrImage(icon);
            handleViewChange(label as ModalView);
            return;
          }}
        >
          <Image src={icon} alt="label" />
          <span className="text-sm">{label}</span>
        </div>
      ))}
    </div>
  );
};

export default CashierList;
