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