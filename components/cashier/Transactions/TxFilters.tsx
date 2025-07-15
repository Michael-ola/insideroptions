"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ModalView } from "../cashierModal";
// import { format } from "date-fns";

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
}
const TxFilters = ({ onApply, handleViewChange }: Props) => {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All Types");
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleApply = () => {
    onApply({
      status: selectedStatus,
      category: selectedCategory,
      periodPreset: selectedPreset,
      from: startDate,
      to: endDate,
    });
  };

  return (
    <div className="space-y-6 px-4 py-6">
      {/* Period Presets */}
      <div>
        <p className="text-white/70 text-sm mb-2">Period</p>
        <div className="flex flex-wrap gap-2">
          {periodPresets.map((preset) => (
            <button
              key={preset}
              onClick={() => setSelectedPreset(preset)}
              className={`
                "px-3 py-1 rounded-md border text-sm",
                selectedPreset === preset
                  ? "bg-white text-black"
                  : "border-white/20 text-white/60"
              `}
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Date Range */}
      <div>
        <p className="text-white/70 text-sm mb-2">Select period</p>
        <div className="flex gap-2">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Start date"
            className="bg-white/10 text-white px-3 py-1 rounded-md text-sm w-full"
            dateFormat="dd MMM yyyy"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            placeholderText="End date"
            className="bg-white/10 text-white px-3 py-1 rounded-md text-sm w-full"
            dateFormat="dd MMM yyyy"
          />
        </div>
      </div>

      {/* Status */}
      <div>
        <p className="text-white/70 text-sm mb-2">Status</p>
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`
                "px-3 py-1 rounded-md border text-sm",
                selectedStatus === status
                  ? "bg-white text-black"
                  : "border-white/20 text-white/60"
              `}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Category */}
      <div>
        <p className="text-white/70 text-sm mb-2">Category</p>
        <div className="flex flex-wrap gap-2">
          {categoryOptions.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`
                "px-3 py-1 rounded-md border text-sm",
                selectedCategory === cat
                  ? "bg-white text-black"
                  : "border-white/20 text-white/60"
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Apply Button */}
      <button
        onClick={handleApply}
        className="w-full py-2 bg-primary text-white rounded-md mt-4 disabled:opacity-50"
      >
        Results
      </button>
    </div>
  );
};

export default TxFilters;
