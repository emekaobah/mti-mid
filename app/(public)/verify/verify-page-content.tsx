"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useVerifyToken,
  type VerifyTokenData,
} from "@/hooks/api/auth/use-verify-token";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

export const VerifyPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState<
    "verifying" | "success" | "error"
  >("verifying");
  const [statusMessage, setStatusMessage] = useState("");

  // Extract both token and email from URL query parameters
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const {
    data: response,
    error,
    isLoading,
  } = useVerifyToken(token && email ? { token, email } : undefined);

  useEffect(() => {
    if (!token || !email) {
      setVerificationStatus("error");
      setStatusMessage(
        "Missing verification token or email. Please check your email for the correct link."
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
      // Handle the new API response format
      const apiResp = response as {
        succeeded?: boolean;
        message?: string | null;
        data?: VerifyTokenData | null;
      };

      console.log("API Response:", apiResp);
      const verifyData: VerifyTokenData | undefined =
        apiResp.data ?? (response as unknown as VerifyTokenData);

      // Check that we have a payload to inspect
      if (verifyData) {
        // Check if the verification was successful
        const isSuccess =
          apiResp.succeeded === true || verifyData.success === true;

        if (isSuccess) {
          // Verification successful - user exists and is verified
          if (verifyData.userId && verifyData.email && verifyData.country) {
            setVerificationStatus("success");
            setStatusMessage(
              verifyData.message ||
                "Email verified successfully! Please log in to continue."
            );

            // Redirect to login page after a short delay
            setTimeout(() => {
              router.push("/login");
            }, 3000);
          } else {
            setVerificationStatus("error");
            setStatusMessage(
              verifyData.message || "Verification response incomplete"
            );
          }
        } else {
          // Verification failed inside the payload
          setVerificationStatus("error");
          setStatusMessage(
            verifyData.message || "Verification failed. Please try again."
          );
        }
      } else {
        // No payload at all
        setVerificationStatus("error");
        setStatusMessage(apiResp.message || "Verification failed");
      }
    }
  }, [response, error, isLoading, token, email, router]);

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
              {statusMessage}
            </h2>
            <p className="text-gray-600 text-center max-w-md">
              You will be redirected to the login page shortly...
            </p>
            <button
              onClick={() => router.push("/login")}
              className="max-w-48 w-full cursor-pointer mx-auto flex items-center justify-center h-12 bg-[#074318] hover:bg-[#074318]/90 text-white font-semibold rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Go to Login
            </button>
          </div>
        );

      case "error":
        return (
          <div className="flex flex-col items-center justify-center space-y-4">
            <XCircle className="h-12 w-12 text-red-600" />
            <h2 className="text-xl font-semibold text-gray-800">
              {statusMessage}
            </h2>
            <button
              onClick={() => router.push("/")}
              className="max-w-48 w-full cursor-pointer mx-auto flex items-center justify-center h-12 bg-[#074318] hover:bg-[#074318]/90 text-white font-semibold rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
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
    <div className="min-h-screen bg-[#F9F7F1] flex flex-col items-center  p-4 gap-8">
      <h1 className="font-bold text-2xl text-[#074318] text-center max-w-md">
        Welcome to Nigeria AFCFTA Trade Intelligence System.
      </h1>
      <div className="max-w-2xl w-full bg-white rounded-lg  p-8 ">
        <div className="text-center mb-8">
          <h1 className="text-lg font-semibold text-[#3A3A3A] mb-2">
            Email Verification
          </h1>
        </div>

        <div className="py-8">{renderContent()}</div>
      </div>
    </div>
  );
};
