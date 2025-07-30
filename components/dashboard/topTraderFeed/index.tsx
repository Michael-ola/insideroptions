"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useDashboardContext } from "@/context/DashboardContext";
import TRADERS from "@/data/topTraderFeed/traders.json";

export default function TraderActivityCard() {
  const [traders, setTraders] = useState(TRADERS.slice(0, 5));
  const [index, setIndex] = useState(5);
  const { showTraderFeed, setShowTraderFeed } = useDashboardContext();
  useEffect(() => {
    const interval = setInterval(() => {
      const next = TRADERS[index % TRADERS.length];
      setTraders((prev) => [...prev, next]);
      setIndex((i) => i + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [index]);

  const visible = traders.slice(-5);

  return (
    <div
      className={`absolute top-30 z-50 right-12 max-sm:top-auto max-sm:bottom-[23%] max-sm:right-0 max-sm:left-6 w-[180px] max-sm:w-[150px] rounded-xl bg-[#040A14] border border-[#1d232b] p-3 text-white shadow-lg ${
        showTraderFeed ? "block" : "hidden"
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        {/* <h4 className="text-sm font-semibold">Recent Trades</h4> */}
        <X
          onClick={() => setShowTraderFeed(false)}
          className="w-4 h-4 text-white/70 cursor-pointer ml-auto"
        />
      </div>

      <div className="relative h-[230px] overflow-hidden">
        <motion.div layout className="space-y-1.5">
          <AnimatePresence initial={false}>
            {visible.map((trader) => (
              <motion.div
                key={`${trader.name}-${trader.amount}-${trader.type}`}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, margin: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2 py-1 border-b border-white/10"
              >
                <Image
                  src={trader.avatar}
                  alt={trader.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-medium">{trader.name}</span>
                  <span
                    className={`text-[10px] ${
                      trader.type === "BUY" ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {trader.type === "BUY" ? "+" : "-"}${trader.amount}/
                    {trader.type}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
