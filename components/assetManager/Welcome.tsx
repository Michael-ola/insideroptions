import { referralData } from "@/data/assetManager/Referral";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ChevronDown, Filter, Search } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import TraderDetailsModal from "./TradingHistory";

const Welcome = ({
  handleViewChange,
}: {
  handleViewChange: (val: string) => void;
}) => {
  const [selectedGeneration, setSelectedGeneration] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openTraderModal, setOpenTraderModal] = useState<boolean>(false);
  const generations = [
    "First Generation",
    "Second Generation",
    "Third Generation",
    "Fourth Generation",
    "Fifth Generation",
    "Sixth Generation",
    "Seventh Generation",
    "Eight Generation",
  ];

  const handleRedeem = () => {
    toast.success("Congratulations $50 addded to Referral Balance");
  };

  return (
    <div className="w-full h-full px-8 pt-4">
      <div className="space-y-6">
        <section className="w-full flex flex-col items-center justify-center gap-2.5">
          <h2 className="text-center text-2xl font-semibold">
            Welcome Prince Asset Manager
          </h2>
          {!selectedGeneration && (
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2">
                <Icon
                  icon="solar:star-bold-duotone"
                  width="40"
                  height="40"
                  className="text-primary"
                />
                <h1 className="text-2xl font-semibold">Rank: Amateur</h1>
              </div>
              <div className="flex items-center gap-2 px-4">
                <Icon
                  icon="bx:dollar"
                  width="24"
                  height="24"
                  className="text-primary"
                />
                <h1 className="text-xl font-medium">Total SD: $85,000</h1>
              </div>
            </div>
          )}
        </section>

        <div className="flex justify-between items-center">
          <div className="w-[70%]">
            <span className="text-sm font-medium">Select generation from</span>
            <div className="w-[50%] relative text-sm text-white">
              <button
                type="button"
                className="w-full bg-[#161a21] rounded-tl-xl rounded-tr-xl border-b border-b-white/10 px-4 py-3 flex justify-between items-center text-left"
                onClick={() => setIsOpen(!isOpen)}
              >
                {selectedGeneration || "Select Generation to withdraw"}
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {isOpen && (
                <ul className="w-[80%] absolute z-10 bg-black/80 border border-white/10 rounded-bl-xl rounded-br-xl max-h-60 overflow-y-auto custom-scrollbar">
                  {generations.map((label) => (
                    <li
                      key={label}
                      onClick={() => {
                        setSelectedGeneration(label);
                        setIsOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-white/10 cursor-pointer text-sm"
                    >
                      {label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleViewChange("Downline Tickets")}
              className="relative bg-primary/5 rounded-xl border border-white/5 px-6 py-3 hover:bg-primary/10"
            >
              <div className="absolute -top-2 right-[10%] w-4 h-4 rounded-full flex items-center justify-center bg-red-600 text-white text-xs">
                1
              </div>
              View Ticket History
            </button>
            <button
              onClick={() => handleViewChange(" ")}
              className="bg-primary px-6 py-3 rounded-xl flex items-center gap-3 font-medium text-black hover:bg-gradient-to-tr from-[#99E39E] to-[#b3ffb8] transition-all duration-300"
            >
              <Search className="w-4 h-4" /> Search my Structure
            </button>
          </div>
        </div>

        <div className="w-full h-full flex flex-col gap-y-2.5 pb-10">
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="  Search guest, type, etc"
              className="w-full max-w-md bg-[#262b30] text-white px-4 py-3 rounded-4xl placeholder:text-white/60 placeholder:font-light outline-none focus:border-0 focus:ring-1 focus-within:ring-primary"
            />
            <button className="bg-[#262b30] text-white/60 flex items-center gap-2 rounded-xl p-3">
              <div className="flex-1 flex items-center gap-3">
                <Filter className="w-4 h-4" /> Filter
              </div>

              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="w-full h-[360px] max-h-[360px] flex flex-col bg-[#79DA7E]/10 border border-white/5 rounded-xl">
            <h3 className="text-center py-2 text-primary border-b border-primary/20">
              Referral details
            </h3>
            <div className="w-full h-full overflow-x-auto overflow-y-auto custom-scrollbar">
              <table className="w-full text-sm">
                <thead className="text-left text-white/60">
                  <tr>
                    {[
                      "Ref ID",
                      "Reg. Date",
                      "Tenure",
                      "Trader",
                      "Referred By",
                      "Traded",
                      "Ref. %",
                      "Effective Date",
                      "Confirm Date",
                      "Status",
                      "Action",
                    ].map((header) => (
                      <th
                        key={header}
                        className="py-2 px-4 font-semibold text-white/60"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {selectedGeneration &&
                    referralData.map((ref, idx) => (
                      <tr
                        key={idx}
                        onClick={() => setOpenTraderModal(true)}
                        className="hover:bg-white/5 cursor-pointer"
                      >
                        <td className="py-2 px-4">{ref.refId}</td>
                        <td className="py-2 px-4">{ref.regDate}</td>
                        <td className="py-2 px-4">{ref.tenure}</td>
                        <td className="py-2 px-4">{ref.trader}</td>
                        <td className="py-2 px-4">{ref.referredBy}</td>
                        <td className="py-2 px-4">{ref.deposited}</td>
                        <td className="py-2 px-4">{ref.refPercentage}</td>
                        <td className="py-2 px-4">{ref.effectiveDate}</td>
                        <td className="py-2 px-4">{ref.confirmDate}</td>
                        <td className="py-2 px-4">
                          <span
                            className={`px-2 py-1 text-xs ${
                              ref.status === "Active"
                                ? "text-primary"
                                : "text-red-500"
                            }`}
                          >
                            {ref.status}
                          </span>
                        </td>
                        <td className="py-2 px-4">
                          <button
                            disabled={ref.status !== "Active"}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRedeem();
                            }}
                            className={`${
                              ref.status === "Active"
                                ? "bg-primary hover:bg-primary/20 text-black"
                                : "bg-primary/20 text-white"
                            }  px-2 py-1 rounded-md text-xs`}
                          >
                            Redeem
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {openTraderModal && (
        <TraderDetailsModal
          onClose={() => setOpenTraderModal(false)}
          handleViewChange={handleViewChange}
        />
      )}
    </div>
  );
};

export default Welcome;
