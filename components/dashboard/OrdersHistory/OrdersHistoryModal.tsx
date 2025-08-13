"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { X, ChevronDown, ChevronUp, ChevronRight } from "lucide-react";
import Button from "@/components/Button2";
import html2canvas from "html2canvas-pro";
import ShareModal from "./ShareModal";
import ReferralBanner from "./ReferralBanner";
import Loader from "@/components/Loader";

export type TradeResultModalProps = {
  isOpen: boolean;
  onClose: () => void;
  imageSrc?: string;
  symbol?: string;
  date?: string;
  deal?: "buy" | "sell";
  profit?: number;
  openTime?: string;
  openRate?: number;
  amount?: number;
  closeTime?: string;
  closeRate?: number;
  profitPercent?: number;
};

export default function OrdersHistoryModal({
  isOpen,
  onClose,
  imageSrc = "/images/orderImage.png",
  symbol = "EUR/USD",
  date = "Apr 11, 2025",
  deal = "buy",
  profit = 1600.2,
  openTime = "08:12:35",
  openRate = 1.24326,
  amount = 1000,
  closeTime = "08:15:32",
  closeRate = 1.243656,
  profitPercent = 86,
}: TradeResultModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isShareOpen, setShareOpen] = React.useState(false);
  const [shareImage, setShareImage] = React.useState("");
  const [shareLink, setShareLink] = React.useState("");
  const [isCapturing, setIsCapturing] = React.useState(false);
  const isShareOpenRef = useRef(false);
  const captureRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    isShareOpenRef.current = isShareOpen;
  }, [isShareOpen]);

  // Function to trigger download
  // const downloadImage = (dataUrl: string) => {
  //   const link = document.createElement("a");
  //   const fileName = `trade-result-${symbol.replace("/", "-")}-${date.replace(
  //     /\s/g,
  //     "-"
  //   )}.png`;

  //   link.href = dataUrl;
  //   link.download = fileName;
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  const handleShareClick = async () => {
    if (!captureRef.current) return;

    setIsCapturing(true);

    setTimeout(async () => {
      try {
        const canvas = await html2canvas(captureRef.current!, {
          backgroundColor: null,
          useCORS: true,
          allowTaint: true,
          logging: true,
        });

        const dataUrl = canvas.toDataURL("image/png");

        // Download the image immediately
        //downloadImage(dataUrl);

        setShareImage(dataUrl);
        setShareLink("https://example.com/trade/123");
        setShareOpen(true);
      } catch (error) {
        console.error("Capture failed:", error);
        setShareLink("https://example.com/trade/123");
        setShareOpen(true);
      } finally {
        setIsCapturing(false);
      }
    }, 100);
  };

  useEffect(() => {
    if (!isOpen) return;

    const onDocClick = (e: MouseEvent) => {
      if (isShareOpenRef.current) return;
      if (!modalRef.current) return;
      if (!modalRef.current.contains(e.target as Node)) onClose();
    };

    const onEsc = (e: KeyboardEvent) => {
      if (isShareOpenRef.current) return;
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);

    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isBuy = deal === "buy";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div
        ref={modalRef}
        className="relative w-full cursor-default max-w-[520px] max-h-[90dvh] rounded-2xl bg-[#111319] border border-[#304f37] shadow-2xl overflow-hidden"
      >
        {isCapturing && <Loader dashboard />}
        <div className="relative flex items-center justify-center px-8 pt-4 pb-2">
          <h3 className="text-white text-lg font-semibold">{symbol}</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-8 top-5 text-white/70 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mx-7 max-sm:mx-4 pt-4 mb-6">
          <div
            ref={captureRef}
            className="relative rounded-xl overflow-hidden bg-[#161D1E] bg-opacity-80 border border-[#222829] shadow-lg"
          >
            <div className="relative w-full flex justify-center h-[130px] mb-4 overflow-hidden">
              {true && (
                <div className="text-white z-40 text-sm absolute top-4 mx-auto inline-block w-full text-center font-semibold">
                  {symbol}
                </div>
              )}
              <Image
                src={imageSrc}
                alt="trade graph"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex items-center px-4 justify-between mb-3">
              <div className="text-xs text-white">
                <div className="font-normal text-[#9ea2ae] mb-1">Date</div>
                {date}
              </div>

              <div className="flex items-center mx-auto">
                <div
                  className={`w-10 h-10 rounded-md flex items-end justify-end mr-1`}
                >
                  {isBuy ? (
                    <ChevronUp className="text-[#79DA7E] w-4 h-4" />
                  ) : (
                    <ChevronDown className="text-[#FF6B6B] w-4 h-4" />
                  )}
                </div>
                <span
                  className={`text-sm font-semibold ${
                    isBuy ? "text-[#79DA7E]" : "text-[#FF6B6B]"
                  } capitalize`}
                >
                  <div className="font-normal text-[#9ea2ae] text-right mb-1">
                    Deal
                  </div>
                  {isBuy ? (
                    <span style={{ color: "#79DA7E" }}>Buy</span>
                  ) : (
                    <span style={{ color: "#FF6B6B" }}>Sell</span>
                  )}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-sm font-semibold text-white">
                  <div className="font-normal text-[#9ea2ae] text-right mb-1">
                    Profit
                  </div>
                  ${Number(profit).toFixed(2)}
                </div>
              </div>
            </div>

            <div className="border-t border-white/6 my-2 mb-5 mx-4" />

            <div className="grid grid-cols-3 gap-y-3 gap-x-4 text-sm px-4 pb-4 text-white/80">
              <div className="flex flex-col">
                <span className="text-xs text-white/60 mb-1">Open time</span>
                <span className="font-medium text-white">{openTime}</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-xs text-white/60 mb-1">Open rate</span>
                <span className="font-medium text-white">
                  {openRate.toFixed(6)}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-xs text-white/60 text-right mb-1">
                  Amount
                </span>
                <span className="font-medium text-white text-right">
                  ${amount.toFixed(2)}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-xs text-white/60 mb-1">Close time</span>
                <span className="font-medium text-white">{closeTime}</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-xs text-white/60 mb-1">Close rate</span>
                <span className="font-medium text-white">
                  {closeRate.toFixed(6)}
                </span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-xs text-white/60 mb-1">Profit %</span>
                <span className="font-medium text-white">{profitPercent}%</span>
              </div>
            </div>
            {isCapturing && <ReferralBanner />}
          </div>

          <div className="mt-6 w-full space-y-3">
            <Button
              className="!w-[80%] mx-auto"
              caret
              onClick={() => {
                onClose();
              }}
            >
              Continue
            </Button>

            <Button
              className="!w-[80%] mx-auto bg-transparent border-2 border-[#79DA7E] !text-[#79DA7E] hover:!text-black group"
              onClick={() => {
                handleShareClick();
              }}
            >
              Share
              <ChevronRight className="group-hover:text-black font-bold w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setShareOpen(false)}
        continueFunc={onClose}
        imageUrl={shareImage}
        shareLink={shareLink}
      />
    </div>
  );
}
