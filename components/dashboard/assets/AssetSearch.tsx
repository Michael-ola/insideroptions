"use client";

interface AssetSearchProps {
  value: string;
  onChange: (val: string) => void;
}

export default function AssetSearch({ value, onChange }: AssetSearchProps) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#161B22] placeholder-neutral-500 text-neutral-200
                   h-9 rounded-lg pl-9 pr-3 outline-none
                   focus:ring-1 focus:ring-green-600/60"
      />
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path d="m21 21-4.35-4.35" strokeLinecap="round" />
        <circle cx="11" cy="11" r="7" />
      </svg>
    </div>
  );
}
