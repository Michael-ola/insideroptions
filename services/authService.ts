import axios from "axios";
import { AUTH_API_URL } from "../lib/constants";
import { EmailVerificationPayload, SignUpFormData } from "../lib/models";

export const signUp = async (formData: SignUpFormData) => {
  try {
    const response = await axios.post(`${AUTH_API_URL}/register`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error || new Error("Registration failed. Please try again.");
  }
};

export const verifyEmail = async (payload: EmailVerificationPayload) => {
  try {
    const response = await axios.put(`${AUTH_API_URL}/verify-email`, payload);
    return response.data;
  } catch (error) {
    throw error || new Error("Error verifying email");
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${AUTH_API_URL}/login`, { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch {
    throw new Error("Error logging in");
  }
};