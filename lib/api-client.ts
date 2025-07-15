import axios, { InternalAxiosRequestConfig } from "axios";
import { AUTH_ENDPOINTS } from "./constants";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";

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
  (response) => response,
  async (error) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(
          `${baseUrl}/api/v1/auth/refresh-token`,
          {},
          { withCredentials: true }
        );
        const newToken = res.data.accessToken;
        localStorage.setItem("token", newToken);
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    Promise.reject(error);
  }
);

const attachAuthToken = (
  config: InternalAxiosRequestConfig<any>
): InternalAxiosRequestConfig<any> => {
  if (!isAuthRequest(config.url)) {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return config;
};

export type ApiClient = typeof apiClient;
