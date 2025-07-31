"use client";

import React, { useState, useRef, useEffect } from "react";
import Button from "@/components/Button2";

interface TimePickerProps {
  initial?: { hours: number; minutes: number; seconds: number };
  onConfirm: (time: {
    hours: number;
    minutes: number;
    seconds: number;
  }) => void;
}

export default function TimePicker({
  initial = { hours: 0, minutes: 0, seconds: 5 },
  onConfirm,
}: TimePickerProps) {
  const [time, setTime] = useState(initial);
  const wheelsRef = useRef<HTMLDivElement>(null);
  const itemHeight = 40;
  const visibleCount = 5;

  const generateOptions = (count: number, isHours = false) => {
    const options = Array.from({ length: isHours ? 25 : count }, (_, i) => i);
    return [...options, ...options, ...options, ...options];
  };

  const hours = generateOptions(24, true); // 0-24
  const minutes = generateOptions(60);
  const seconds = generateOptions(60);

  const getScrollPosition = (value: number, count: number) => {
    return (
      (value + count * 2) * itemHeight -
      Math.floor(visibleCount / 2) * itemHeight
    );
  };

  const scrollTimeouts = useRef<{ [key: string]: NodeJS.Timeout }>({});

  const handleScroll =
    (type: "hours" | "minutes" | "seconds") => (e: React.UIEvent) => {
      const element = e.target as HTMLDivElement;
      const scrollTop = element.scrollTop;
      const count = type === "hours" ? 25 : 60;
      const middleOffset = Math.floor(visibleCount / 2) * itemHeight;

      clearTimeout(scrollTimeouts.current[type]);

      scrollTimeouts.current[type] = setTimeout(() => {
        const virtualPos = scrollTop + middleOffset;
        const index = Math.round(virtualPos / itemHeight) % count;

        if (type === "hours" && index === 24) {
          setTime({ hours: 24, minutes: 0, seconds: 0 });
          if (wheelsRef.current) {
            const wheels = wheelsRef.current.querySelectorAll(
              'div[class*="overflow-y-auto"]'
            );
            wheels[0].scrollTop = getScrollPosition(24, 25);
            wheels[1].scrollTop = getScrollPosition(0, 60);
            wheels[2].scrollTop = getScrollPosition(0, 60);
          }
          return;
        }

        if (
          type === "seconds" &&
          time.hours === 0 &&
          time.minutes === 0 &&
          index < 5
        ) {
          setTime((prev) => ({ ...prev, seconds: 5 }));
          element.scrollTop = getScrollPosition(5, 60);
          return;
        }

        if (type === "hours") {
          setTime((prev) => ({ ...prev, hours: index }));
        } else {
          setTime((prev) => ({ ...prev, [type]: index }));
        }

        element.scrollTop = getScrollPosition(index, count);
      }, 100);
    };

  useEffect(() => {
    if (wheelsRef.current) {
      const wheels = wheelsRef.current.querySelectorAll(
        'div[class*="overflow-y-auto"]'
      );
      wheels[0].scrollTop = getScrollPosition(time.hours, 25);
      wheels[1].scrollTop = getScrollPosition(time.minutes, 60);
      wheels[2].scrollTop = getScrollPosition(time.seconds, 60);
    }
  }, []);

  useEffect(() => {
    if (
      time.hours === 0 &&
      time.minutes === 0 &&
      time.seconds < 5 &&
      wheelsRef.current
    ) {
      setTime((prev) => ({ ...prev, seconds: 5 }));
      const secondsWheel = wheelsRef.current.querySelectorAll(
        'div[class*="overflow-y-auto"]'
      )[2];
      setTimeout(() => {
        (secondsWheel as HTMLDivElement).scrollTop = getScrollPosition(5, 60);
      }, 0);
    }
  }, [time.hours, time.minutes, time.seconds]);

  const padZero = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="px-0 rounded-lg shadow-md w-full mx-auto cursor-default">
      <div className="flex justify-between mb-1 text-[10px] text-gray-500 capitalize">
        <span className="w-12 text-center border-r">Hours</span>
        <span className="w-12 text-center flex-1">Minutes</span>
        <span className="w-12 border-l text-center pl-2">Seconds</span>
      </div>

      <div
        ref={wheelsRef}
        className="flex justify-between items-center h-48 overflow-hidden relative"
      >
        {/* Hours (0-24) */}
        <div
          className="w-16 h-full z-10 overflow-y-auto snap-y snap-mandatory no-scrollbar"
          onScroll={handleScroll("hours")}
        >
          {hours.map((hour, index) => (
            <div
              key={`hour-${index}`}
              className={`h-10 flex items-center justify-center text-lg ${
                hour === time.hours
                  ? "font-bold text-black dark:text-white"
                  : "text-gray-500"
              }`}
            >
              {padZero(hour)}
            </div>
          ))}
        </div>

        <span className="text-xl z-10 text-gray-800 dark:text-gray-200">:</span>

        {/* Minutes */}
        <div
          className={`w-16 h-full z-10 overflow-y-auto snap-y snap-mandatory no-scrollbar ${
            time.hours === 24 ? "opacity-50 pointer-events-none" : ""
          }`}
          onScroll={handleScroll("minutes")}
        >
          {minutes.map((minute, index) => (
            <div
              key={`minute-${index}`}
              className={`h-10 flex items-center justify-center text-lg ${
                minute === time.minutes
                  ? "font-bold text-black dark:text-white"
                  : "text-gray-500"
              }`}
            >
              {padZero(minute)}
            </div>
          ))}
        </div>

        <span className="text-xl text-gray-800 z-10 dark:text-gray-200">:</span>

        {/* Seconds */}
        <div
          className={`w-16 h-full z-10 overflow-y-auto snap-y snap-mandatory no-scrollbar ${
            time.hours === 24 ? "opacity-50 pointer-events-none" : ""
          }`}
          onScroll={handleScroll("seconds")}
        >
          {seconds.map((second, index) => (
            <div
              key={`second-${index}`}
              className={`h-10 flex items-center justify-center text-lg ${
                second === time.seconds
                  ? "font-bold text-black dark:text-white"
                  : time.hours === 0 && time.minutes === 0 && second < 5
                  ? "text-gray-300 dark:text-zinc-600"
                  : "text-gray-500"
              }`}
            >
              {padZero(second)}
            </div>
          ))}
        </div>

        {/* Highlight overlay */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-10 mt-1 bg-[#10191f] z-5 pointer-events-none" />
      </div>

      <Button
        caret
        onClick={() => onConfirm(time)}
        className="mt-4 w-[calc(100%+32px)] -ml-4 py-2 rounded-md rounded-t-none text-sm font-medium transition-colors"
      >
        Accept
      </Button>
    </div>
  );
}
