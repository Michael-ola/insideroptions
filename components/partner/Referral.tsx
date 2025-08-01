import React from "react";
import referral from "@/lib/assets/referral_banner.jpg";
import Image from "next/image";
import { Share2 } from "lucide-react";
import copy from "@/lib/assets/copy.png";
import { toast } from "react-toastify";
import { useDashboardContext } from "@/context/DashboardContext";

const Referral = () => {
  const { traderData } = useDashboardContext();
  const options = [
    {
      header: "Invite your friends",
      details: "by sharing assigned referral link above.",
    },
    {
      header: "Friends must register",
      details: "with Promo code or referral link on the platform.",
    },
    {
      header: "Deposit",
      details: "You will get 6-10% on their first traded deposit.",
      more: "Learn more",
    },
    {
      header: "You start earning",
      details: "As soon as they start trading,",
    },
  ];
  return (
    <div className="w-full h-full px-6 pt-2 space-y-6">
      <Image
        src={referral}
        alt="Referral Bannner"
        priority
        className="w-full h-auto border-b border-b-white/5"
      />
      <div className="space-y-4 pb-12">
        <div className="flex flex-col gap-3 p-6 bg-primary/5 border border-[#FFFFFF]/5 rounded-xl">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <p className="text-white/20">Referral link</p>
                <p>{`https://insider-option-web.vercel.app/signup?referral=${traderData?.myReferrerCode}`}</p>
              </div>
              <Share2
                onClick={() => {
                  navigator.clipboard.writeText(
                    `https://insider-option-web.vercel.app/signup?referral=${traderData?.myReferrerCode}` ||
                      ""
                  );
                  toast.info(`Link copied!`);
                }}
                className="text-white/60 cursor-pointer"
              />
            </div>
            <hr className="text-white-25" />
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <p className="text-white/20">Profile Code</p>
                <p>{traderData?.myReferrerCode}</p>
              </div>
              <Image
                onClick={() => {
                  navigator.clipboard.writeText(traderData?.myReferrerCode || "");
                  toast.info(`Code copied!`);
                }}
                src={copy}
                alt="clipboard copy"
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
        <h4 className="text-sm font-semibold">How It Works</h4>
        <div className="w-full grid grid-cols-2 gap-[10px] py-3">
          {options.map((itm, idx) => (
            <div
              key={idx}
              className="bg-[#79DA7E]/10 px-4 py-6 border border-[#FFFFFF]/5 rounded-xl flex flex-col gap-3"
            >
              <div className="w-6 h-6 rounded-full bg-[#79DA7E]/20 text-primary text-sm flex items-center justify-center">
                {idx + 1}
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="font-semibold text-xs">{itm.header}</h4>
                <span className="text-[10px] font-medium text-gray-400">
                  {itm.details}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Referral;
