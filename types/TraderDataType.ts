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
  username: string | null;
  phoneNumber: string | null;
  lastLogin: string | null;
  createdAt: string;
  updatedAt: string;
  role: string | null;
  status: string | null;
  refererCode: string;
  refereeCode: string;
  assetManager: string | null;
  addressLine: string | null;
  state: string | null;
  country: string;
  totalReferrals: number | string | null;
  myReferralCode: string | null;
  postalCode: string | null;
  dateOfBirth: string | null;
  emailVerified: "Y" | "N";
  phoneNumberVerified: "Y" | "N";
  nin: string | null;
  taxPayerNumber: string | null;
  bvn: string | null;
  nextOfKinFirstName: string | null;
  nextOfKinLastName: string | null;
  nextOfKinResidentialAddress: string | null;
  nextOfKinPhoneNumber: string | null;
  accounts: Account[];
}
