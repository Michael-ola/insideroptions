import { ChevronLeft } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { ReactNode } from "react";
import { IconType } from "react-icons";
import { depositOptions } from "./cashier/data/depositOption";
import { cryptoOptions } from "./cashier/data/cyptoOptions";

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

interface ModalWrapperProps {
  title: ModalView;
  onClose: () => void;
  children: ReactNode;
  handleViewChange: (view: ModalView) => void;
  icon?: IconType | StaticImageData | string;
  onCloseHandler?: () => void;
}

export default function ModalWrapper({
  title,
  onClose,
  children,
  icon: Icon,
  handleViewChange,
  onCloseHandler,
}: ModalWrapperProps) {
  let iconElement: ReactNode = null;
  if (title !== "My Cashier" && Icon) {
    if (
      typeof Icon === "function" ||
      (typeof Icon === "object" && "$$typeof" in Icon)
    ) {
      const IconComponent = Icon as IconType;
      iconElement = <IconComponent className="text-sm" />;
    } else if (
      typeof Icon === "string" ||
      (typeof Icon === "object" && "src" in Icon)
    ) {
      iconElement = <Image src={Icon} alt="icon" className="w-6 h-6" />;
    }
  }

  return (
    <div className="fixed min-w-[25%] lg:w-[25%] inset-0 bg-transparent backdrop-blur-xs bg-opacity-60 z-50 flex items-center justify-center">
      <div className="w-full h-full sm:h-[80%] bg-[#00040d] sm:bg-transparent rounded-lg shadow-lg p-6 relative text-white border-r border-green-300/30 space-y-6 overflow-y-auto">
        <div className="flex justify-between items-center gap-3">
          {title !== "My Cashier" && (
            <button
              onClick={() => {
                const depositOptionLabels = depositOptions.map(
                  (option) => option.label
                );
                if (depositOptionLabels.includes(title)) {
                  handleViewChange("Deposit");
                  if (onCloseHandler) {
                    onCloseHandler();
                  }
                } else if (cryptoOptions.map((option) => option.label).includes(title)) {
                     handleViewChange(title as SelectedCrypto);
                  if (onCloseHandler) {
                    onCloseHandler();
                  }
                }
                else {
                  handleViewChange("My Cashier");
                  if (onCloseHandler) {
                    onCloseHandler();
                  }
                }
              }}
              className="text-white cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          <div className="flex items-center gap-3">
            {iconElement}
            <h2 className="text-xl capitalize font-medium">{title}</h2>
          </div>
          <button
            onClick={() => {
              onClose();
              if (onCloseHandler) {
                onCloseHandler();
              }
              handleViewChange("My Cashier");
            }}
            className="text-white text-2xl cursor-pointer"
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
