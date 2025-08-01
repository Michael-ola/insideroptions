export interface Account {
  id: number;
  accountBalance: number;
  profitBalance: number;
  referralBalance: number;
  accountNumber: string;
  accountType: string;
  status: string;
  createdDate: string;
  lastModifiedDate: string;
  traderId: number;
  ttbalance: number;
}

export interface TraderDataType {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  myReferrerCode: string;
  emailVerified: "Y" | "N";
  phoneNumberVerified: "Y" | "N";
  accounts: Account[];
}
