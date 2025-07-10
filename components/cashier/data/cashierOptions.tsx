import { History, Scroll, Wallet } from "lucide-react";
import { IconType } from "react-icons";
import { FaExchangeAlt } from "react-icons/fa";

export interface CashierOption {
  label: string;
  icon: IconType;
}

export const cashierOptions: CashierOption[] = [
  { label: "Deposit", icon: Wallet },
  { label: "Withdrawals", icon: Scroll },
  { label: "Swap (Profit bal - Real bal)", icon: FaExchangeAlt },
  { label: "Transaction History", icon: History },
];
