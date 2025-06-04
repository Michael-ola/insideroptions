import axios from "axios";

export const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/`,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
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
