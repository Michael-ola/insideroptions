"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import clsx from "clsx";
import { useDashboardContext } from "@/context/DashboardContext";
import Button from "@/components/Button2";
import {SeriesType} from "@/lib/models";
import { isCSSVariableToken } from "framer-motion";

const styles = [
  {
    id: "area",
    label: "Area",
    icon: "/images/areaChart.png",
    darkIcon: "/images/darkAreaChart.png",
  },
  {
    id: "candles",
    label: "Candles",
    icon: "/images/candleChart.png",
    darkIcon: "/images/darkCandleChart.png",
  },
  {
    id: "lines",
    label: "Lines",
    icon: "/images/lineChart.png",
    darkIcon: "/images/darkLineIcon.png",
  },
];

const candlesTime = [
  {id:'1',
  time: '5s'
  },
  {id:'2',
  time: '10s'
  },
  {id:'3',
  time: '15s'
  },
]

export default function GraphStyleModal() {
  const {
    openGraphStyleModal,
    setOpenGraphStyleModal,
    chartStyle,
    setChartStyle,
  } = useDashboardContext();
  const [selected, setSelected] = useState(chartStyle ?? "lines");

  // useEffect(() => {
  //   console.log("chartStyle updated:", chartStyle);
  // }, [chartStyle]);

  const handleConfirm = () => {
    setChartStyle(selected);
    setOpenGraphStyleModal(false)
  };
  const isCandle = selected === "candles"
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 ${
        openGraphStyleModal ? "flex" : "hidden"
      }`}
      onClick={() => setOpenGraphStyleModal(false)}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-[##030910]/80 backdrop-blur-lg border max-sm:w-[90%] border-[#223f2c] p-6 text-white shadow-xl max-sm:relative max-sm:-bottom-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setOpenGraphStyleModal(false)}
          className="absolute top-6 right-6 text-neutral-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-center text-xl font-semibold mb-6">Graph Style</h2>

        <div className="flex flex-col items-center mx-auto mt-[17%] w-[312px] max-sm:w-[90%] max-sm:mt-[25%]">
          <div className="flex justify-between gap-4 mb-6 max-sm:flex-col max-sm:w-full">
            {styles.map((style) => {
              const isSelected = selected === style.id;
              return (
                <button
                  key={style.id}
                  onClick={() => setSelected(style.id as SeriesType)}
                  className={clsx(
                    "w-24 h-32 max-sm:w-full max-sm:h-16 flex flex-col items-center justify-center rounded-xl border border-[#1F2A32] px-2 py-3 transition backdrop-blur-md max-sm:flex-row max-sm:gap-3",
                    {
                      "bg-[#79DA7E] text-black": isSelected,
                      "bg-[#141b23]/50 text-white hover:bg-[#1f2a32]/60":
                        !isSelected,
                    }
                  )}
                >
                  <Image
                    src={isSelected ? style.darkIcon : style.icon}
                    alt={style.label}
                    width={32}
                    height={32}
                    className="mb-2"
                  />
                  <span className="text-sm font-medium">{style.label}</span>
                </button> 
            );
            })}
          </div>
          {
              selected === "candles" && (
                <div className="flex">
                  {
                    candlesTime.map((time)=>(
                      <button className={`bg-[#79DA7E] p-4 mb-2 text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-[#79DA7E] hover:to-[#b3ffb8] hover:text-black ${time.id ==='1'?'rounded-l-[12px]':time.id === '3'?'rounded-r-[12px]':'' }`}>{time.time}</button>
                    ))
                  }
                  
                </div>
              )
            }
            
          <p className="text-xs text-center text-neutral-400 mb-4">
            InsiderOption LLC Provide different graph style to help you buy and
            sell better
          </p>
          <button 
          disabled = {isCandle}
          className={`w-full mt-[8%] mb-[8%] max-sm:mb-[16%] flex items-center justify-center gap-4 bg-[#99E39E] text-black w-[148px] h-[44px] rounded-[12px] ${isCandle?"bg-gray-400 text-gray-200 cursor-not-allowed":"transition-all duration-300 hover:bg-gradient-to-r hover:from-[#99E39E] hover:to-[#b3ffb8] cursor-pointer"}`}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
