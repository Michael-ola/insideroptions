"use client";

import { useDashboardContext } from "@/context/DashboardContext";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const DownlineComplains = ({
  handleViewChange,
}: {
  handleViewChange: (val: string) => void;
}) => {
  const { setSwitchAssetManagerModal } = useDashboardContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    downlineName: "Prince Maxwell",
    email: "Princemax222@gmail.com",
    title: "",
    category: "",
    message: "",
    file: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  const handleCategoryChange = (category: string) => {
    setFormData({ ...formData, category });
  };

  const handleSubmit = () => {
    console.log(formData);
    toast.success("Downline Ticket Submitted");
    setSwitchAssetManagerModal(true);
    handleViewChange("Asset Manager");
  };
  return (
    <div className="w-full max-w-[80%] bg-[#79DA7E]/10 mx-auto h-[90%] px-8 pt-4 space-y-6 rounded-xl mb-8 overflow-y-auto custom-scrollbar">
      <div className="w-full h-full flex flex-col gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm block mb-1 text-white">
              Downline Name
            </label>
            <input
              disabled
              value={formData.downlineName}
              className="w-full bg-transparent border border-white/10 px-4 py-2 rounded-xl text-sm text-white/60"
            />
          </div>

          <div>
            <label className="text-sm block mb-1">Email Address</label>
            <input
              disabled
              value={formData.email}
              className="w-full bg-transparent border border-white/10 text-white/60 px-4 py-2 rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="text-sm block mb-1">Reason for a ticket</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full bg-transparent border border-white/10 px-4 py-2 rounded-xl text-sm outline-none focus:border-0 focus:ring-1 focus-within:ring-primary"
            />
          </div>

          <div>
            <label className="text-sm block mb-1">Category</label>

            <div className="w-[30%] relative text-sm text-white">
              <button
                type="button"
                className="w-full bg-[#161a21] rounded-tl-xl rounded-tr-xl border-b border-b-white/10 px-4 py-3 flex justify-between items-center text-left"
                onClick={() => setIsOpen(!isOpen)}
              >
                {formData.category || "Select Category"}
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {isOpen && (
                <ul className="w-[80%] absolute z-10 bg-black/80 border border-white/10 rounded-bl-xl rounded-br-xl max-h-60 overflow-y-auto custom-scrollbar">
                  {["Deposit", "Transfer"].map((label) => (
                    <li
                      key={label}
                      onClick={() => {
                        handleCategoryChange(label);
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
          </div>

          <div>
            <label className="text-sm block mb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={2}
              placeholder="Write something"
              className="w-full bg-transparent border border-white/10 px-4 py-2 rounded-xl text-sm outline-none focus:border-0 focus:ring-1 focus-within:ring-primary"
            />
            <p className="text-xs text-white/60 mt-1">
              Must be at least 10 characters long
            </p>
          </div>

          <div className="flex flex-col gap-2 w-[40%]">
            <label className="text-sm block">Attachments</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-white/60 file:bg-[#B3B3B3] file:border-0 file:px-6 file:py-3 file:rounded-xl file:text-black file:cursor-pointer"
            />
            <p className="text-xs text-white/60">
              Allowed File Extensions: .jpg, .gif, .jpeg, .png, .zip, .pdf,
              .xls, .docx, .txt
            </p>
          </div>
        </div>
        <div className="w-[50%] flex items-center gap-3 pb-4 mt-auto">
          <button
            onClick={() => handleViewChange("Asset Manager")}
            className="w-full px-6 py-3 border border-[#79DA7E] text-primary rounded-xl hover:bg-primary/5"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!formData.title || !formData.message}
            className="w-full px-6 py-3 bg-primary text-black rounded-xl hover:bg-[#aaf0ac]"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownlineComplains;
