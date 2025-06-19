import axios from "axios";

const baseUrl =
  process.env.NEXT_PUBLIC_API_URL || "https://insider-option-api.onrender.com";

export const apiClient = axios.create({
  baseURL: `${baseUrl}/api/v1/`,
  // timeout: 5000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// apiClient.interceptors.request.use(
//   (config) => {
//     // Add any request interceptors here if needed
//     return config;
//   },
//   (error) => {
//     // Handle request errors
//     return Promise.reject(error);
//   }
// );
// apiClient.interceptors.response.use(
//   (response) => {
//     // Handle successful responses
//     return response;
//   },
//   (error) => {
//     // Handle response errors
//     return Promise.reject(error);
//   }
// );

export type ApiClient = typeof apiClient;
