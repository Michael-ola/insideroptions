import { stats } from "@/lib/constants";
import React from "react";

const Section3 = () => {


  return (
    <section className="relative bg-[#0B0F13] text-white py-20 px-4 text-center overflow-hidden">
      <div className="absolute right-40 top-30 w-[200px] h-[200px] bg-[#79DA7E] opacity-30 blur-[273px] pointer-events-none z-0" />

      <div className="relative max-w-5xl mx-auto space-y-6 z-10">
        <h2 className="text-4xl sm:text-5xl font-light leading-12">
          Trusted{" "}
          <span className="font-bold text-[#99E39E]">Trading Platform</span>
        </h2>
        <p className=" sm:text-base text-gray-400 max-w-xl mx-auto">
          InsiderOption is a leader in the online trading industry. <br />
          We are trusted by more than 50,000 clients.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 pt-10">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-[#0F141A] rounded-xl py-6 px-4 border border-transparent  transition duration-200"
            >
              <div className="text-2xl font-bold text-[#99E39E]">
                {stat.value}
              </div>
              <div className="text-sm text-gray-300 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section3;
