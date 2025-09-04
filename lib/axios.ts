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
    const message = error?.response?.statusText || error?.message;
    const status = error?.response?.status;

    console.error("[Axios Client Error]", message);

    if (status === 401) {
      // Clear auth data and redirect to login
      import("./auth-config").then(({ clearAuthData }) => {
        clearAuthData();

        // Redirect to login page if on a protected route
        if (
          typeof window !== "undefined" &&
          window.location.pathname !== "/login"
        ) {
          window.location.href = "/login";
        }
      });
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
