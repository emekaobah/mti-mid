import { authStorage } from "./auth-storage";
import type { AuthenticatedUser } from "./auth-storage";

// Remove hardcoded authentication configuration
export const AUTH_CONFIG = {
  // Set to false to use localStorage instead of hardcoded token
  USE_HARDCODED_TOKEN: false,
};

// Utility function to get the current authentication token
export const getAuthToken = (): string | null => {
  return authStorage.getToken();
};

// Utility function to get user information
export const getCurrentUser = (): AuthenticatedUser | null => {
  return authStorage.getUser();
};

// Utility function to check if user is authenticated
export const isAuthenticated = (): boolean => {
  return authStorage.isAuthenticated();
};

// Utility function to set authentication data
export const setAuthData = (user: AuthenticatedUser) => {
  authStorage.setToken(user.accessToken);
  authStorage.setUser(user);
};

// Utility function to clear authentication data
export const clearAuthData = () => {
  authStorage.clearAuth();
};
