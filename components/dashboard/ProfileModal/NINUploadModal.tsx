"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "@/components/Button2";
import ModalHeader from "@/components/ModalHeader";
import ConfirmModal from "@/components/ConfirmationModal";
import PortalWrapper from "@/components/PortalWrapper";

const NINCardUpload = ({ setModal }: { setModal: (val: string) => void }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  //const [isVerified, setIsVerified] = useState(false);
  const [fileName, setFileName] = useState("");
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const confirmClicked = () => {
    setOpenConfirmation(false);
    setModal("");
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setFileName(file.name);
      //upload logic
    } else {
      setSelectedFile(null);
    }
  };

  const handleUploadClick = () => {
    document.getElementById("fileInput")?.click();
  };

  const handleVerifyClick = () => {
    console.log("Selected file:", selectedFile);
    if (selectedFile) {
      // verify and Upload to storage
      //setIsVerified(true);
      setOpenConfirmation(true);
    }
  };

  const isContinueDisabled = !selectedFile;

  return (
    <div className="w-full h-full">
      <ModalHeader title="Verify Account" onClose={() => setModal("")} />
      <div className="pt-[98px] h-full w-full flex flex-col items-center px-6">
        <h1 className="text-white text-center text-lg font-medium mb-10">
          Kindly upload the front of your <br /> NIN ID card
        </h1>

        <div className="w-full max-w-sm">
          <div
            onClick={handleUploadClick}
            className="bg-[#E8FBEA] hover:bg-[#CFF7D3] cursor-pointer rounded-xl px-6 py-5 flex items-center gap-3 transition"
          >
            <div className="flex items-center justify-center p-4 border-2 border-[#778078] rounded-lg">
              <Icon
                icon="solar:user-id-outline"
                className="text-[#778078] w-6 h-6"
              />
            </div>
            {fileName ? (
              <p className="text-black font-bold text-sm">{fileName}</p>
            ) : (
              <p className="text-black font-bold text-sm">Upload NIN</p>
            )}
            {fileName && (
              <Icon
                icon="lets-icons:check-fill"
                className="text-green-600 w-5 min-w-5 min-h-5 h-5 ml-auto"
              />
            )}
          </div>

          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          <Button
            disabled={isContinueDisabled}
            onClick={handleVerifyClick}
            className={`mt-10 w-full py-3 rounded-lg text-sm font-medium transition ${
              isContinueDisabled
                ? "!bg-white/10 text-white opacity-40 !cursor-not-allowed hover:bg-gradient-to-r hover:from-[white/10] hover:to-[white/10]"
                : ""
            }`}
          >
            Verify
          </Button>
        </div>
      </div>
      {openConfirmation && (
        <PortalWrapper>
          <ConfirmModal
            onConfirm={confirmClicked}
            confirmText="Done"
            icon="flowbite:hourglass-outline"
            title=""
            messageTitle="Review in Progress"
            message="We’re reviewing your ID. This may up to 3 working days. We’ll let you know as soon as we’re done."
          />
        </PortalWrapper>
      )}
    </div>
  );
};

export default NINCardUpload;
