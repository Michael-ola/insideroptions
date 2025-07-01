export interface SignUpFormData {
  lastName: string;
  firstName: string;
  email: string;
  country: string;
  refererCode?: string;
  password: string;
//   terms: boolean;
}

export interface LegalAgreementPayload {
  email: string;
  otp: string;
  legalAgreement: boolean;
}