"use client";

import { useEffect, useRef, useState } from "react";
import { X, LockKeyhole } from "lucide-react";
import { Icon } from "@iconify/react";
import { useDashboardContext } from "@/context/DashboardContext";
import TimePicker from "@/components/dashboard/control-panel/ScrollTimePicker";

const durationOptions = [
  "30 sec",
  "1 min",
  "5 min",
  "10 min",
  "15 min",
  "23 hr",
  "2190 hr",
  "4380 hr",
];

function convertLabelToSeconds(label: string): number {
  const [amount, unit] = label.split(" ");
  const num = parseFloat(amount);
  switch (unit) {
    case "sec":
      return num;
    case "min":
      return num * 60;
    case "hr":
      return num * 3600;
    default:
      return 0;
  }
}

export default function TradeDurationCard({
  closeFunction,
}: {
  closeFunction: () => void;
}) {
  const [selectedTab, setSelectedTab] = useState<"Basic" | "Custom">("Basic");
  const cardRef = useRef<HTMLDivElement | null>(null);
  const { tradeDuration, setTradeDuration } = useDashboardContext();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        closeFunction();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (label: string) => {
    const seconds = convertLabelToSeconds(label);
    setTradeDuration(seconds);
    closeFunction();
  };

  const handleCustomConfirm = (customTime: {
    hours: number;
    minutes: number;
    seconds: number;
  }) => {
    const totalSeconds =
      customTime.hours * 3600 + customTime.minutes * 60 + customTime.seconds;
    setTradeDuration(totalSeconds);
    console.log(totalSeconds);
    closeFunction();
  };

  return (
    <div
      className={`absolute max-sm:w-[calc(90vw-24px)] max-sm:flex max-sm:justify-center max-sm:right-auto bottom-[450%] max-sm:bottom-[565%] right-3 w-50 ${
        selectedTab === "Custom" && "bottom-[470%] max-sm:bottom-[598%]"
      }`}
    >
      <div
        ref={cardRef}
        className={`absolute z-50 w-full p-4 rounded-lg bg-[#060f16] max-sm:backdrop-blur-sm max-sm:bg-transparent ${
          selectedTab === "Custom" && "pb-0"
        }`}
      >
        <div className="mb-4 text-white flex justify-center items-center text-sm font-medium cursor-default">
          <span>Trade Duration</span>
          <button onClick={closeFunction} className="ml-auto">
            <X className="w-5 h-5 text-white " />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 mb-4 border-b border-[#2A3545] text-sm font-medium text-white">
          {["Basic", "Custom"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab as "Basic" | "Custom")}
              className={`pb-1 ${
                selectedTab === tab
                  ? "border-b-2 border-green-400 text-white"
                  : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Basic Tab */}
        {selectedTab === "Basic" && (
          <div className="grid grid-cols-2 gap-3">
            {durationOptions.slice(0, 6).map((label) => {
              const seconds = convertLabelToSeconds(label);
              return (
                <button
                  key={label}
                  onClick={() => handleSelect(label)}
                  className={`rounded-lg hover:rounded-xl px-2 py-2 text-sm font-medium transition-colors duration-200 ${
                    tradeDuration === seconds
                      ? "bg-white text-black"
                      : "bg-[#0e181e] text-white hover:bg-[#161f25]"
                  }`}
                >
                  {label}
                </button>
              );
            })}

            {/* Divider */}
            <div className="col-span-2 flex items-center gap-2 py-3">
              <div className="flex-1 h-px bg-[#2A3545]" />
              <LockKeyhole size={12} className="text-gray-500" />
              <span className="text-xs text-gray-400">Auto trade</span>
              <div className="flex-1 h-px bg-[#2A3545]" />
            </div>

            {durationOptions.slice(6).map((label) => {
              const seconds = convertLabelToSeconds(label);
              return (
                <button
                  key={label}
                  onClick={() => handleSelect(label)}
                  className={`relative rounded px-2 py-2 text-sm font-medium transition-colors duration-200 ${
                    tradeDuration === seconds
                      ? "bg-white text-black"
                      : "bg-[#151A27] text-white hover:bg-[#1b2133]"
                  }`}
                >
                  {label}
                  <Icon
                    icon="tdesign:secured"
                    height="12px"
                    className=" text-[#79DA7E] absolute -top-1 right-1.5"
                  />
                </button>
              );
            })}
          </div>
        )}

        {/* Custom Tab */}
        {selectedTab === "Custom" && (
          <TimePicker
            initial={{ hours: 0, minutes: 0, seconds: 5 }} // Starts at 5 seconds when 00:00
            onConfirm={handleCustomConfirm}
          />
        )}
      </div>
    </div>
  );
}
