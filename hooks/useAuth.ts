import { useState, useEffect } from "react";
import {
  getCurrentUser,
  isAuthenticated,
  setAuthData,
  clearAuthData,
} from "../lib/auth-config";
import type { AuthenticatedUser } from "../lib/auth-storage";

export const useAuth = () => {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize auth state after component mounts (client-side only)
  useEffect(() => {
    const initAuth = () => {
      const currentUser = getCurrentUser();
      const authStatus = isAuthenticated();

      setUser(currentUser);
      setAuthenticated(authStatus);
      setIsInitialized(true);
    };

    // Only run on client side
    if (typeof window !== "undefined") {
      initAuth();
    }
  }, []);

  const login = (userData: AuthenticatedUser) => {
    // Clear any existing tokens first to prevent multiple valid tokens
    clearAuthData();
    // Then set new token
    setAuthData(userData);
    setUser(userData);
    setAuthenticated(true);
  };

  const logout = () => {
    clearAuthData();
    setUser(null);
    setAuthenticated(false);
  };

  // Check if user already has a valid token to prevent re-authentication
  const hasValidToken = (): boolean => {
    const currentUser = getCurrentUser();
    return !!currentUser?.accessToken;
  };

  // Sync with localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const newUser = getCurrentUser();
      const newAuthStatus = isAuthenticated();

      setUser(newUser);
      setAuthenticated(newAuthStatus);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return {
    user,
    isAuthenticated: authenticated,
    isInitialized,
    login,
    logout,
    hasValidToken,
    userEmail: user?.email,
    userId: user?.userId,
    userCountry: user?.country,
  };
};
