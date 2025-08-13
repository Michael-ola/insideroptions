import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";

type TradeCardProps = {
  pair: string;
  pairIcon: string;
  amount: number;
  earning: number;
};

export default function TradeCard({
  pair,
  pairIcon,
  amount,
  earning,
}: TradeCardProps) {
  return (
    <div className="fixed top-14 px-10 max-sm:px-[3%] z-50 cursor-default flex ml-[50%] border-t-3 border-[#fff] translate-x-[-50%] items-center justify-between bg-[#009951] rounded-2xl py-3 w-[90vw] sm:w-[40vw] max-w-[90vw]">
      <div className="flex items-center gap-2 ">
        <Icon
          icon={"grommet-icons:status-good"}
          className="text-white min-w-5 min-h-5"
        />
        <div className="flex items-center gap-1 ml-[25%] max-sm:ml-[10%]">
          <Image
            src={pairIcon}
            alt={pair}
            width={20}
            height={20}
            className="rounded-sm min-w-5 min-h-5"
          />
          <span className="text-white font-medium">{pair}</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex flex-col text-right">
          <span className="text-black font-bold">${amount.toFixed(2)}</span>
          <span className="text-black text-xs">Amount</span>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-white font-bold">${earning.toFixed(2)}</span>
          <span className="text-white text-xs">Earning</span>
        </div>
      </div>
    </div>
  );
}
