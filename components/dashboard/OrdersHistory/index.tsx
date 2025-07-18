import { X, ChevronUp, ChevronDown } from "lucide-react";
import { useEffect } from "react";
import Image from "next/image";
import OrdersIcon from "../icons/OrdersIcon";
import { motion } from "framer-motion";

import ordersData from "@/data/orders/ordersData.json";

export default function OrdersModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const hasData = ordersData.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 left-[100px] bg-black/20 z-50 w-screen h-screen cursor-default max-sm:left-0 max-sm:bg-[#000510] max-sm:h-[calc(100vh-57px)]"
    >
      <div className="absolute top-0 bottom-0 left-0 w-[25%] z-50 flex flex-col backdrop-blur-sm pt-7 max-sm:w-full max-sm:pt-5">
        <div className="flex justify-between items-center px-4 py-3 text-white text-sm pl-8">
          <button onClick={onClose}>
            <Image
              src="/images/left.png"
              alt="Left Arrow"
              width={5}
              height={5}
              className="w-2 h-[14px] text-white"
            />
          </button>
          <OrdersIcon className="w-5 h-5 ml-8 transition-colors duration-150 max-sm:mt-2" />
          <div className="text-lg font-medium mr-auto ml-5">Orders</div>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-white max-sm:hidden" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto text-white px-6 pb-10 mt-4 space-y-5 custom-scrollbar">
          {hasData ? (
            ordersData.map((section, index) => (
              <div key={index}>
                <div className="text-sm text-white/60 mb-2">{section.date}</div>
                {section.items.map((order, i) => (
                  <div
                    key={i}
                    className="border-b border-white/10 py-2 flex items-center justify-between"
                  >
                    {/* Left: Caret + Info */}
                    <div className="flex items-center gap-2">
                      {order.direction === "up" ? (
                        <ChevronUp className="text-green-400 w-6 h-6" />
                      ) : (
                        <ChevronDown className="text-red-400 w-6 h-6" />
                      )}
                      <div className="flex flex-col">
                        <span className="text-md">{order.pair}</span>
                        <span className="text-sm text-white/40">
                          {order.time}
                        </span>
                        {order.assetRate && (
                          <span className="text-[10px] text-white/30">
                            Asset rate: {order.assetRate}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right: Amount + Stake */}
                    <div className="text-right">
                      <div className="text-md">+${order.amount.toFixed(2)}</div>
                      <div className="text-white/40 text-sm">
                        ${order.stake.toFixed(2)}
                      </div>
                    </div>

                    {order.closed && (
                      <div className="ml-2 text-sm pl-7 pr-3 flex flex-col items-end gap-1 justify-center text-left py-1 h-16 bg-[#1c1216] relative -bottom-[9.8px] text-[#fff] border-l-2 border-b-2 border-[#2f2629]">
                        <span>Close</span>
                        <div className="text-green-400 text-sm">
                          ${order.stake.toFixed(2)}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="flex flex-col h-full items-center justify-center gap-2">
              <Image
                src="/images/emptyOrders.png"
                alt="emptyOrders"
                width={72}
                height={72}
                className="w-[72px] h-[72px] text-white mb-6"
              />
              <p className="text-sm text-white/80">Nothing to display yet</p>
              <div
                className="flex items-center justify-center gap-2 cursor-pointer"
                onClick={onClose}
              >
                <span className="text-[#79DA7E]">Place a Trade</span>
                <Image
                  src="/images/right-green.png"
                  alt="Left Arrow"
                  width={5}
                  height={5}
                  className="w-1 h-2"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
