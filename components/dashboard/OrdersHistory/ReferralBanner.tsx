"use client";

import Image from "next/image";
import React from "react";

type ReferralBannerProps = {
  code?: string;
  className?: string;
};

export default function ReferralBanner({
  code = "582-4602-121",
  className = "",
}: ReferralBannerProps) {
  return (
    <div
      className={`w-full max-w-4xl mx-auto rounded-md overflow-hidden flex justify-center ${className}`}
      style={{
        background: "linear-gradient(90deg, #0A1014 0%, #0F161A 100%)",
      }}
    >
      <div className="relative flex items-center">
        <Image
          src="/images/logo-extended.png"
          alt="InsiderOption logo"
          width={186}
          height={56}
          priority
          className="w-[186px] max-sm:w-[130px] h-auto object-contain"
        />
        <div className="absolute bottom-[6px] left-[43px] max-sm:left-[30px] text-gray-400 text-[10px]">
          African Best Broker
        </div>
      </div>

      <div className="mx-7 max-sm:mx-4 text-white flex justify-center items-center">
        <div className="w-[2px] h-9 bg-white" />
      </div>

      <div className="flex items-center p-2 pl-0">
        <div className="flex-1 text-right">
          <div className="text-gray-300 text-sm font-medium">
            Referral promo code:
          </div>
          <div className="text-white font-bold text-md tracking-wider mt-1 text-left">
            {code}
          </div>
        </div>
      </div>
    </div>
  );
}
