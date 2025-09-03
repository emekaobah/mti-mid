import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { getAuthToken } from "./auth-config";

// Create client-side axios instance
const axiosClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 20000,
});

axiosClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = getAuthToken();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    // Log full error for debugging
    const message = error?.response?.statusText || error?.message;
    const status = error?.response?.status;

    console.error("[Axios Client Error]", message);

    // Handle 401 Unauthorized errors centrally
    if (status === 401) {
      // Token expired or invalid, clear auth data
      import("./auth-config").then(({ clearAuthData }) => {
        clearAuthData();

        // Redirect to home page if on a protected route
        if (typeof window !== "undefined" && window.location.pathname !== "/") {
          window.location.href = "/";
        }
      });
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
