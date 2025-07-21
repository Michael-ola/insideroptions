"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import profitBanner from "@/lib/assets/profit_banner.png";

const mockData = [
  { id: "323454", date: "4th Apr 2025", deposited: "$1000", status: "Active" },
  { id: "323454", date: "4th Apr 2025", deposited: "$0", status: "Inactive" },
  { id: "323454", date: "4th Apr 2025", deposited: "$1000", status: "Active" },
  { id: "323454", date: "4th Apr 2025", deposited: "$900", status: "Active" },
  { id: "323454", date: "4th Apr 2025", deposited: "$0", status: "Inactive" },
  { id: "323454", date: "4th Apr 2025", deposited: "$1000", status: "Active" },
  { id: "323454", date: "4th Apr 2025", deposited: "$0", status: "Inactive" },
  { id: "323454", date: "4th Apr 2025", deposited: "$1000", status: "Active" },
  { id: "323454", date: "4th Apr 2025", deposited: "$1000", status: "Active" },
  { id: "323454", date: "4th Apr 2025", deposited: "$0", status: "Inactive" },
  { id: "323454", date: "4th Apr 2025", deposited: "$1000", status: "Active" },
  { id: "323454", date: "4th Apr 2025", deposited: "$1000", status: "Active" },
  { id: "323454", date: "4th Apr 2025", deposited: "$0", status: "Inactive" },
  { id: "323454", date: "4th Apr 2025", deposited: "$1000", status: "Active" },
];

const TABS = ["Referral details", "Redeem Bonus"];

const ITEMS_PER_PAGE = 10;

const Profit = () => {
  const [tab, setTab] = useState("Referral details");
  const [page, setPage] = useState(1);

  const pageCount = Math.ceil(mockData.length / ITEMS_PER_PAGE);
  const paginatedData = mockData.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );
  return (
    <div className="w-full h-full px-4 pt-2 pb-24 overflow-y-auto custom-scrollbar text-white">
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
              <p className="text-3xl font-semibold">$0.00</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-white/70">All time invites</p>
              <p className="text-xl font-semibold">8</p>
            </div>
          </div>
        </section>

        <section>
          <h1 className="text-base font-semibold mb-4 text-center">
            Referral History
          </h1>

          <div className="bg-[#0f1f1c] rounded-xl border border-white/5 flex flex-col gap-3">
            <div className="flex gap-10 justify-center border-b border-white/10 py-6 px-8">
              {TABS.map((t) => (
                <button
                  key={t}
                  className={`
                text-sm
                ${tab === t ? "text-primary" : "text-white/25"}
              `}
                  onClick={() => setTab(t)}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-4 text-center text-xs text-white/70  px-4">
              <span>Ref ID</span>
              <span>Reg. Date</span>
              <span>Deposited</span>
              <span>Status</span>
            </div>

            {paginatedData.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-4 text-[10px] sm:text-xs font-medium text-center px-4 py-2"
              >
                <span>{item.id}</span>
                <span>{item.date}</span>
                <span>{item.deposited}</span>
                <span>
                  <span
                    className={`
                    text-[10px] sm:text-xs
                    ${
                      item.status === "Active"
                        ? "text-green-600"
                        : "text-red-500"
                    }
                  `}
                  >
                    {item.status}
                  </span>
                </span>
              </div>
            ))}

            <div className="flex justify-between items-center py-6 px-4 text-xs">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="disabled:text-white/30"
              >
                <ChevronLeft className="inline w-4 h-4" /> Prev
              </button>
              <div className="text-white/70">
                Page {page} of {pageCount}
              </div>
              <button
                onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                disabled={page === pageCount}
                className="disabled:text-white/30"
              >
                Next <ChevronRight className="inline w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profit;
