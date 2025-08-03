import Image from "next/image";
import React from "react";
import avatar from "@/lib/assets/aM_avatar.png";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useDashboardContext } from "@/context/DashboardContext";
import { toast } from "react-toastify";

const AssetManager = () => {
  const { setSwitchAssetManagerModal } = useDashboardContext();
  return (
    <div className="w-full h-full px-8 pt-6 space-y-9 overflow-y-auto custom-scrollbar">
      <section className="px-8 flex items-center gap-6">
        <Image src={avatar} alt="aM profile" />
        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold">Jessi Christopher</p>
          <span className="text-white/60 text-sm">Asset Manager</span>
        </div>
      </section>
      <section className="space-y-3">
        <div className="bg-transparent">
          <div className="bg-primary/5 p-6 rounded-xl border border-white/3  flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Icon
                icon="ri:whatsapp-fill"
                width="24"
                height="24"
                className="text-primary"
              />
              <div className="flex-1 flex items-center justify-between">
                <span>0904 546 3234</span>
                <Icon
                  onClick={() => {
                    navigator.clipboard.writeText("0904 546 3234");
                    toast.info("WhatsApp number copied");
                  }}
                  icon="mynaui:copy"
                  width="24"
                  height="24"
                  className="text-primary"
                />
              </div>
            </div>
            <hr className="text-white/15" />
            <div className="text-white/60">
              <p className="text-xs">Assigned date:</p>
              <p className="text-sm">18th Apr 2025</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2.5 text-[#ed443e]">
          <Icon
            icon="material-symbols:warning-outline-rounded"
            width="24"
            height="24"
          />
          <span className="text-xs">
            Do not share your login details with anyone including your Asset
            Manager
          </span>
        </div>
        <div className="py-6 space-y-3">
          <p className="text-sm text-white/60">
            Dear Prince, this is your personal assigned Asset Manager. You can
            reach him on whatsapp
          </p>
          <hr className="text-white/15" />
          <div className="flex items-center gap-2.5 text-white/60">
            <Icon icon="gridicons:notice-outline" width="24" height="24" />
            <span className="text-xs">
              If another manager tries to contact you on our behalf, ignore
              them.
            </span>
          </div>
        </div>
      </section>
      <div className="pb-8 pt-12">
        <button
          onClick={() => setSwitchAssetManagerModal(true)}
          className="w-full px-6 py-3 rounded-xl bg-primary cursor-pointer text-black text-sm hover:bg-gradient-to-r hover:from-[#99E39E] hover:to-[#b3ffb8] transition-all duration-300"
        >
          Asset Manager Center
        </button>
      </div>
    </div>
  );
};

export default AssetManager;
