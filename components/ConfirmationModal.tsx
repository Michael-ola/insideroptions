import React from "react";
import { X } from "lucide-react";
import { Icon } from "@iconify/react/dist/iconify.js";

interface ConfirmClearModalProps {
  title?: string;
  message?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmModal = ({
  title,
  message,
  onCancel,
  onConfirm,
}: ConfirmClearModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
      <div className="bg-[#0E1514] text-white rounded-xl border border-primary/20 w-full max-w-md py-8 relative shadow-xl flex flex-col gap-6">
        <div className="w-full px-8">
          <div className="flex justify-between items-center">
            <h2 className="w-full text-lg font-semibold text-center">{title}</h2>
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
            <Icon icon="gridicons:notice-outline" width="120" height="120" className="text-yellow-500" />
            <p className="px-8 text-center text-xl font-medium text-white whitespace-pre-line">
              {message}
            </p>
          </div>

          <div className="w-full flex flex-col-reverse md:flex-row items-center justify-between gap-3 pb-8">
            <button
              onClick={onCancel}
              className="w-full flex-1 md:border md:border-primary text-primary py-3 px-6 rounded-xl hover:bg-green-500/10 transition"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm();
                onCancel();
              }}
              className="w-full flex-1 bg-primary text-black font-semibold py-3 px-6 rounded-xl hover:bg-green-300 transition"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
