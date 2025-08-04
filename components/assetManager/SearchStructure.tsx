"use client";
import { Search } from "lucide-react";
import { useState } from "react";
import TraderDetailsModal from "./TradingHistory";

const dummyResults = [
  "Prince James",
  "Prince Jeremiah",
  "Prince EkemeFuna",
  "Prince Maxwell",
  "Prince McDonald",
];

export default function SearchStructure({
  handleViewChange,
}: {
  handleViewChange: (val: string) => void;
}) {
  const [openTraderModal, setOpenTraderModal] = useState<boolean>(false);
  const [query, setQuery] = useState("");
  const filteredResults = dummyResults.filter((name) =>
    name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-full h-full bg-[#0b0f12] text-white flex flex-col items-center justify-center px-8 py-30">
      <div>
        <h1 className="text-5xl font-bold text-center">
          Welcome to <br />
          <span className="text-white">Structure Search</span>
        </h1>
        <p className="text-base text-white/60 mt-3 text-center max-w-md">
          This tool enables you as an Asset manager find any trader in your
          multi level structure.
        </p>

        <div className="relative w-full max-w-xl mt-10">
          <div className="flex items-center bg-[#272d33] rounded-full px-6 py-3">
            <Search className="w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Prince"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="ml-3 w-full bg-transparent outline-none placeholder:text-white/40 text-white"
            />
          </div>

          {query && (
            <ul className="bg-[#272d33] w-[90%] mx-auto rounded-br-xl rounded-bl-xl max-h-60 overflow-y-auto custom-scrollbar">
              {filteredResults.map((name, index) => (
                <li
                  key={index}
                  onClick={() => setOpenTraderModal(true)}
                  className="flex justify-between items-center px-6 py-3 text-sm hover:bg-white/5 cursor-pointer"
                >
                  <span>{name}</span>
                  <button className="text-white text-xs">View Ticket</button>
                </li>
              ))}
              {filteredResults.length === 0 && (
                <li className="px-6 py-3 text-white/60 text-sm">
                  No results found
                </li>
              )}
            </ul>
          )}
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
}
