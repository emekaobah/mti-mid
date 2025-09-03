import { authStorage } from "./auth-storage";
import type { AuthenticatedUser } from "./auth-storage";

// Utility function to get the current authentication token
export const getAuthToken = (): string | null => {
  const user = authStorage.getUser();
  return user?.accessToken || null;
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
  // Remove separate token storage - token is now only stored in user object
  authStorage.setUser(user);
};

// Utility function to clear authentication data
export const clearAuthData = () => {
  authStorage.clearAuth();
};
