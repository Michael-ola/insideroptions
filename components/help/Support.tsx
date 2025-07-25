import Image from "next/image";
import customerService from "@/lib/assets/customer-service.png";
import liveChat from "@/lib/assets/live_chat.png";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";

const Support = () => {
  return (
    <div className="w-full h-full px-8 pt-37 space-y-12">
      <div className="flex flex-col gap-12">
        <Image
          src={customerService}
          alt="Suppot Icon"
          priority
          className="mx-auto"
        />
        <div className="flex flex-col gap-2 text-center">
          <h3 className="font-semibold text-base">
            We&apos;re Here to Help 24/7
          </h3>
          <p className="text-sm font-light text-white/60">
            For a quick response, click the Live chat
          </p>
        </div>
        <button className="flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-primary text-base text-black font-semibold">
          Live Chat <Image src={liveChat} alt="live chat" />
        </button>
        <div className="w-full p-6 flex items-center justify-center gap-3">
          <span className="text-sm text-white/60 font-light">Email:</span>
          <div
            onClick={() => {
              navigator.clipboard.writeText("help@eo.support");
              toast.success("Link Copied");
            }}
            className="flex items-center gap-1 text-primary cursor-pointer"
          >
            <span>help@eo.support</span>
            <Icon
              icon="mynaui:copy"
              className="text-primary transition-colors"
              width="24"
              height="24"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
