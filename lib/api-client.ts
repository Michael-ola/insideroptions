import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
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
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    console.log("Interceptor caught error", error);
    return error.response?.status === 401 &&
      !originalRequest._retry && window !== undefined ?
      handle401Error(originalRequest) : Promise.reject(error);
  }
);

const handle401Error = async (originalRequest: InternalAxiosRequestConfig & { _retry?: boolean }) => {
  originalRequest._retry = true;
  return apiClient.post(`/auth/refresh-token`)
    .then((res) => {
      const newToken = res.data.accessToken;
      localStorage.setItem("token", newToken);
      originalRequest.headers.set("Authorization", `Bearer ${newToken}`);
      return apiClient(originalRequest);
    }).catch((refreshError) => {
      localStorage.removeItem("token");
      window.location.href = "/login";
      return Promise.reject(refreshError);
    });
};

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
