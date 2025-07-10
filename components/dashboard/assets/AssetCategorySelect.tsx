"use client";

import { useState, useRef, useEffect } from "react";

interface Option {
  value: string;
  label: string;
}

interface AssetCategorySelectProps {
  value: string;
  options: Option[];
  onChange: (val: string) => void;
}

export default function AssetCategorySelect({
  value,
  options,
  onChange,
}: AssetCategorySelectProps) {
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) =>
      boxRef.current &&
      !boxRef.current.contains(e.target as Node) &&
      setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  const selected = options.find((o) => o.value === value)?.label ?? "";

  return (
    <div ref={boxRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full bg-[#161B22] h-9 rounded-lg px-3 pr-9 text-left text-neutral-300
                   flex items-center justify-between
                   outline-non cursor-pointer border-b border-gray-500 rounded-b-none"
      >
        <span className="truncate">{selected}</span>
        <span className="absolute right-3 text-neutral-400 pointer-events-none">
          {open ? "▴" : "▾"}
        </span>
      </button>

      {open && (
        <ul
          className="absolute z-50 mt-1 w-full max-h-48 overflow-auto rounded-lg
                     shadow-lg ring-1 ring-black/20 "
        >
          <div className="absolute inset-0 -z-10">
            <div className="bg-[#050d15] h-[75%]" />
            <div className="h-[25%] backdrop-blur-sm" />
          </div>
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`px-3 py-2 cursor-pointer hover:bg-white/10 ${
                opt.value === value ? "text-white" : "text-neutral-300"
              }`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
