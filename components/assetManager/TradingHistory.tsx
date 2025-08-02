// components/TraderDetailsModal.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import avatar from "@/lib/assets/aM_avatar.png";
import { Mail, X } from "lucide-react";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";

interface Trade {
  refId: string;
  asset: string;
  flagIcon: string;
  amount: string;
  status: "Active" | "Completed";
}

const trades: Trade[] = [
  {
    refId: "323454",
    asset: "GBP/USD",
    flagIcon: "twemoji:flag-united-kingdom",
    amount: "$500,000",
    status: "Active",
  },
  {
    refId: "323454",
    asset: "GBP/USD",
    flagIcon: "twemoji:flag-united-kingdom",
    amount: "$1,000,000",
    status: "Completed",
  },
  {
    refId: "323454",
    asset: "GBP/USD",
    flagIcon: "twemoji:flag-united-kingdom",
    amount: "$1,000,000",
    status: "Completed",
  },
  {
    refId: "323454",
    asset: "GBP/USD",
    flagIcon: "twemoji:flag-united-kingdom",
    amount: "$1,000,000",
    status: "Completed",
  },
  {
    refId: "323454",
    asset: "GBP/USD",
    flagIcon: "twemoji:flag-united-kingdom",
    amount: "$1,000,000",
    status: "Completed",
  },
  {
    refId: "323454",
    asset: "GBP/USD",
    flagIcon: "twemoji:flag-united-kingdom",
    amount: "$1,000,000",
    status: "Completed",
  },
];

export default function TraderDetailsModal({
  onClose,
  handleViewChange,
}: {
  onClose: () => void;
  handleViewChange: (val: string) => void;
}) {
  const [activeTab, setActiveTab] = useState<
    "Trading" | "Deposit" | "Withdrawal"
  >("Trading");

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex justify-center items-center w-full h-full">
      <div className="bg-[#0a0f17] w-[50%] max-w-full rounded-xl px-8 pt-6 pb-2 space-y-9 text-white relative">
        <button onClick={onClose} className="absolute top-4 right-4">
          <X className="w-5 h-5 text-white" />
        </button>

        <div className="flex items-center gap-3">
          <Image src={avatar} alt="aM profile" />
          <div className="">
            <h2 className="text-lg font-semibold">Prince Maxwell</h2>
            <p className="text-sm text-white/60">Trader</p>
          </div>
        </div>

        <div className="bg-[#10171c] rounded-xl p-6 space-y-3 border border-white/5">
          <div>
            <p className="text-sm text-white/60">
              Account creation date: 08, May 2022
            </p>
            <p className="text-sm text-white/60 mt-1">
              Account Verification status: Verified
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 border-t border-white/5">
              <div className="flex items-center gap-2 text-white/60 ">
                <Icon
                  icon="ri:whatsapp-fill"
                  width="24"
                  height="24"
                  className="text-primary"
                />
                <span className="text-sm">0904 546 3234</span>
              </div>
              <Icon
                onClick={() => {
                  navigator.clipboard.writeText("0904 546 3234");
                  toast.info("WhatsApp number coied!");
                }}
                icon="mynaui:copy"
                width="24"
                height="24"
                className="text-primary cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between p-2 border-t border-white/5">
              <div className="flex items-center gap-2 text-white/60">
                <Mail className="w-6 h-6 text-primary" />
                <span className="text-sm">Princemax222@gmail.com</span>
              </div>
              <Icon
                onClick={() => {
                  navigator.clipboard.writeText("Princemax222@gmail.com");
                  toast.info("Email number coied!");
                }}
                icon="mynaui:copy"
                width="24"
                height="24"
                className="text-primary"
              />
            </div>
          </div>
        </div>

        <div className="w-full h-full space-y-6 py-6">
          <p className="text-sm text-white/60">
            Dear Prince Asset Manager, the above contact information is made
            available should you want to reach those in your multi level
            structure.
          </p>

          <div className="flex items-center gap-2">
            <Icon icon="material-symbols:history" width="24" height="24" />
            <h3 className="text-white text-lg font-medium">Trading History</h3>
          </div>
          <div className="w-full h-full">
            <div className="bg-[#79DA7E]/10 rounded-xl px-2">
              <div className="grid grid-cols-3 text-sm border-b border-b-primary/10">
                {["Trading", "Deposit", "Withdrawal"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`py-3 text-center border-r border-r-white/5 last:border-r-0 ${
                      activeTab === tab
                        ? "text-primary font-semibold"
                        : "text-white/60"
                    }`}
                  >
                    {tab} History
                  </button>
                ))}
              </div>

              {activeTab === "Trading" && (
                <div className="h-full">
                  <table className="w-full text-xs">
                    <thead className="text-center text-white/60 sticky top-0 z-10">
                      <tr>
                        <td className="py-2">Ref ID</td>
                        <td className="py-2">Asset</td>
                        <td className="py-2">Amount</td>
                        <td className="py-2">Status</td>
                        <td className="py-2">Action</td>
                      </tr>
                    </thead>
                  </table>
                  <div className="max-h-32 overflow-y-auto custom-scrollbar">
                    <table className="w-full text-xs">
                      <tbody>
                        {trades.map((trade, idx) => (
                          <tr
                            key={idx}
                            className="w-full hover:bg-white/5 text-center"
                          >
                            <td className="py-2">{trade.refId}</td>
                            <td className="py-2 flex items-center gap-1 px-2">
                              <Icon
                                icon={trade.flagIcon}
                                width="15"
                                height="15"
                              />
                              {trade.asset}
                            </td>
                            <td className="py-2">{trade.amount}</td>
                            <td className="py-2">
                              <span
                                className={
                                  trade.status === "Active"
                                    ? "text-primary"
                                    : "text-red-500"
                                }
                              >
                                {trade.status}
                              </span>
                            </td>
                            <td className="py-2">
                              <button
                                onClick={() =>
                                  handleViewChange("Logging Downline Complains")
                                }
                                disabled={trade.status !== "Active"}
                                className={`${
                                  trade.status === "Active"
                                    ? "bg-primary text-black"
                                    : "text-white cursor-default"
                                } text-xs px-3 py-1 rounded-md`}
                              >
                                Log Complaint
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab !== "Trading" && (
                <div className="mt-4 text-center text-white/60">
                  No {activeTab.toLowerCase()} history available.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
