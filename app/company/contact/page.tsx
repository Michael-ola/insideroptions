"use client";
import CashierModal from "@/components/cashier/deposit/cashierModal";
import { ChevronRight, LucideMessageCircleMore, Mail } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const Page = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <main className="min-h-screen bg-[#00050f] pt-[5%]">
      <CashierModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />
      <section className="px-6 sm:px-16 py-20 bg-[#070c17] text-white">
        <div className="max-w-7xl mx-auto bg-[#070c17] px-16 flex flex-col md:flex-row gap-10">
          <div className="md:w-1/3 md:space-y-12">
            <h2 className="sm:text-5xl text-2xl font-medium text-center sm:text-left sm:font-semibold">
              Contact Us
            </h2>
            <div className="py-6 flex flex-row items-center justify-center gap-6 sm:flex-col sm:items-start">
              <div className="flex items-center gap-3 text-sm text-white">
                <LucideMessageCircleMore className="text-[#79DA7E]" />
                <span>Live chat</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white">
                <Mail className="text-[#79DA7E]" /> <span>help@eo.support</span>
              </div>
            </div>
          </div>

          <form className="md:w-2/3 bg-[#0d121c] p-6 text-sm border-1 border-gray-50/15 rounded-xl">
            <div className="flex flex-col sm:flex-row gap-12">
              <div className="w-full space-y-8">
                <div>
                  <label className="block mb-1">First name</label>
                  <input
                    type="text"
                    placeholder="First name"
                    className="w-full bg-transparent border border-gray-700 px-3 py-2 outline-none rounded-xl"
                  />
                </div>

                <div>
                  <label className="block mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full bg-transparent border border-gray-700 rounded-xl px-3 py-2 outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-1">Phone number</label>
                  <input
                    type="tel"
                    placeholder="Phone number"
                    className="w-full bg-transparent border border-gray-700 rounded-xl px-3 py-2 outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-1">Last name</label>
                  <input
                    type="text"
                    placeholder="Last name"
                    className="w-full bg-transparent border border-gray-700 rounded-xl px-3 py-2 outline-none"
                  />
                </div>
              </div>

              <div className="w-full space-y-8">
                <div className="md:row-span-3">
                  <label className="block mb-1">Message</label>
                  <textarea
                    placeholder="Enter your message"
                    rows={6}
                    className="w-full bg-transparent border border-gray-700 rounded-xl px-3 py-2 outline-none"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="button"
                    className="bg-[#79DA7E] text-black px-10 py-3 rounded-xl"
                    onClick={() => setIsOpen(true)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      <section className="px-6 sm:px-16 py-18 bg-[#00050f]">
        <div className="mx-auto p-16 max-w-7xl">
          <div className="bg-gradient-to-r from-[#070d17] to-[#0d121c] bg-no-repeat flex flex-col sm:flex-row gap-6 sm:gap-0 justify-between items-center p-6 sm:p-13 border-1 border-gray-50/15 rounded-xl">
            <h3 className="w-full whitespace-nowrap text-white text-lg md:text-xl font-medium">
              Frequently Asked Questions
            </h3>
            <Link
              href="/trading/faq"
              className="bg-[#79DA7E] text-black px-6 py-3 rounded-md text-sm flex items-center gap-3"
            >
              <span className="whitespace-nowrap">View All</span>
              <ChevronRight />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
