"use client";

import React, { useState } from "react";
import { Check, X } from "lucide-react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { AnimatePresence, motion } from "framer-motion";
import { useDashboardContext } from "@/context/DashboardContext";

interface ConfirmClearModalProps {
  title?: string;
  message?: string;
  canCheck?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmModal = ({
  title,
  message,
  canCheck,
  onCancel,
  onConfirm,
}: ConfirmClearModalProps) => {
  const { traderData } = useDashboardContext();
  const [agreed, setAgreed] = useState<boolean>(false);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence>
        <div className="w-full h-full fixed inset-0 bg-black/60 backdrop:blur-xs z-50 flex items-center justify-center px-4">
          <div className="bg-[#0E1514] text-white rounded-xl border border-primary/20 w-full max-w-sm sm:max-w-md py-8 relative shadow-xl flex flex-col gap-6 overflow-y-auto custom-scrollbar">
            <div className="w-full px-8">
              <div className="flex justify-between items-center">
                <h2 className="w-full text-base sm:text-xl font-semibold text-center">
                  {title}
                </h2>
                <button
                  onClick={onCancel}
                  className="text-white hover:text-gray-400"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="px-8 pt-6 space-y-8">
              <div className="flex flex-col items-center justify-center gap-5 bg-[#1d2120] py-18 border border-white/5 rounded-xl">
                <Icon
                  icon="gridicons:notice-outline"
                  width="120"
                  height="120"
                  className="text-yellow-500"
                />
                <p className="px-8 text-center text-sm md:text-lg font-medium text-white whitespace-pre-line">
                  {message}
                </p>
                {canCheck && (
                  <label className="px-8 text-left flex items-start gap-3 text-xs sm:text-sm text-white/60">
                    <div
                      onClick={() => setAgreed(!agreed)}
                      className={`
                    w-5 h-5 rounded-sm border  cursor-pointer flex items-center justify-center transition-colors 
                    ${agreed ? "border-green-500 p-[0.5px]" : "border-gray-400"}
                     `}
                    >
                      <Check
                        className={`w-5 text-green-500 opacity-0  ${
                          agreed ? "opacity-100" : ""
                        } transition-opacity duration-500`}
                      />
                    </div>
                    <span>
                      I, {traderData?.firstName} {traderData?.lastName} agree to
                      the{" "}
                      <span className="font-semibold">
                        Auto trade terms and conditions
                      </span>
                      , and also agree that past performance does not guarantee
                      future performance.
                    </span>
                  </label>
                )}
              </div>

              <div className="w-full flex flex-col-reverse md:flex-row items-center justify-between gap-3 pb-8">
                <button
                  onClick={onCancel}
                  className="w-full flex-1 md:border md:border-primary text-primary py-3 px-6 rounded-xl hover:bg-green-500/10 transition"
                >
                  Cancel
                </button>
                <button
                  disabled={canCheck ? !agreed : undefined}
                  onClick={() => {
                    onConfirm();
                    onCancel();
                  }}
                  className="w-full flex-1 bg-primary text-black font-semibold py-3 px-6 rounded-xl hover:bg-gradient-to-tr  from-primary to-[#b4e6b8] transition"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </AnimatePresence>
    </motion.div>
  );
};

export default ConfirmModal;
