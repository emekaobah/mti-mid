"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useVerifyToken,
  type VerifyTokenResponse,
} from "@/hooks/api/auth/use-verify-token";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

export const VerifyPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState<
    "verifying" | "success" | "error"
  >("verifying");
  const [statusMessage, setStatusMessage] = useState("");

  const { login } = useAuth();

  // Extract token from URL query parameters
  const token = searchParams.get("token");

  const {
    data: response,
    error,
    isLoading,
  } = useVerifyToken(token ? { token } : undefined);

  useEffect(() => {
    if (!token) {
      setVerificationStatus("error");
      setStatusMessage(
        "No verification token found. Please check your email for the correct link."
      );
      return;
    }

    if (error) {
      setVerificationStatus("error");
      setStatusMessage(
        "Verification failed. Please try again or contact support."
      );
      return;
    }

    if (isLoading) {
      setVerificationStatus("verifying");
      setStatusMessage("Verifying your email address...");
      return;
    }

    if (response) {
      const verifyResponse = response as VerifyTokenResponse;

      if (verifyResponse.success && verifyResponse.code === "00") {
        // Verification successful - user exists and is authenticated
        if (
          verifyResponse.accessToken &&
          verifyResponse.userId &&
          verifyResponse.email &&
          verifyResponse.country
        ) {
          const userData = {
            email: verifyResponse.email,
            userId: verifyResponse.userId,
            country: verifyResponse.country,
            accessToken: verifyResponse.accessToken,
          };

          // Log the user in
          login(userData);

          setVerificationStatus("success");
          setStatusMessage(
            "Email verified successfully! Redirecting to dashboard..."
          );

          // Redirect to home page after a short delay
          setTimeout(() => {
            router.push("/");
          }, 2000);
        } else {
          setVerificationStatus("error");
          setStatusMessage(
            "Verification response incomplete. Please try again."
          );
        }
      } else {
        // Verification failed or user not found
        setVerificationStatus("error");
        setStatusMessage(
          verifyResponse.message || "Verification failed. Please try again."
        );
      }
    }
  }, [response, error, isLoading, token, login, router]);

  const renderContent = () => {
    switch (verificationStatus) {
      case "verifying":
        return (
          <div className="flex flex-col items-center justify-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">
              Verifying your email...
            </h2>
            <p className="text-gray-600 text-center max-w-md">
              Please wait while we verify your email address. This may take a
              few moments.
            </p>
          </div>
        );

      case "success":
        return (
          <div className="flex flex-col items-center justify-center space-y-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-800">
              Email Verified Successfully!
            </h2>
            <p className="text-gray-600 text-center max-w-md">
              {statusMessage}
            </p>
          </div>
        );

      case "error":
        return (
          <div className="flex flex-col items-center justify-center space-y-4">
            <XCircle className="h-12 w-12 text-red-600" />
            <h2 className="text-xl font-semibold text-gray-800">
              Verification Failed
            </h2>
            <p className="text-gray-600 text-center max-w-md">
              {statusMessage}
            </p>
            <button
              onClick={() => router.push("/")}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Home
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Email Verification
          </h1>
          <p className="text-gray-600">MTI Dashboard</p>
        </div>

        <div className="py-8">{renderContent()}</div>
      </div>
    </div>
  );
};
