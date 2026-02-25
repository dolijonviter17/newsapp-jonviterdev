import { EXPO_PUBLIC_API_URL } from "@/utils/constants";
import axios from "axios";
console.log("EXPO_PUBLIC_API_URL", EXPO_PUBLIC_API_URL);

export const apiClient = axios.create({
  baseURL: EXPO_PUBLIC_API_URL, // ganti sesuai backend
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// apiClient.interceptors.request.use(async (config) => {
//   const token = await tokenCache?.getToken("accessToken");
//   if (token) {
//     config.headers.Authorization = `${token}`;
//   }

//   return config;
// });

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized - logout user");
    }
    const message =
      error.response?.data?.error ||
      error.response?.data?.message ||
      "Server error";

    return Promise.reject(new Error(message));
  },
);
