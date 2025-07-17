"use client";

import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ModalView, Transaction } from "../cashierModal";
import { ChevronRight } from "lucide-react";

const statusOptions = ["Confirmed", "Pending", "Canceled"];
const categoryOptions = ["All Types", "Deposit", "Withdrawal", "Swap"];
const periodPresets = [
  "Today",
  "This week",
  "This month",
  "Previous month",
  "This year",
];
interface Props {
  handleViewChange: (view: ModalView) => void;
  onApply: (filters: any) => void;
  transactions: Transaction[];
}
const TxFilters = ({ onApply, handleViewChange, transactions }: Props) => {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (selectedStatus || selectedCategory || (startDate && endDate)) {
        handleApply();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [selectedStatus, selectedCategory, startDate, endDate]);

  const handleApply = () => {
    const filters = {
      status: selectedStatus,
      category: selectedCategory,
      periodPreset: selectedPreset,
      from: startDate,
      to: endDate,
    };

    onApply(filters);
  };

  return (
    <div className="space-y-6 px-4 py-6">
      <div>
        <p className="text-white text-sm mb-2">Period</p>
        <div className="flex flex-wrap gap-3">
          {periodPresets.map((preset) => (
            <button
              key={preset}
              onClick={() => setSelectedPreset(preset)}
              className={`
                px-3 py-2 rounded-md border text-sm
                ${
                  selectedPreset === preset
                    ? "bg-primary text-black"
                    : "border-white/20 text-white/60"
                }
              `}
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-white text-sm mb-2">Select period</p>
        <div className="flex gap-[10px]">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Start date"
            className={`px-3 py-2 rounded-[8px] border text-sm w-full ${
              startDate
                ? "bg-primary text-black"
                : "border-white/20 text-white/60"
            }`}
            dateFormat="dd MMM yyyy"
          />
          <p>-</p>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            placeholderText="End date"
            className={` px-3 py-2 rounded-[8px] border text-sm w-full ${
              endDate
                ? "bg-primary text-black"
                : "border-white/20 text-white/60"
            }`}
            dateFormat="dd MMM yyyy"
          />
        </div>
      </div>

      <div>
        <p className="text-white text-sm mb-2">Status</p>
        <div className="flex flex-wrap gap-3">
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`
                px-3 py-2 rounded-[8px] border text-sm
                ${
                  selectedStatus === status
                    ? "bg-[#306139] text-black"
                    : "border-white/20 text-white/60"
                }
              `}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-white text-sm mb-2">Category</p>
        <div className="flex flex-wrap gap-2">
          {categoryOptions.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`
                px-3 py-2 rounded-[8px] border text-sm
                ${
                  selectedCategory === cat
                    ? "bg-primary text-black"
                    : "border-white/20 text-white/60"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => handleViewChange("Transaction History")}
        disabled={!selectedStatus && !selectedPreset && !startDate && !endDate}
        className={`w-full py-2 rounded-xl mt-4 flex items-center justify-center gap-2 ${
          !selectedStatus && !selectedPreset && !startDate && !endDate
            ? "bg-secondary cursor-not-allowed"
            : "bg-primary cursor-pointer text-black"
        }`}
      >
        {transactions ? `Show Results (${transactions.length})` : "Results"}{" "}
        <ChevronRight className="w-4 h4 text-black" />
      </button>
    </div>
  );
};

export default TxFilters;
