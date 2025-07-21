import { Check } from "lucide-react";
import Image from "next/image";
import React from "react";

const Page1 = ({
  handleViewChange,
}: {
  handleViewChange: (val: string) => void;
}) => {
  const optionDetails = [
    "Join the InsiderOption LLC prop trading affiliate program and start earning!",
    "Become a partner and accumulate referrals to earn up to 15% commissions.",
    "Access a user-friendly dashboard to track your commissions and performance.",
  ];
  const aMOption = [
    "Join the InsiderOption LLC 14days Asset Manager school and become a certified IO Asset Manager.",
    "Get knowledgeable insigth of what IO stands for, and how it impacts lives.",
    "As an asset manager, you get bonuses up to your 8th level and VIP black card for private events.",
  ];
  return (
    <div className="w-full h-full pl-8 py-6 pr-1 space-y-3 overflow-y-auto custom-scrollbar">
      <div className="flex flex-col gap-6">
        <p className="space-y-3 p-6 bg-[#79DA7E]/5 border border-[#FFFFFF]/5 rounded-xl text-white text-sm">
          We’ve got the tools, expertise, and knowledge to help you grow your
          business. Select a plan below that works best for you and your
          business needs.
        </p>
        <div className="space-y-3 p-6 bg-[#79DA7E]/5 border border-[#FFFFFF]/5 rounded-xl text-white text-sm">
          <div className="w-full flex items-center justify-center">
            <Image
              width={175.24}
              height={32}
              src="/images/logo-extended.png"
              alt="Insider Option"
            />
          </div>
          {optionDetails.map((option, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <Check className="text-primary w-10" />
              <p>{option}</p>
            </div>
          ))}
        </div>
        <hr className="text-[#FFFFFF]/10" />
        <button
          onClick={() => handleViewChange("Page 2")}
          className="w-full text-black bg-primary px-6 py-3 rounded-xl flex items-center justify-center hover:bg-gradient-to-tr  from-primary to-[#b4e6b8]"
        >
          Get Started
        </button>
        <div className="space-y-3 p-6 bg-[#79DA7E]/5 border border-[#FFFFFF]/5 rounded-xl text-white text-sm">
          <div className="w-full flex flex-col items-center justify-center gap-3">
            <Image
              width={98}
              height={18}
              src="/images/logo-extended.png"
              alt="Insider Option"
            />
            <h2 className="text-white text-2xl font-bold">Asset Manager(AM)</h2>
          </div>
          {aMOption.map((option, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <Check className="text-primary w-10" />
              <p>{option}</p>
            </div>
          ))}
        </div>
        <button className="w-full text-black bg-primary px-6 py-3 rounded-xl flex items-center justify-center">
          Join school
        </button>
      </div>
    </div>
  );
};

export default Page1;
