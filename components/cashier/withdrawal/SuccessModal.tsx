import { Check } from "lucide-react";
import React from "react";

const SuccessModal = ({ close }: { close: () => void }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-60">
      <div className="bg-black sm:bg-black/3 space-y-6 rounded-xl border border-primary/30 px-0 py-6 sm:px-6 sm:py-8 sm:max-w-none max-w-sm mx-auto shadow-xl text-white">
        <div className="px-8 pt-6 flex flex-col justify-center items-center">
          <div className="space-y-12 py-18 flex flex-col justify-center items-center">
            <div className="w-23 h-23 border-2 border-primary rounded-full flex items-center justify-center">
              <Check className="w-16 h-16 text-primary" />
            </div>
            <p className="text-gray-400 text-2xl sm:text-3xl">
              Bank Withdrawal Successful!
            </p>
          </div>
          <button
            onClick={() => close()}
            type="button"
            className="w-[50%] bg-primary px-12 py-3 text-black text-sm text-center rounded-xl"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
