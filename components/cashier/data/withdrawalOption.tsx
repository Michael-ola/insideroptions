import crypto from "@/lib/assets/usdt.png";
import bankTransfer from "@/lib/assets/bank_transfer.png";
import { StaticImageData } from "next/image";

type WithdrawalOption = {
  label: string;
  icon: StaticImageData;
  comingSoon?: boolean;
};

export const withdrawalOptions: WithdrawalOption[] = [
 {
    label: 'USDT / Crypto Wallet',
    icon: crypto,
  },
  {
    label: 'Bank Transfer',
    icon: bankTransfer,
    comingSoon: true,
  },
];
