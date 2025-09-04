import { jwtDecode } from "jwt-decode";

export const AUTH_STORAGE_KEYS = {
  USER: "auth_user",
} as const;

export interface AuthenticatedUser {
  email: string;
  userId: string;
  country: string;
  accessToken: string;
}

export const authStorage = {
  setUser: (user: AuthenticatedUser) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_STORAGE_KEYS.USER, JSON.stringify(user));
    }
  },

  getUser: (): AuthenticatedUser | null => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem(AUTH_STORAGE_KEYS.USER);
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  },

  clearAuth: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(AUTH_STORAGE_KEYS.USER);
    }
  },

  isAuthenticated: (): boolean => {
    const user = authStorage.getUser();
    if (!user?.accessToken) return false;

    // Check if token is expired
    try {
      const decoded = jwtDecode<{ exp: number }>(user.accessToken);
      const currentTime = Date.now() / 1000;
      const isExpired = decoded.exp < currentTime;

      if (isExpired) {
        console.log("Token expired, clearing auth data");
        authStorage.clearAuth();
      }

      return !isExpired;
    } catch (error) {
      console.error("Token decode error:", error);
      authStorage.clearAuth(); // Clear invalid token
      return false;
    }
  },
};
