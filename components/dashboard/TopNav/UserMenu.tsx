"use client";

import Image from "next/image";
import ProfileModal from "@/components/dashboard/ProfileModal";
import { useState } from "react";

export default function UserMenu() {
  const [openProfileModal, setOpenProfileModal] = useState(false);
  return (
    <>
      <div
        onClick={() => setOpenProfileModal(true)}
        className="w-8 h-8 ml-4 rounded-full bg-[#335E35]/20 flex items-center justify-center max-sm:hidden cursor-pointer"
      >
        <Image
          src="/images/user.png"
          width={18}
          height={18}
          className="text-white w-6 h-6"
          alt="User"
        />
      </div>
      {openProfileModal ? (
        <ProfileModal onClose={() => setOpenProfileModal(false)} />
      ) : null}
    </>
  );
}
