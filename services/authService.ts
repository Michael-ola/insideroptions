import { apiClient } from "../lib/api-client";
import {
  EmailVerificationPayload,
  LoginFormData,
  SignUpFormData,
  signUpResponse,
} from "../lib/models";

export const signUp = (formData: SignUpFormData) =>
  apiClient
    .post<signUpResponse>(`/auth/register`, formData)
    .then((response) => response.data)
    .catch((error) => {
      throw error || new Error("Registration failed. Please try again.");
    });

export const verifyEmail = async (payload: EmailVerificationPayload) =>
  apiClient
    .put<any>(`/auth/verify-email`, payload)
    .then((response) => response.data)
    .catch((error) => {
      throw error || new Error("Email verification failed. Please try again.");
    });

export const login = async (formData: LoginFormData) => {
  try {
    const res = await apiClient.post<any>(`/auth/login`, formData);
    if (res.data && res.data.accessToken) {
      localStorage.setItem("token", res.data.accessToken);
    }
  } catch (error) {
    throw error || new Error("Error logging in");
  }
};

export const logout = async () =>
  apiClient
    .post<any>(`/auth/logout`)
    .then((response) => response.data)
    .catch((error) => {
      throw error || new Error("Error logging out");
    });

export const requestPasswordReset = async (email: string) =>
  apiClient
    .post<any>(`/auth/password-recovery`, { email })
    .then((response) => response.data)
    .catch((error) => {
      throw error || new Error("Error requesting password reset");
    });
