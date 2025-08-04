import CashierModal from "@/components/cashier/cashierModal";
import PartnerModal from "@/components/partner";
import HelpModal from "@/components/help/HelpModal";
import OrdersHistoryModal from "@/components/dashboard/OrdersHistory";
import ProfileModal from "@/components/dashboard/ProfileModal";
import AutoTradeModal from "@/components/autoTrade/AutoTradeModal";
import { useDashboardContext } from "@/context/DashboardContext";
import AssetManagerModal from "@/components/assetManager/AssetManagerModal";

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
  const { openAutoTrade } = useDashboardContext();

  if (nav === "Orders") {
    return <OrdersHistoryModal onClose={closeModalFunction} />;
  } else if (nav === "Cashier") {
    return <CashierModal onClose={closeModalFunction} />;
  } else if (nav === "Profile") {
    return <ProfileModal onClose={closeModalFunction} />;
  } else if (nav === "Partner") {
    return <PartnerModal onClose={closeModalFunction} />;
  } else if (nav === "Help") {
    return <HelpModal onClose={closeModalFunction} />;
  } else if (nav === "Asset Manager") {
    return <AssetManagerModal onClose={closeModalFunction} />;
  } else if (nav === "Auto trade" && openAutoTrade) {
    return <AutoTradeModal onClose={closeModalFunction} />;
  } else {
    return <></>;
  }
};

export default ModalComponent;
