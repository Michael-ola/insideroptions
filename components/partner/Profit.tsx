"use client";
import { useState } from "react";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import Image from "next/image";
import profitBanner from "@/lib/assets/profit_banner.jpg";
import mockData from "@/data/partner/mockData.json";
import mockData2 from "@/data/partner/bonusData.json";
import { useDashboardContext } from "@/context/DashboardContext";

const Profit = ({
  handleNewView,
}: {
  handleNewView: (val: string) => void;
}) => {
  const { traderData } = useDashboardContext();
  const [tab, setTab] = useState("Referral details");
  const [page, setPage] = useState(1);

  const TABS = ["Referral details", "Redeem Bonus"];

  const ITEMS_PER_PAGE = 6;

  const realAccount = traderData?.accounts.find(
    (account) => account.accountType === "INDIVIDUAL"
  );

  const EmptyState = ({ onAction }: { onAction: () => void }) => (
    <div className="w-full h-full m-auto">
      <div className="text-gray-400 text-xs flex flex-col items-center justify-center gap-1">
        <p className="text-center">Nothing to display yet</p>
        <p
          onClick={onAction}
          className="text-primary text-base font-semibold flex items-center gap-2 cursor-pointer"
        >
          Invite Traders <ChevronRight className="w-4 h-4" />
        </p>
      </div>
    </div>
  );

  const pageCount = Math.ceil(mockData.length / ITEMS_PER_PAGE);
  const paginatedData = mockData.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );
  const paginatedDat2 = mockData2.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const renderContent = () => {
    if (tab === "Referral details") {
      return paginatedData.length ? (
        paginatedData.map((item, idx) => (
          <div
            key={idx}
            className="grid grid-cols-4 text-[10px] sm:text-xs font-medium px-4 py-2"
          >
            <span>{item.id}</span>
            <span>{item.date}</span>
            <span>{item.deposited}</span>
            <span
              className={`${
                item.status === "Active" ? "text-green-600" : "text-red-500"
              }`}
            >
              {item.status}
            </span>
          </div>
        ))
      ) : (
        <EmptyState onAction={() => handleNewView("Referral link")} />
      );
    }

    if (tab === "Redeem Bonus") {
      return paginatedDat2.length ? (
        paginatedDat2.map((item, idx) => (
          <div
            key={idx}
            className="grid grid-cols-4 text-[10px] sm:text-xs font-medium px-4 py-2"
          >
            <span>{item.id}</span>
            <span>{item.referred}</span>
            <span>{item.date}</span>
            <span className="flex items-center justify-between">
              {item.amount}
              <span
                className={`text-[10px] sm:text-xs p-1.5 rounded-[4px] ${
                  item.status === "Active"
                    ? "bg-primary text-[#0f1f1c]"
                    : "bg-[#273634] text-gray-400"
                }`}
              >
                Redeem
              </span>
            </span>
          </div>
        ))
      ) : (
        <EmptyState onAction={() => handleNewView("Referral link")} />
      );
    }

    return null;
  };

  return (
    <div className="w-full h-full px-4 pt-2 text-white">
      <section className="mb-4 rounded-lg overflow-hidden">
        <Image
          src={profitBanner}
          alt="Profit Banner"
          className="w-full h-auto border-b border-b-white/5"
          priority
        />
      </section>

      <div className="space-y-4">
        <section className="bg-[#79DA7E]/5 p-6 rounded-xl border border-white/5 ">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-white/70">Referral balance:</p>
              <p className="text-3xl font-semibold">
                ${realAccount?.referralBalance}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-white/70">All time invites</p>
              <p className="text-xl font-semibold">8</p>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4 pb-10">
          <h1 className="text-base font-semibold text-center">
            Referral History
          </h1>

          <div className="w-full h-full min-h-[380px] bg-[#0f1f1c] rounded-xl border mb-4 border-white/5 flex flex-col gap-3">
            <div className="flex gap-20 justify-center border-b border-white/10 py-6 px-8">
              {TABS.map((t) => (
                <button
                  key={t}
                  className={`
                text-sm font-medium
                ${tab === t ? "text-primary" : "text-white/25"}
              `}
                  onClick={() => {
                    setTab(t);
                    setPage(1);
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
            {tab === "Referral details" && (
              <div className="grid grid-cols-4 justify-between text-xs text-white/70 px-4 whitespace-nowrap">
                <span>Ref ID</span>
                <span>Reg. Date</span>
                <span>Traded</span>
                <span>Status</span>
              </div>
            )}
            {tab === "Redeem Bonus" && (
              <div className="grid grid-cols-4 justify-between text-xs text-white/70 px-4">
                <span>Ref ID</span>
                <span>Referred</span>
                <span>Confirmed Date</span>
                <span>Bonus Amount</span>
              </div>
            )}

            {renderContent()}
            <div className="w-full mt-auto flex justify-end">
              <div className="w-[90%] flex justify-between items-center py-6 px-4 text-xs">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="disabled:text-white/30"
                >
                  <ArrowLeft className="inline w-4 h-4" />
                </button>

                <div className="px-3 py-1 flex items-center justify-center rounded-lg bg-[#2b2b2b] text-lg">
                  {page}
                </div>
                {page + 1 !== pageCount && page !== pageCount && (
                  <div className="px-3 py-1 text-lg">{page + 1}</div>
                )}
                {page + 1 !== pageCount &&
                  page + 2 !== pageCount &&
                  page !== pageCount && (
                    <div className="px-3 py-1 text-lg">...</div>
                  )}
                {page !== pageCount && (
                  <div className="px-3 py-1 text-lg">{pageCount}</div>
                )}
                <button
                  onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                  disabled={page === pageCount}
                  className="disabled:text-white/30"
                >
                  <ArrowRight className="inline w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profit;
