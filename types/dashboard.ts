export type SeriesType = 'area' | 'candles' | 'lines';

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
}
