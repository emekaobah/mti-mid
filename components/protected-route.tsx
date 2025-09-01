"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { AuthModal } from "@/components/modals/auth-modal";

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  fallback,
}) => {
  const { isAuthenticated } = useAuth();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Show modal if user is not authenticated
    if (!isAuthenticated) {
      setShowModal(true);
    }
  }, [isAuthenticated]);

  // If authenticated, show the protected content
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // If not authenticated, show the insights modal
  return (
    <>
      {fallback && fallback}
      <AuthModal />
    </>
  );
};
