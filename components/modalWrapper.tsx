import { ChevronLeft } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cryptoOptions } from "./cashier/deposit/CryptoView";
import { depositOptions } from "./cashier/deposit/DepositList";
import { cashierOptions } from "./cashier/CashierList";
import { navItems } from "./dashboard/sideNav";
import { helpOptions } from "./help/HelpList";

type AutoTrade = "Current Investment" | "Trading Plan" | "Asset List" | "History";

const autoTrade: AutoTrade[] = [
  "Current Investment",
  "Trading Plan",
  "Asset List",
  "History",
];

interface ModalWrapperProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
  handleViewChange: (view: string) => void;
  setIconOrImage: React.Dispatch<
    React.SetStateAction<StaticImageData | string>
  >;
  icon?: StaticImageData | string;
  onCloseHandler?: () => void;
  handleBackNavigationForPartner?: () => void;
  canBack?: boolean;
}

export default function ModalWrapper({
  title,
  onClose,
  children,
  icon,
  handleViewChange,
  setIconOrImage,
  onCloseHandler,
  handleBackNavigationForPartner,
  canBack,
}: ModalWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed side-nav-modal-offset inset-0 bg-black/20 z-50 w-screen h-screen cursor-default max-sm:left-0 max-sm:bg-[#000510] max-sm:h-[calc(100vh-57px)]"
    >
      <div className="w-full sm:w-[25%] h-full rounded-lg backdrop-blur-sm py-4 relative text-white sm:border-r sm:border-primary/15 flex flex-col gap-2">
        <div className="bg-gradient-to-r from-[#00040d] to-[#13171f] sm:bg-none px-8 py-4 border-y border-y-[#79DA7E]/30 sm:border-0 flex items-center gap-8">
          {title !== "My Cashier" &&
            !autoTrade.some((item) => item === title) &&
            !navItems.some((item) => item.label === title) && (
              <button
                onClick={() => {
                  const isDepositLabel = depositOptions.some(
                    (option) => option.label === title
                  );
                  const isCryptoLabel = cryptoOptions.some(
                    (option) => option.label === title
                  );
                  const ishelpLabel = helpOptions.some(
                    (option) => option.label === title
                  );

                  if (isDepositLabel) {
                    setIconOrImage(
                      cashierOptions.find(
                        (option) => option.label === "Deposit"
                      )?.icon || ""
                    );
                    handleViewChange("Deposit");
                  } else if (isCryptoLabel) {
                    setIconOrImage(
                      depositOptions.find(
                        (option) => option.label === "USDT, BITCOIN, ETHEREUM"
                      )?.icon || ""
                    );
                    handleViewChange("USDT, BITCOIN, ETHEREUM");
                  } else if (ishelpLabel) {
                    setIconOrImage("");
                    handleViewChange("Help");
                  } else {
                    handleViewChange("My Cashier");
                  }

                  onCloseHandler?.();
                }}
                className="text-white cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
          {canBack && (
            <button
              onClick={handleBackNavigationForPartner}
              className="text-white cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          <div className="flex-1 flex justify-between">
            <div className="flex items-center gap-3">
              {title !== "My Cashier" &&
                !autoTrade.some((item) => item === title) &&
                !navItems.some((item) => item.label === title) && (
                  <Image src={icon ?? ""} alt="icon" className="w-7 h-auto" />
                )}
              <h2 className="text-xl sm:text-2xl capitalize font-medium">
                {title}
              </h2>
            </div>
            <button
              onClick={() => {
                onClose();
                if (onCloseHandler) {
                  onCloseHandler();
                }
              }}
              className="text-white text-2xl cursor-pointer"
            >
              &times;
            </button>
          </div>
        </div>
        {children}
      </div>
    </motion.div>
  );
}
