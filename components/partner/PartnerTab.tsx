import Page1 from "./Page1";
import Page2 from "./Page2";
import Referral from "./Referral";
import Profit from "./Profit";
import Faq from "./Faq";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";
import { useDashboardContext } from "@/context/DashboardContext";

type ReferralData = {
  id: string;
  date: string;
  deposited: number;
  status: string;
};
type ReferralBonusData = {
  id: string;
  date: string;
  referred: string;
  amount: number;
  status: string;
};
export type ReferralDetails = {
  data: ReferralData[];
  totalCount: number;
  page: number;
  size: number;
  totalPages: number;
};
export type ReferralBonus = {
  data: ReferralBonusData[];
  totalCount: number;
  page: number;
  size: number;
  totalPages: number;
};

const PartnerTab = ({
  setCanBack,
  handleNewView,
  newView,
}: {
  setCanBack: (val: boolean) => void;
  handleNewView: (val: string) => void;
  newView: string;
}) => {
  const { traderData } = useDashboardContext();
  const [referralDetails, setReferralDetails] =
    useState<ReferralDetails | null>(null);
  const [bonusDetails, setBonusDetails] = useState<ReferralBonus | null>(null);
  useEffect(() => {
    getReferralDetails();
    getBonusDetails();
  }, []);

  const handlePageChange = (page: number) => {
    getReferralDetails(page);
    getBonusDetails(page);
  };
  const getReferralDetails = async (page = 1) => {
    try {
      const res = await apiClient.get(`traders/${traderData?.id}?page=${page}`);
      setReferralDetails(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getBonusDetails = async (page = 1) => {
    try {
      const res = await apiClient.get(
        `referral-rewards/${traderData?.id}?page=${page}`
      );
      setBonusDetails(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const links = [
    { imgSrc: "humbleicons:link", label: "Referral link" },
    { imgSrc: "mdi:dollar", label: "Profit" },
    { imgSrc: "streamline:help-chat-2", label: "FAQ" },
  ];

  const renderView = () => {
    switch (newView) {
      case "Page 1":
        return (
          <Page1 handleViewChange={handleNewView} setCanBack={setCanBack} />
        );
      case "Page 2":
        return <Page2 />;
      case "Referral link":
        return <Referral />;
      case "Profit":
        return (
          <Profit
            handleNewView={handleNewView}
            referralDetails={referralDetails}
            bonusDetails={bonusDetails}
            handlePageChange={handlePageChange}
          />
        );
      case "FAQ":
        return <Faq />;

      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full pb-8 flex flex-col relative">
      {newView !== "Page 1" && (
        <div className="sticky left-0 top-0 z-50 sm:hidden w-full px-10 bg-[#182421] py-6 border-b border-b-primary/20  mb-4">
          <div className="w-full flex items-center justify-between">
            {links.map((link, idx) => (
              <div
                key={idx}
                onClick={() => handleNewView(link.label)}
                className={`flex items-center gap-2 cursor-pointer ${
                  newView === link.label && "text-primary"
                }`}
              >
                <Icon icon={link.imgSrc} width="24" height="24" />
                <span className="font-medium text-xs whitespace-nowrap">
                  {link.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex-1 pb-8 pt-8 sm:pt-0 overflow-y-auto custom-scrollbar">
        {renderView()}
      </div>
      {newView !== "Page 1" && (
        <div className="sticky left-0 bottom-0 max-sm:hidden w-full px-10 bg-[#182421] py-6 border-t border-t-primary/20 rounded-bl-2xl rounded-br-2xl">
          <div className="w-full flex items-center justify-between">
            {links.map((link, idx) => (
              <div
                key={idx}
                onClick={() => handleNewView(link.label)}
                className={`flex items-center gap-2 cursor-pointer hover:text-primary ${
                  newView === link.label && "text-primary"
                }`}
              >
                <Icon icon={link.imgSrc} width="24" height="24" />
                <span className="font-medium text-xs whitespace-nowrap">
                  {link.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnerTab;
