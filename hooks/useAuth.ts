import { useMemo } from "react";
import {
  getCurrentUser,
  isAuthenticated,
  AUTH_CONFIG,
} from "../lib/auth-config";

export const useAuth = () => {
  const user = useMemo(() => getCurrentUser(), []);
  const authenticated = useMemo(() => isAuthenticated(), []);

  return {
    user,
    isAuthenticated: authenticated,
    isUsingHardcodedToken: AUTH_CONFIG.USE_HARDCODED_TOKEN,
    // Helper method to get user email
    userEmail: user?.email,
    // Helper method to get user ID
    userId: user?.userId,
    // Helper method to get user country
    userCountry: user?.country,
  };
};
