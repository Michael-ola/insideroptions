"use client";

import { ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import candle from "@/lib/assets/green_candle.png";
import Image, { StaticImageData } from "next/image";
import { RiLoader4Line } from "@remixicon/react";
// import { getErrorMessage } from "@/lib/authUtils";

type Props = {
  title: string;
  icon: StaticImageData | string;
  onCloseModal: () => void;
  setOpenSuccess: (value: boolean) => void;
};

export default function OtpModal({
  title,
  icon,
  onCloseModal,
  setOpenSuccess,
}: Props) {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [resendTimer, setResendTimer] = useState(60);
  const [isConfirming, setIsConfirming] = useState(false);
  const inputsRef = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleResendOtp = () => {
    setResendTimer(60);
  };

  const handleOtp = () => {
    try {
      setIsConfirming(true);
      const payload = otp.join("");
      console.log(payload);
      setIsConfirming(false);
      onCloseModal()
      setOpenSuccess(true);
    } catch (error) {
      //   const err = getErrorMessage(error);
      //   toast.errot(err);
      console.log(error);
      setIsConfirming(false);
    }
  };

  const handleChange = (val: string, index: number) => {
    if (/^[0-9]$/.test(val)) {
      const updated = [...otp];
      updated[index] = val;
      setOtp(updated);
      if (index < 5) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const updated = [...otp];

      if (otp[index] !== "") {
        updated[index] = "";
        setOtp(updated);
      } else if (index > 0) {
        updated[index - 1] = "";
        setOtp(updated);
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text").slice(0, 6).split("");
    const updated = Array(6).fill("");
    pasted.forEach((char, i) => {
      if (/^[0-9]$/.test(char)) {
        updated[i] = char;
      }
    });
    setOtp(updated);
    setTimeout(() => inputsRef.current[pasted.length - 1]?.focus(), 10);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-60">
      <div className="bg-black sm:bg-black/3 space-y-6 rounded-xl border border-primary/30 px-0 py-6 sm:px-6 sm:py-8 sm:max-w-none max-w-sm mx-auto shadow-xl text-white">
        <div className="px-8 py-4 sm:p-0 flex justify-between items-center gap-3">
          <div className="w-full flex justify-center items-center gap-6">
            <Image src={icon ?? ""} alt="icon" className="w-6 h-auto" />
            <h2 className="text-xl capitalize font-medium">{title}</h2>
          </div>
          <button
            onClick={() => onCloseModal()}
            className="text-white text-2xl cursor-pointer"
          >
            &times;
          </button>
        </div>

        <div className="space-y-10 px-8 pt-6">
          {/* Title & Icon */}
          <div className="flex flex-col items-center justify-center gap-10 py-6 rounded-xl">
            <Image src={candle} alt="Candle" />
            <h2 className="text-2xl text-gray-400 font-semibold">
              Withdrawal Authentication
            </h2>
            <p className="text-sm text-gray-400 text-center px-6">
              Please enter the One Time Password (OTP) sent to your registered
              email.
            </p>
            {/* OTP Inputs */}
            <div className="flex justify-between gap-2 mb-6">
              {otp.map((val, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    if (el) inputsRef.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={val}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  className="w-10 h-12 rounded-md bg-secondary text-center text-white text-lg font-bold border border-white/20 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              ))}
            </div>
          </div>

          {/* Confirm Button */}
          <div className="flex flex-col gap-3">
            <button
              className={`w-full py-3 rounded-xl font-semibold  flex items-center justify-center gap-3 ${
                otp.join("").length === 6 && !isConfirming
                  ? "cursor-pointer bg-primary text-black"
                  : "bg-secondary cursor-not-allowed text-white/50"
              }`}
              disabled={otp.join("").length < 6}
              onClick={handleOtp}
            >
              {isConfirming && (
                <RiLoader4Line className="size-5 mr-2 animate-spin" />
              )}{" "}
              Confirm {!isConfirming && <ChevronRight className="w-4 h-4" />}
            </button>

            {/* Resend */}
            {otp.join("").length < 6 && (
              <button
                className={`w-full mt-4 py-3 rounded-xl text-sm  ${
                  resendTimer > 0
                    ? "bg-secondary text-white/50"
                    : "bg-primary text-black"
                }`}
                disabled={resendTimer > 0}
                onClick={handleResendOtp}
              >
                {resendTimer > 0
                  ? `Resend email in ${resendTimer}s`
                  : "Resend email"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
