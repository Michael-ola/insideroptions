import visa from "@/lib/assets/visa_icon.png"
import crypto from "@/lib/assets/crypto.png"
import bankTransfer from "@/lib/assets/bank_transfer.png"
import binance from "@/lib/assets/binance_icon.png"
import { StaticImageData } from "next/image";

type DepositOption = {
  label: string;
  icon: StaticImageData;
  comingSoon?: boolean;
};

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
