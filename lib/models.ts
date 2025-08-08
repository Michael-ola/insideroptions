export interface SignUpFormData {
  lastName: string;
  firstName: string;
  email: string;
  country: string;
  refererCode?: string;
  password: string;
  terms: boolean;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface PasswordRecoveryPayload {
  email: string;
}

export interface PasswordResetPayload {
  email: string;
  otp: string;
  newPassword: string;
}

export interface signUpResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: string;
  updatedAt: string;  
}

export interface EmailVerificationPayload {
  email: string;
  otp: string;
  legalAgreement: boolean;
}

export type ContactUsFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  message: string;
  recaptchaToken: string;
};

export interface Asset {
  id: number;
  symbol: string;
  assetName: string;
  assetType: string;
  basePrice: number;
  imageUrl: string;
  createdDate: Date;
  lastModifiedDate: Date;
  change: number;
  profit: number;
  status: string;
}

export type PricePoint =
  | { time: number; value: number } // line, area
  | { time: number; open: number; high: number; low: number; close: number }; // candle

export interface PriceHistory {
  open: number;
  high: number;
  low: number;
  close: number;
  assetId: number;
  symbol: string;
  price: number;
  timestamp: string; // ISO date string
}

export enum SeriesType {
  Area = 'area',
  Candles = 'candles',
  Lines = 'lines',
}

export type Candle = {
  time: number;       // UNIX timestamp in seconds (start of candle window)
  open: number;
  high: number;
  low: number;
  close: number;
};

export type Price = {
  price: number;
  timestamp: string;
};
