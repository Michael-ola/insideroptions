import { AlertCircle, Copy } from "lucide-react";
import Image from "next/image";
import React from "react";
import { cryptoData } from "../../data/cashier/cryptoData";

const CryptoPayView = () => {
  return (
    <div className="space-y- 16 sm:space-y-13 px-8 pt-6">
      <div className="space-y-6">
        <p className="text-xs text-gray-400">
          Great, you are almost there! To complete the transaction, please
          follow the steps below. Make sure to keep the address and QR code
          available at hand.
        </p>
        <hr className="border-gray-700/50" />
        <div className="flex items-start gap-3 text-xs text-gray-400 mb-4">
          <AlertCircle className="w-24 text-red-400" />
          <p>
            Please note, we only accept {cryptoData?.network} to the below
            address. Any tokens/coins sent other than {cryptoData?.network} will
            not be applied to your trading account.
          </p>
        </div>
      </div>

      <div className="space-y-8 text-gray-400">
        <div className="w-full space-y-6 text-center text-gray-400 bg-[#79DA7E]/3 p-6 rounded-xl border border-gray-400/70">
          <p className="w-full break-words text-center">
            {cryptoData?.address}
          </p>
          <div
            className="w-full flex items-center justify-center gap-2 text-[#79DA7E] font-semibold"
            onClick={() => {
              navigator.clipboard.writeText(cryptoData?.address || "");
            }}
          >
            <Copy className="text-2xl" /> <span>Copy address</span>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-gray-400 text-center">
          Or Scan QR Code
        </p>
        <div className="flex items-center justify-center p-4">
          <Image
            src={cryptoData?.qrCode}
            alt="QR Code"
            width={200}
            height={200}
            className="w-full h-auto"
          />
        </div>
        <p className="text-xs sm:text-sm text-center">
          {cryptoData?.instructions}
        </p>
      </div>
    </div>
  );
};

export default CryptoPayView;
