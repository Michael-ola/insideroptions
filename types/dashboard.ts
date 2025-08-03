import { TraderDataType } from "./TraderDataType";
import { SeriesType } from "@/lib/models";

export interface DashboardPropsType {
  openGraphStyleModal: boolean;
  setOpenGraphStyleModal: (val: boolean) => void;
  chartStyle: SeriesType;
  setChartStyle: (val: SeriesType) => void;
  showTraderFeed: boolean;
  setShowTraderFeed: (val: boolean) => void;
  selectedSideNavTab: string;
  setSelectedSideNavTab: (val: string) => void;
  openCashierModal: boolean;
  setOpenCashierModal: (val: boolean) => void;
  selectedAccount: string;
  setSelectedAccount: (val: string) => void;
  traderData: TraderDataType | null;
  setTraderData: React.Dispatch<React.SetStateAction<TraderDataType | null>>;
  tradeDuration: number;
  setTradeDuration: (val: number) => void;
  selectedBalanceAmount: number;
  setSelectedBalanceAmount: (val: number) => void;
  tradeAmount: number;
  setTradeAmount: (val: number) => void;
  openConfirmation: boolean;
  setOpenConfirmation: (val: boolean) => void;
  openAutoTrade: boolean;
  setOpenAutoTrade: (val: boolean) => void;
  showTradeStatus: boolean;
  setShowTradeStatus: (val: boolean) => void;
  form: boolean;
  setForm: (val: boolean) => void;
  switchAssetManagerModal: boolean;
  setSwitchAssetManagerModal: (val: boolean) => void;
}
