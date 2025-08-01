"use client";

import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useState,
} from "react";
import { Check, ChevronDown, Upload } from "lucide-react";
import Image from "next/image";
import { toast } from "react-toastify";

interface Props {
  setIsClear: (val: boolean) => void;
  setIsConfirm: (val: boolean) => void;
}

export interface SuggestionFormRef {
  clearForm: () => void;
  confirmForm: () => void;
}

const SuggestionForm: ForwardRefRenderFunction<SuggestionFormRef, Props> = (
  { setIsClear, setIsConfirm },
  ref
) => {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    fileUrl: "",
  });
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClear = () => {
    formData.category = "";
    formData.title = "";
    formData.description = "";
    formData.fileUrl = "";
    setFile(null);
    setAgreed(false);
  };

  const handleForm = () => {
    console.log("Submit Form: ", formData);
    handleClear();
  };

  useImperativeHandle(ref, () => ({
    clearForm: handleClear,
    confirmForm: handleForm,
  }));

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
          {formData.category || "Select Category"}
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>

        {isOpen && (
          <ul className="w-[80%] absolute z-10 bg-black border border-white/10 rounded-bl-xl rounded-br-xl max-h-60 overflow-auto">
            {categories.map((label) => (
              <li
                key={label}
                onClick={() => {
                  setFormData({ ...formData, ["category"]: label });
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
          name="title"
          disabled={!formData.category}
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          maxLength={100}
          className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-xl text-white outline-none placeholder:text-white/40 focus:border-0 focus:ring-1 focus-within:ring-primary"
        />
        <p className="mt-2 text-xs text-white/40">
          Not more than 100 characters
        </p>
      </div>

      {/* Description */}
      <div>
        <label className="block mb-2 text-sm text-white/80">Description</label>
        <textarea
          name="description"
          disabled={!formData.category}
          value={formData.description}
          onChange={handleChange}
          placeholder="Write something"
          minLength={10}
          maxLength={150}
          rows={2}
          className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-xl text-white outline-none placeholder:text-white/40 focus:border-0 focus:ring-1 focus-within:ring-primary"
        />
        <p className="mt-2 text-xs text-white/40">
          Not more than 150 characters
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
          onChange={(e) => {
            const selected = e.target.files?.[0] || null;
            if (selected) {
              if (selected.size > 5000000) {
                toast.error("File Size is greater than 5Mb");
                return;
              }
              setFile(selected);
              setFormData({
                ...formData,
                ["fileUrl"]: URL.createObjectURL(selected),
              });
            } else {
              console.log("No file selected");
            }
          }}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="w-full cursor-pointer bg-primary text-black text-sm font-medium flex items-center justify-center gap-2 px-4 py-3 rounded-xl hover:bg-gradient-to-tr  from-primary to-[#b4e6b8]"
        >
          <Upload className="w-4 h-4" />
          Upload
        </label>
        {file?.type.startsWith("image/") && formData.fileUrl ? (
          <div className="w-full flex justify-center">
            <Image
              src={formData.fileUrl}
              alt="Image Preview"
              width={200}
              height={200}
              className="rounded-xl"
            />
          </div>
        ) : (
          <div className="text-white/70 text-sm text-center">{file?.name}</div>
        )}
      </div>

      {/* Terms */}
      <div className="flex items-center gap-3">
        <div
          onClick={() => {
            if (!formData.description && !formData.title && !file) return;
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
          onClick={() => setIsClear(true)}
          className="px-6 py-3 w-full text-primary border border-primary rounded-xl bg-transparent text-sm font-semibold"
        >
          Clear
        </button>
        <button
          disabled={!agreed}
          onClick={() => setIsConfirm(true)}
          className="px-6 py-3 w-full bg-primary text-black text-sm font-semibold rounded-xl"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default forwardRef(SuggestionForm);
