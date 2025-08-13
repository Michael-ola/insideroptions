"use client";

import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import Button from "@/components/Button2";
import { Icon } from "@iconify/react";
import copyToClipboardFallback from "@/lib/copyToClipboard";
import { Check } from "lucide-react";

type ShareModalProps = {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  shareLink: string;
  continueFunc: () => void;
};

export default function ShareModal({
  isOpen,
  onClose,
  imageUrl,
  shareLink,
  continueFunc,
}: ShareModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", handleClickOutside, true);
    document.addEventListener("keydown", handleEsc, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
      document.removeEventListener("keydown", handleEsc, true);
    };
  }, [isOpen, onClose]);

  const copyToClipboard = (text: string) => {
    if (
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === "function"
    ) {
      navigator.clipboard
        .writeText(text)
        .catch(() => copyToClipboardFallback(text));
    } else {
      copyToClipboardFallback(text);
    }
  };

  const handleCopy = () => {
    copyToClipboard(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen || !imageUrl) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center px-4">
      <div
        ref={modalRef}
        className="relative w-full max-w-[520px] max-h-[90dvh] rounded-2xl bg-[#111319] border border-[#304f37] shadow-2xl overflow-hidden"
      >
        <div className="relative flex items-center justify-center px-8 pt-4 pb-2">
          <h3 className="text-white text-lg font-semibold">Share</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-8 top-5 text-white/70 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mx-10 max-sm:mx-4 pt-4 mb-6">
          <div className="mb-4 rounded-xl overflow-hidden border border-[#222829]">
            <Image
              src={imageUrl}
              alt="Trade Result"
              width={400}
              height={330}
              className="w-full h-[330px] xl:!h-[300px] 2xl:!h-[330px]"
            />
          </div>

          <div className="relative bg-[#161D1E] overflow-hidden border border-[#222829] rounded-lg p-3 mb-6">
            <div className="text-[#9ea2ae] text-xs mb-1 cursor-default">
              Image link:
            </div>
            <div className="text-white text-xs break-all">{shareLink}</div>

            <div
              className="absolute cursor-pointer right-0 top-0 flex px-[6px] items-center justify-center h-full bg-[#79DA7E]"
              onClick={handleCopy}
            >
              <button>
                {copied ? (
                  <Check size={14} className="text-black" />
                ) : (
                  <Icon
                    icon="mynaui:copy"
                    height="18px"
                    className="cursor-pointer text-black"
                  />
                )}
              </button>
            </div>
          </div>

          <Button
            className="!w-full"
            caret
            onClick={() => {
              onClose();
              continueFunc();
            }}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
