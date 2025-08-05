import { ChevronLeft } from "lucide-react";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useDashboardContext } from "@/context/DashboardContext";

interface ModalWrapperProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
  handleViewChange?: (view: string) => void;
}

export default function InnerModalWrapper({
  title,
  onClose,
  children,
  handleViewChange,
}: ModalWrapperProps) {
  const { setSwitchAssetManagerModal } = useDashboardContext();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed backdrop-blur-sm side-nav-full-modal-offset inset-0 bg-black/20 z-50  h-screen cursor-default max-sm:left-0 max-sm:bg-[#000510] max-sm:h-[calc(100vh-57px)]"
    >
      <div className="w-full h-full py-4 relative text-white sm:border-r sm:border-primary/15 flex flex-col gap-2">
        <div className="bg-gradient-to-r from-[#00040d] to-[#13171f] sm:bg-none px-8 py-4 border-y border-y-[#79DA7E]/30 sm:border-0 flex items-center gap-8">
          <button
            onClick={() => {
              if (title === "Logging Downline Complains" && handleViewChange) {
                handleViewChange("Asset Manager");
              } else if (title === "Downline Tickets" && handleViewChange) {
                handleViewChange("Asset Manager");
              } else if (title === " " && handleViewChange) {
                handleViewChange("Asset Manager");
              } else {
                setSwitchAssetManagerModal(false);
              }
            }}
            className="text-white cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex-1 flex justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-xl sm:text-2xl capitalize font-medium">
                {title}
              </h2>
            </div>
            <button
              onClick={() => {
                onClose();
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
