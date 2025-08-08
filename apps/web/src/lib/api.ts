import axios from "axios";
import { toast } from "sonner";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL as string,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // You can add any request interceptors here if needed
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  },
);

let isSessionExpired = false;

axiosInstance.interceptors.response.use(
  (response) => {
    // You can add any response interceptors here if needed
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401 && !isSessionExpired) {
      isSessionExpired = true;
      toast.error("Session expired, please log in again.");
      // Handle session expiration, e.g., redirect to login or refresh token
      console.error("Session expired, redirecting to login...");
      // Redirect logic or token refresh logic can be added here
      setTimeout(() => {
        window.location.reload();
      }, 2000); // Reload the page after 2 seconds
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
