"use client";

import clsx from "clsx";
import { useDashboardContext } from "@/context/DashboardContext";
import OrdersHistoryModal from "@/components/dashboard/OrdersHistory";

import TradeIcon from "../icons/tradeIcon";
import OrdersIcon from "../icons/OrdersIcon";
import CashierIcon from "../icons/cashierIcon";
import PartnerIcon from "../icons/partnerIcon";
import HelpIcon from "../icons/helpIcon";
import AssetManagerIcon from "../icons/assetManagerIcon";
import AutoTradeIcon from "../icons/autoTradeIcon";
import LogoutIcon from "../icons/logoutIcon";
import CashierModal from "@/components/cashier/cashierModal";
import PartnerModal from "@/components/partner";
import HelpModal from "@/components/help/HelpModal";

export const navItems = [
  { label: "Trade", icon: TradeIcon },
  { label: "Orders", icon: OrdersIcon },
  { label: "Cashier", icon: CashierIcon },
  { label: "Partner", icon: PartnerIcon },
  { label: "Help", icon: HelpIcon },
  { label: "Asset manager", icon: AssetManagerIcon },
  { label: "Auto trade", icon: AutoTradeIcon },
];

export default function DashboardSidebar() {
  const { selectedSideNavTab, setSelectedSideNavTab } = useDashboardContext();
  return (
    <aside
      style={{
        marginTop: "var(--top-nav-height)",
        height: "calc(100vh - var(--top-nav-height))",
        width: "var(--side-nav-width)",
      }}
      className="fixed top-0 left-0 border-r border-[#071014] z-40 max-sm:!w-full max-sm:!h-[57px] max-sm:static bg-[#01060e] flex flex-col justify-between py-4 pt-[3%] pb-[3%] max-sm:pb-0 max-sm:pt-0 max-sm:!mt-0"
    >
      <div className="flex flex-col  max-sm:flex-row  items-center space-y-1/3 w-full max-sm:space-y-0">
        {navItems.map((item) => {
          const isActive = selectedSideNavTab === item.label;
          const Icon = item.icon;

          const hiddenOnMobile = !["Trade", "Orders", "Auto trade"].includes(
            item.label
          )
            ? "max-sm:hidden"
            : "";

          return (
            <div
              key={item.label}
              onClick={() => {
                setSelectedSideNavTab(item.label);
                console.log(item.label);
              }}
              className={clsx(
                "relative cursor-pointer flex flex-col items-center w-full max-sm:w-1/3 py-3 max-sm:pt-1 max-sm:pb-2 text-[10px] transition-all duration-150",
                isActive
                  ? "text-[#79DA7E] font-medium"
                  : "text-white/80 hover:text-[#79DA7E]",
                hiddenOnMobile,
                item.label === "Orders" && "max-sm:order-1",
                item.label === "Auto trade" && "max-sm:order-3",
                item.label === "Trade" && "max-sm:order-2"
              )}
            >
              {isActive && (
                <>
                  <div className="absolute right-0 top-0 h-full w-[1.6px] max-sm:w-full max-sm:h-[1.3px] bg-[#79DA7E]" />
                  <div className="absolute right-[1.6px] max-sm:right-0 top-0 h-full w-full bg-gradient-to-l max-sm:bg-gradient-to-b from-white to-black opacity-[0.07]" />
                </>
              )}

              <Icon className="w-5 h-5 mb-1 transition-colors duration-150 max-sm:mt-2" />
              <div className="relative">
                <span>{item.label}</span>{" "}
                {item.label === "Orders" && (
                  <div className="absolute text-[9px] font-medium -right-2 -top-1 rounded-full w-3 h-3 flex items-center justify-center bg-[#b3261e]">
                    1
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Logout */}
      <div className="flex flex-col items-center mt-4 max-sm:hidden">
        <button className="flex flex-col items-center text-xs text-red-500 hover:text-red-600 transition-all py-2">
          <LogoutIcon className="w-5 h-5 mb-1" />
          Log out
        </button>
      </div>
      <ModalComponent
        nav={selectedSideNavTab}
        setSelectedSideNavTab={setSelectedSideNavTab}
      />
    </aside>
  );
}

const ModalComponent = ({
  nav,
  setSelectedSideNavTab,
}: {
  nav: string;
  setSelectedSideNavTab: (tab: string) => void;
}) => {
  const closeModalFunction = () => {
    setSelectedSideNavTab("Trade");
  };

  if (nav === "Orders") {
    return <OrdersHistoryModal onClose={closeModalFunction} />;
  } 
  else if (nav === "Cashier") {
    return <CashierModal onClose={closeModalFunction} />;
  } 
  else if (nav === "Partner") {
    return <PartnerModal onClose={closeModalFunction} />;
  } 
  else if (nav === "Help") {
    return <HelpModal onClose={closeModalFunction} />;
  } 
  else {
    return <></>;
  }
};
