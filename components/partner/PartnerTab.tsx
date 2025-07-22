import Page1 from "./Page1";
import Page2 from "./Page2";
import Referral from "./Referral";
import Profit from "./Profit";
import Faq from "./Faq";
import Image from "next/image";
import faq from "@/lib/assets/faq_icon.png";
import white_dollar from "@/lib/assets/white_dollar_icon.png";
import referral from "@/lib/assets/referral_icon.png";

const PartnerTab = ({
  setCanBack,
  handleNewView,
  newView,
}: {
  setCanBack: (val: boolean) => void;
  handleNewView: (val: string) => void;
  newView: string;
}) => {
  const links = [
    { imgSrc: referral, label: "Referral link" },
    { imgSrc: white_dollar, label: "Profit" },
    { imgSrc: faq, label: "FAQ" },
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
        return <Profit />;
      case "FAQ":
        return <Faq />;

      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full pb-8 flex flex-col relative">
      <div className="flex-1 pb-8 overflow-y-auto custom-scrollbar">
        {renderView()}
      </div>
      {newView !== "Page 1" && (
        <div className="sticky bottom-0 left-0 w-full px-10 bg-[#182421] py-6 border-t border-t-primary/20 rounded-bl-2xl rounded-br-2xl">
          <div className="w-full flex items-center justify-between">
            {links.map((link, idx) => (
              <div
                key={idx}
                onClick={() => handleNewView(link.label)}
                className={`flex items-center gap-2 cursor-pointer ${
                  newView === link.label && "text-primary"
                }`}
              >
                <Image src={link.imgSrc} alt={link.label} />{" "}
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
