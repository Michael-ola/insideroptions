import { ChevronLeft } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { ReactNode } from "react";
import { cryptoOptions } from "./cashier/deposit/CryptoView";
import { depositOptions } from "./cashier/deposit/DepositList";
import { cashierOptions } from "./cashier/deposit/CashierList";
import { ModalView } from "./cashier/cashierModal";


interface ModalWrapperProps {
  title: ModalView;
  onClose: () => void;
  children: ReactNode;
  handleViewChange: (view: ModalView) => void;
  setIconOrImage: React.Dispatch<
    React.SetStateAction<StaticImageData | string>
  >;
  icon?: StaticImageData | string;
  onCloseHandler?: () => void;
}

export default function ModalWrapper({
  title,
  onClose,
  children,
  icon,
  handleViewChange,
  setIconOrImage,
  onCloseHandler,
}: ModalWrapperProps) {
  return (
    <div className="fixed min-w-[25%] md:w-[30%] inset-0 bg-transparent backdrop-blur-xs bg-opacity-60 z-50 flex items-center justify-center">
      <div className="w-full h-full sm:h-[80%] bg-[#00040d] sm:bg-transparent rounded-lg shadow-lg p-6 relative text-white border-r border-green-300/30 space-y-6 overflow-y-auto">
        <div className="bg-gradient-to-r from-[#00040d] to-[#13171f] sm:bg-none p-4 border-y border-y-[#79DA7E]/30 sm:border-0 flex justify-between items-center gap-3">
          {title !== "My Cashier" && (
            <button
              onClick={() => {
                const depositOptionLabels = depositOptions.map(
                  (option) => option.label
                );
                if (depositOptionLabels.includes(title)) {
                  setIconOrImage(
                    cashierOptions.find((option) => option.label === "Deposit")
                      ?.icon || ""
                  );
                  handleViewChange("Deposit");
                  if (onCloseHandler) {
                    onCloseHandler();
                  }
                } else if (
                  cryptoOptions.map((option) => option.label).includes(title)
                ) {
                  setIconOrImage(
                    depositOptions.find(
                      (option) => option.label === "USDT, BITCOIN, ETHEREUM"
                    )?.icon || ""
                  );
                  handleViewChange("USDT, BITCOIN, ETHEREUM");
                  if (onCloseHandler) {
                    onCloseHandler();
                  }
                } else {
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
            {title !== "My Cashier" && (
              <Image src={icon ?? ""} alt="icon" className="w-6 h-auto" />
            )}
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
