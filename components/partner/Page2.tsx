import React from "react";
import Image from "next/image";
import { ReactNode } from "react";
import lightning from "@/lib/assets/lightning.png";
import dart from "@/lib/assets/dart.png";
import arrow_up from "@/lib/assets/arrow_up.png";
import dollar_logo from "@/lib/assets/dollar_logo.png";

interface NumberedParagraphProps {
  number: string;
  children: ReactNode;
}

const NumberedParagraph: React.FC<NumberedParagraphProps> = ({
  number,
  children,
}) => (
  <div className="text-primary text-xs flex flex-start">
    <span className="font-medium min-w-[20px]">{number}.</span>
    <div className="flex-1">{children}</div>
  </div>
);
const Page2 = () => {
  const others = [
    {
      header: "Industry Leader",
      details:
        "We're one of the most reliable firms in the modern prop trading industry.",
      imgSrc: lightning,
    },
    {
      header: "Ethical Practices",
      details:
        "Our commitment to transparency builds trust with your audience.",
      imgSrc: dart,
    },
    {
      header: "Generous Commissions",
      details: "Earn up to 15% on every sale you generate.",
      imgSrc: arrow_up,
    },
    {
      header: "Tiered Rewards",
      details: "The more you refer, the more you earn.",
      imgSrc: dollar_logo,
    },
  ];

  return (
    <div className="w-full h-full px-6 pt-6 pb-16 space-y-3 overflow-y-auto custom-scrollbar">
      <div className="flex flex-col gap-9 py-2">
        <div className="px-2">
          <div className="flex flex-col gap-2 items-center justify-center">
            <p className="text-[28px] font-semibold text-center">
              Unlock Your Earning Potential with InsiderOption&apos;s Affiliate
              Program
            </p>
            <p className="text-sm text-center text-gray-400">
              Powered by InsiderOption, African best Broker
            </p>
          </div>
          <div className="flex flex-col gap-2 items-center justify-center">
            <p className="text-[16px] font-semibold text-center">
              Earn Up to <span className="text-primary">10%</span> Commissions
            </p>
            <p className="text-xs font-medium text-center text-gray-400">
              Are you ready to leverage your network and passion for trading
              into a lucrative opportunity? Join InsiderOption’s Affiliate
              Program and start earning substantial commissions today!
            </p>
          </div>
        </div>
        <p className="text-sm font-semibold">Why Partner with InsiderOption?</p>
        <div className="px-3">
          <div className="w-full grid grid-cols-2 gap-[10px]">
            {others.map((itm, idx) => (
              <div
                key={idx}
                className="bg-[#79DA7E]/10 px-4 py-6 border border-[#FFFFFF]/5 rounded-xl flex flex-col gap-3"
              >
                <Image src={itm.imgSrc} alt={itm.header} />
                <div className="flex flex-col gap-2">
                  <h4 className="font-semibold text-sm">{itm.header}</h4>
                  <span className="text-xs font-medium text-gray-400">
                    {itm.details}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <h3 className="text-sm font-semibold">Affiliate Tiers:</h3>
        <div className="px-3 pb-2 border-b border-b-white/5">
          <div className="w-full flex flex-col gap-2">
            <div className="w-full p-2 border-b border-b-white/5 flex items-center gap-8">
              <div className="text-xs">
                <p className="text-primary">Tier 1</p>
                <p>{"<"}100 Referrals</p>
              </div>
              <div className="text-xs text-white/25">
                <p className="">Commission</p>
                <p>6% - TD</p>
              </div>
              <div className="text-xs text-white/25">
                <p className="">Payouts</p>
                <p>15 days</p>
              </div>
            </div>
            <div className="w-full p-2 border-b border-b-white/5 flex items-center gap-8">
              <div className="text-xs">
                <p className="text-primary">Tier 2</p>
                <p>100+ Referrals</p>
              </div>
              <div className="text-xs text-white/25">
                <p className="">Commission</p>
                <p>8% - TD</p>
              </div>
              <div className="text-xs text-white/25">
                <p className="">Payouts</p>
                <p>15 days</p>
              </div>
            </div>
            <div className="w-full p-2 flex items-center gap-8">
              <div className="text-xs">
                <p className="text-primary">Tier 3</p>
                <p>250+ Referrals</p>
              </div>
              <div className="text-xs text-white/25">
                <p className="">Commission</p>
                <p>10% - TD</p>
              </div>
              <div className="text-xs text-white/25">
                <p className="">Payouts</p>
                <p>15 days</p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-3 flex flex-col gap-2">
          <NumberedParagraph number="1">
            TD means: Traded deposit, you only get your commission once your
            downline has deposited and traded.
          </NumberedParagraph>
          <NumberedParagraph number="2">
            Redemption of bonus is available 15 days after your downline
            deposited and make a trade. Learn more
          </NumberedParagraph>
        </div>
      </div>
    </div>
  );
};

export default Page2;
