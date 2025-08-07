"use client";

import { useEffect, useState } from "react";
import ProfileDetails from "./ProfileDetails";
import EditProfileForm from "./EditProfileForm";
import VerifyAccount from "./VerifyAccount";

interface ProfileModalProps {
  onClose: () => void;
}

export default function ProfileModal({ onClose }: ProfileModalProps) {
  const [modal, setModal] = useState("Profile");

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div className="modal-offset h-[100dvh] max-sm:h-[calc(100dvh-58px)] fixed inset-0 z-50 bg-black/50 flex justify-start">
      <div className="relative h-full max-h-[100dvh] w-[25%] min-w-[359px] max-sm:min-w-full z-40 max-w-md max-sm:w-full max-sm:max-w-full backdrop-blur-sm max-sm:backdrop-blur-none max-sm:bg-[#00040D] border-r border-[#1D3F2F] text-white  pb-6 pt-12 max-sm:pt-3 shadow-xl">
        <div className="relative h-full">
          {modal === "Profile" ? (
            <ProfileDetails setModal={setModal} onClose={onClose} />
          ) : (
            <></>
          )}
          {modal === "Edit Profile" ? (
            <EditProfileForm setModal={setModal} />
          ) : (
            <></>
          )}
          {modal === "Verify Account" ? (
            <VerifyAccount
              kycData={[
                { id: "NIN", title: "NIN", verified: true },
                { id: "ID", title: "ID Document", verified: true },
              ]}
              setModal={setModal}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
