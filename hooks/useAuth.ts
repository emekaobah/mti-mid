import { useMemo, useState, useEffect } from "react";
import {
  getCurrentUser,
  isAuthenticated,
  setAuthData,
  clearAuthData,
} from "../lib/auth-config";
import type { AuthenticatedUser } from "../lib/auth-storage";

export const useAuth = () => {
  const [user, setUser] = useState<AuthenticatedUser | null>(getCurrentUser());
  const [authenticated, setAuthenticated] = useState(isAuthenticated());

  const login = (userData: AuthenticatedUser) => {
    setAuthData(userData);
    setUser(userData);
    setAuthenticated(true);
  };

  const logout = () => {
    clearAuthData();
    setUser(null);
    setAuthenticated(false);
  };

  // Sync with localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setUser(getCurrentUser());
      setAuthenticated(isAuthenticated());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return {
    user,
    isAuthenticated: authenticated,
    login,
    logout,
    userEmail: user?.email,
    userId: user?.userId,
    userCountry: user?.country,
  };
};
