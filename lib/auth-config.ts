// Authentication configuration for prototyping
export const AUTH_CONFIG = {
  // Set to true to use hardcoded token for prototyping
  USE_HARDCODED_TOKEN: true,

  // Your hardcoded authentication token from email verification
  HARDCODED_TOKEN:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJlbWVrYW9iYWhAZ21haWwuY29tIiwiY291bnRyeSI6IlVTIiwianRpIjoiZWFiMmZkOTctMTQxZS00YmRiLWJiMmEtOTIzOWFkODFmY2RkIiwiaWF0IjoxNzU2NjUyNDMwLCJleHAiOjE3NTY3Mzg4MzAsImlzcyI6IklkZW50aXR5IiwiYXVkIjoiSWRlbnRpdHlVc2VyIn0.3n7rjRTKdC15v_F8uXoewym1ieXgY9A7pJacs8Hf53c",
  // User information from the auth response
  HARDCODED_USER: {
    email: "emekaobah@gmail.com",
    userId: "USER_01K3V7MR0VAM376WZCQFPM8EA2",
    country: "US",
  },
};

// Utility function to get the current authentication token
export const getAuthToken = (): string | null => {
  if (AUTH_CONFIG.USE_HARDCODED_TOKEN) {
    return AUTH_CONFIG.HARDCODED_TOKEN;
  }

  // For production, get from localStorage
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }

  return null;
};

// Utility function to get user information
export const getCurrentUser = () => {
  if (AUTH_CONFIG.USE_HARDCODED_TOKEN) {
    return AUTH_CONFIG.HARDCODED_USER;
  }

  // For production, get from localStorage
  if (typeof window !== "undefined") {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  }

  return null;
};

// Utility function to check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};
