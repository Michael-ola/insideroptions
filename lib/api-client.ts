import axios, { InternalAxiosRequestConfig } from "axios";
import { AUTH_ENDPOINTS } from "./constants";

const baseUrl =
  process.env.NEXT_PUBLIC_API_URL || "https://insider-option-api.onrender.com";

export const apiClient = axios.create({
  baseURL: `${baseUrl}/api/v1`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Helper to check if the request is for an auth endpoint
const isAuthRequest = (url?: string): boolean => 
  url ? AUTH_ENDPOINTS.some((endpoint) => url.includes(endpoint)) : false;

apiClient.interceptors.request.use(
  (config) => attachAuthToken(config),
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
);

const attachAuthToken = (config: InternalAxiosRequestConfig<any>): InternalAxiosRequestConfig<any> => {
  if (!isAuthRequest(config.url)) {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return config;
}

export type ApiClient = typeof apiClient;
