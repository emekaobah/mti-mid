"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useVerifyToken,
  type VerifyTokenData,
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
      // The API sometimes returns a wrapper { succeeded, data } and
      // sometimes returns the inner payload directly. Normalize both shapes
      // so we always operate on verifyData.
      const apiResp = response as {
        succeeded?: boolean;
        message?: string | null;
        data?: VerifyTokenData | null;
      };
      const verifyData: VerifyTokenData | undefined =
        apiResp.data ?? (response as unknown as VerifyTokenData);

      // Check that we have a payload to inspect
      if (verifyData) {
        // Check if the verification was successful. The API can indicate
        // success either via the outer `succeeded` flag or via the inner
        // `success` boolean (some responses leave `code` null). Consider
        // any of these as success.
        const isSuccess =
          apiResp.succeeded === true || verifyData.success === true ||
          verifyData.code === "00";

        if (isSuccess) {
          // Verification successful - user exists and is authenticated
          if (
            verifyData.accessToken &&
            verifyData.userId &&
            verifyData.email &&
            verifyData.country
          ) {
            const userData = {
              email: verifyData.email,
              userId: verifyData.userId,
              country: verifyData.country,
              accessToken: verifyData.accessToken,
            };

            // Log the user in
            login(userData);

            setVerificationStatus("success");
            setStatusMessage(
              verifyData.message || "Verification completed successfully"
            );

            // Redirect to home page after a short delay
            setTimeout(() => {
              router.push("/");
            }, 2000);
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
  }, [response, error, isLoading, token, email, login, router]);

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
            <button
              onClick={() => router.push("/")}
              className="max-w-48 w-full cursor-pointer mx-auto flex items-center justify-center h-12 bg-[#074318] hover:bg-[#074318]/90 text-white font-semibold rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Go to Home
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
