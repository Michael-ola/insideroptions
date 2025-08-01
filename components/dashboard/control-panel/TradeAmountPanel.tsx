import { useState } from "react";
import { useDashboardContext } from "@/context/DashboardContext";

const TradeAmountPanel = () => {
  const { tradeAmount, setTradeAmount, selectedBalanceAmount } =
    useDashboardContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const value = selectedBalanceAmount;
  const [selectedPercent, setSelectedPercent] = useState(100);

  const handlePercentageClick = (percent: number) => {
    //console.log(value);
    setTradeAmount(Number(((percent / 100) * value).toFixed(2)));
    setDropdownOpen(false);
  };

  const increaseAmount = () => {
    // @ts-expect-error set state
    setTradeAmount((prev) => prev + 5);
  };

  const decreaseAmount = () => {
    // @ts-expect-error set state
    setTradeAmount((prev) => Math.max(1, prev - 5));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    setTradeAmount(Number(val || 0));
  };

  return (
    <div className="flex flex-col justify-center items-center max-sm:flex-row-reverse max-sm:gap-2 max-sm:items-stretch max-sm:w-[50%]">
      <div className="bg-[#0e161d] border border-[#192f2c] w-full flex-1 flex flex-col items-center justify-center rounded-lg py-0">
        <span className="text-xs text-neutral-400 mb-1/2">Trade Amount</span>
        <div className="flex items-center space-x-1">
          <span className="text-md font-semibold">$</span>
          <input
            className="text-md font-semibold bg-transparent outline-none w-16 text-center"
            value={tradeAmount}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="flex items-center mt-1 max-sm:mt-0 space-x-2 max-sm:flex-col max-sm:space-x-0 max-sm:space-y-2 relative">
        <button
          onClick={decreaseAmount}
          className="w-14 h-5 max-sm:w-9 bg-[#0e161d] border border-[#192f2c] rounded flex items-center justify-center hover:bg-[#151d24] transition"
        >
          −
        </button>

        <div className="relative max-sm:hidden">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="text-xs bg-[#0e161d] border border-[#192f2c] rounded w-13 h-6 px-2 flex items-center justify-center hover:bg-[#151d24]"
          >
            {selectedPercent}%
          </button>
          {dropdownOpen && (
            <ul className="absolute bottom-full mb-1 w-full z-10 bg-[#0e161d] border border-[#192f2c] rounded text-xs text-white shadow-md">
              {[25, 75, 100].map((percent) => (
                <li
                  key={percent}
                  onClick={() => {
                    setSelectedPercent(percent);
                    return handlePercentageClick(percent);
                  }}
                  className="px-2 py-1 hover:bg-[#192f2c] cursor-pointer text-center"
                >
                  {percent}%
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          onClick={increaseAmount}
          className="w-14 h-5 max-sm:w-9 bg-[#0e161d] border border-[#192f2c] rounded flex items-center justify-center hover:bg-[#151d24] transition"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default TradeAmountPanel;
