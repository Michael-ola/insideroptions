import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { FaFilePdf } from "react-icons/fa";

interface Trade {
  amount: string;
  duration: string;
  interestRate: string;
  maturityDate: string;
  mouLink: string;
}

const tradeData: Trade[] = [
  {
    amount: "$500",
    duration: "30days",
    interestRate: "15%",
    maturityDate: "03-08-2025",
    mouLink: "#",
  },
  {
    amount: "$200",
    duration: "180days",
    interestRate: "22%",
    maturityDate: "03-08-2025",
    mouLink: "#",
  },
];

const ITEMS_PER_PAGE = 5;

export default function AutoTradeHistory() {
  const [page, setPage] = useState(1);

  const pageCount = Math.ceil(tradeData.length / ITEMS_PER_PAGE);
  const visibleData = tradeData.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="bg-[#0f1a17] rounded-2xl py-4 text-white w-full h-[80%] flex flex-col">
      <h2 className="text-center text-primary font-medium text-sm mb-4">
        Auto trade history
      </h2>
      <hr className="text-white/20" />

      <div className="overflow-x-auto px-2">
        <table className="w-full text-[10px] text-left">
          <thead>
            <tr className="text-white/60 font-medium text-right">
              <td className="py-2">Amount</td>
              <td>Duration</td>
              <td>Interest rate%</td>
              <td>Maturity date</td>
              <td>Legal</td>
            </tr>
          </thead>
          <tbody>
            {visibleData.map((trade, i) => (
              <tr key={i} className="text-center">
                <td className="py-4">{trade.amount}</td>
                <td>{trade.duration}</td>
                <td>{trade.interestRate}</td>
                <td>{trade.maturityDate}</td>
                <td>
                  <a
                    href={trade.mouLink}
                    className="bg-red-600 text-[7px] text-white px-[5px] py-1 rounded flex items-center justify-center gap-[5px]"
                  >
                    Download MOU <FaFilePdf size={12} />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
            page !== pageCount && <div className="px-3 py-1 text-lg">...</div>}
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
  );
}
