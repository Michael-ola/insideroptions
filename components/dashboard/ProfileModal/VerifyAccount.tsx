"use client";

import React, { useState } from "react";
import ModalHeader from "@/components/ModalHeader";
import { ChevronRight } from "lucide-react";
import Button from "@/components/Button2";
import IDModal from "./NINUploadModal";
import NINUploadModal from "./NINModal";
import { Icon } from "@iconify/react/dist/iconify.js";

interface KYCItem {
  id: string;
  title: string;
  verified: boolean;
}

interface KYCVerificationProps {
  kycData: KYCItem[];
  setModal: (val: string) => void;
}

const VerifyAccount = ({ setModal, kycData }: KYCVerificationProps) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [idModal, setIdModal] = useState("");

  const isContinueDisabled = selected === null;

  const continueClicked = () => {
    if (selected) {
      setIdModal(selected);
      console.log("Continuing with:", selected);
    }
  };

  return (
    <div className="relative h-full w-full">
      {!idModal ? (
        <div className="w-full h-full">
          <ModalHeader
            title="Verify Account"
            onClose={() => setModal("Profile")}
          />

          <div className="pt-[98px] flex flex-col items-center justify-center px-4">
            <h1 className="text-white text-center text-lg font-medium mb-8">
              Provide the following KYC
              <br />
              requirements to enable us
              <br />
              verify your account for limitless
              <br />
              withdrawal
            </h1>

            <div className="space-y-4 w-full max-w-sm">
              {kycData.map((item) => {
                const isSelected = selected === item.id;

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelected(item.id)}
                    className={`rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer transition 
                  ${
                    isSelected
                      ? "bg-[#CFF7D3] border-2 border-[#79da7e]"
                      : "bg-[#E8FBEA] hover:bg-[#CFF7D3]"
                  }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.id === "NIN" ? (
                        <Icon
                          icon="f7:doc-plaintext"
                          className="text-black w-6 h-6"
                        />
                      ) : (
                        <Icon
                          icon="solar:user-id-outline"
                          className="text-[#778078] w-6 h-6"
                        />
                      )}

                      <div>
                        <p className="text-black font-medium text-sm">
                          {item.title}
                        </p>
                        <p className="text-black text-xs opacity-80">
                          {item.verified ? "Verified" : "Pending"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.verified && (
                        <Icon
                          icon="lets-icons:check-fill"
                          className="text-green-600 w-5 h-5"
                        />
                      )}
                      <ChevronRight className="text-black w-5 h-5" />
                    </div>
                  </div>
                );
              })}
            </div>

            <Button
              disabled={isContinueDisabled}
              onClick={continueClicked}
              className={`mt-10 w-full max-w-sm py-3 rounded-lg text-sm font-medium transition ${
                isContinueDisabled
                  ? "!bg-white/10 text-white opacity-40 !cursor-not-allowed hover:bg-gradient-to-r hover:from-[white/10] hover:to-[white/10]"
                  : ""
              }`}
            >
              Continue
            </Button>
          </div>
        </div>
      ) : (
        <></>
      )}
      {idModal && (
        <div className="absolute inset-0 z-40">
          {idModal === "ID" ? <IDModal setModal={setIdModal} /> : <></>}
          {idModal === "NIN" ? <NINUploadModal setModal={setIdModal} /> : <></>}
        </div>
      )}
    </div>
  );
};

export default VerifyAccount;
