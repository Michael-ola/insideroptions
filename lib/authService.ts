import axios from "axios";
import { AUTH_API_URL } from "./constants";
import { SignUpFormData } from "./models";

export const signUp = async (formData: SignUpFormData) => {
  try {
    const response = await axios.post(`${AUTH_API_URL}/register`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: unknown) {
    console.error("Registration error:", error);
    throw error || new Error("Registration failed. Please try again.");
  }
};

export const verifyEmail = async (token: string) => {
  try {
    const response = await axios.get(`${AUTH_API_URL}/verify-email`, {
      params: { token },
    });
    return response.data;
  } catch {
    throw new Error("Error verifying email");
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