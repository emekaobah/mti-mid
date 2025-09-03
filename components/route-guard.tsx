"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface RouteGuardProps {
  children: React.ReactNode;
}

export function RouteGuard({ children }: RouteGuardProps) {
  const { isAuthenticated, isInitialized, userCountry } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Don't check routes until auth is properly initialized
    if (!isInitialized) {
      return;
    }

    const pathname = window.location.pathname;

    // Define protected routes
    const protectedRoutes = [
      "/trade-insights",
      "/trade-requests",
      "/dashboard",
      "/form",
    ];

    // Check if current route is protected
    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );

    // Only redirect if route is protected and user is not authenticated
    if (isProtectedRoute && !isAuthenticated) {
      router.replace("/");
      return;
    }

    setIsChecking(false);
  }, [isAuthenticated, isInitialized, userCountry, router]);

  // Show loading while checking or while auth is initializing
  if (isChecking || !isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F7F1]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#074318] mx-auto"></div>
          <p className="mt-4 text-gray-600">
            {!isInitialized ? "Initializing..." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  // If all checks pass, show content
  return <>{children}</>;
}
