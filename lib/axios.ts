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
  // Remove https.Agent as it's Node.js specific and not needed in browser
});

axiosClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = getAuthToken();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("[Client Axios] Token attached to request");
    }
    return config;
  }
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    // Log full error for debugging
    console.log("[Full Axios Error]", error);
    const message = error?.response?.statusText || error?.message;
    const status = error?.response?.status;

    console.error("[Axios Client Error]", message);

    // Handle 401 Unauthorized errors centrally
    if (status === 401) {
      console.log("[Auth Error] 401 Unauthorized - redirecting to login");

      // Clear authentication data
      // if (typeof window !== "undefined") {
      //   localStorage.removeItem("token");
      //   localStorage.removeItem("user");

      //    Redirect to login page immediately
      //    window.location.replace("/");

      //   // Return a rejected promise with a clear auth error
      //   return Promise.reject(new Error("UNAUTHORIZED_REDIRECT"));
      // }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
