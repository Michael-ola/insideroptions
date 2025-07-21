export interface DashboardPropsType {
  openGraphStyleModal: boolean;
  setOpenGraphStyleModal: (val: boolean) => void;
  chartStyle: string;
  setChartStyle: (val: string) => void;
  showTraderFeed: boolean;
  setShowTraderFeed: (val: boolean) => void;
  selectedSideNavTab: string;
  setSelectedSideNavTab: (val: string) => void;
  openCashierModal: boolean;
  setOpenCashierModal: (val: boolean) => void;
  selectedAccount: string;
  setSelectedAccount: (val: string) => void;
}
