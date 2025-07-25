"use client";

import React, { useState } from "react";
import { Check, ChevronDown, Upload } from "lucide-react";

const SuggestionForm = () => {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    "Billing and payments",
    "Technical issue",
    "Auto trade",
    "Partner program",
    "Other suggestions",
  ];

  const handleClear = () => {
    setCategory("");
    setTitle("");
    setDescription("");
    setFile(null);
    setAgreed(false);
  };

  return (
    <div className="w-full text-white space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-lg font-semibold">Help us Improve</h2>
        <p className="text-sm text-white/70">
          Send us your suggestions for adding cool and convenient features to
          the referral program. We will review them and implement the most
          interesting ones.
        </p>
      </div>

      {/* Select Category */}
      <div className="relative text-sm text-white">
        <button
          type="button"
          className="w-full bg-[#161a21] rounded-tl-xl rounded-tr-xl border-b border-b-white/10 px-4 py-3 flex justify-between items-center text-left"
          onClick={() => setIsOpen(!isOpen)}
        >
          {category || "Select Category"}
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>

        {isOpen && (
          <ul className="w-[80%] absolute z-10 bg-black border border-white/10 rounded-bl-xl rounded-br-xl max-h-60 overflow-auto">
            {categories.map((label) => (
              <li
                key={label}
                onClick={() => {
                  setCategory(label);
                  setIsOpen(false);
                }}
                className="px-4 py-2 hover:bg-white/10 cursor-pointer text-sm"
              >
                {label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Title */}
      <div>
        <label className="block mb-2 text-sm text-white/80">Title</label>
        <input
          disabled={!category}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          maxLength={256}
          className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-xl text-white outline-none placeholder:text-white/40 focus:border-0 focus:ring-1 focus-within:ring-primary"
        />
        <p className="mt-2 text-xs text-white/40">
          Not more than 256 characters
        </p>
      </div>

      {/* Description */}
      <div>
        <label className="block mb-2 text-sm text-white/80">Description</label>
        <textarea
          disabled={!category}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write something"
          minLength={10}
          rows={2}
          className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-xl text-white outline-none placeholder:text-white/40 focus:border-0 focus:ring-1 focus-within:ring-primary"
        />
        <p className="mt-2 text-xs text-white/40">
          Must be at least 10 characters long
        </p>
      </div>
      <hr className="text-white/10" />
      {/* File Upload */}
      <div className="space-y-2">
        <p className="text-xs text-center font-light text-white/40 mb-2">
          The uploaded file must not exceed 5 MB
        </p>
        <input
          type="file"
          accept="image/*,.pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="w-full cursor-pointer bg-[#79DA7E] text-black text-sm font-medium flex items-center justify-center gap-2 px-4 py-3 rounded-xl hover:bg-gradient-to-tr  from-primary to-[#b4e6b8]"
        >
          <Upload className="w-4 h-4" />
          Upload
        </label>
      </div>

      {/* Terms */}
      <div className="flex items-center gap-3">
        <div
          onClick={() => {
            if (!description && !title && !file) return;
            setAgreed(!agreed);
          }}
          className={`
                    w-4 h-4 rounded-sm border  cursor-pointer flex items-center justify-center transition-colors 
                    ${agreed ? "border-green-500 p-[0.5px]" : "border-gray-400"}
                     `}
        >
          <Check
            className={`w-4 text-green-500 opacity-0  ${
              agreed ? "opacity-100" : ""
            } transition-opacity duration-500`}
          />
        </div>
        <span className="text-xs font-light text-white/60">
          I accept Terms & conditions, Privacy policy
        </span>
      </div>

      <div className="w-full flex items-center gap-2 pb-8">
        <button
          disabled={!agreed}
          onClick={handleClear}
          className="px-6 py-3 w-full text-primary border border-primary rounded-xl bg-transparent text-sm font-semibold"
        >
          Clear
        </button>
        <button className="px-6 py-3 w-full bg-primary text-black text-sm font-semibold rounded-xl">
          Send
        </button>
      </div>
    </div>
  );
};

export default SuggestionForm;
