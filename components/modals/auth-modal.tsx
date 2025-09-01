import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import ReactFlagsSelect from "react-flags-select";
import { useState, useEffect } from "react";
import { useCountries } from "@/hooks/api/catalog/use-countries";
import {
  useAuthenticate,
  useRequestEmailLink,
} from "@/hooks/api/auth/use-authenticate";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useAuthModal } from "@/contexts/auth-modal-context";
import type { EmailVerificationResponse } from "@/hooks/api/shared/types";

interface AuthModalProps {
  trigger?: React.ReactNode;
  redirectTo?: string;
}

export function AuthModal({
  trigger,
  redirectTo = "/trade-insights",
}: AuthModalProps) {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<
    "idle" | "success" | "link-sent" | "error" | "verifying"
  >("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const { data: countries, isLoading: isCountriesLoading } = useCountries();
  const { login } = useAuth();
  const authenticate = useAuthenticate();
  const requestEmailLink = useRequestEmailLink();
  const router = useRouter();
  const { isOpen, closeModal } = useAuthModal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setVerificationStatus("idle");
    setStatusMessage("");

    try {
      const response = (await authenticate.mutateAsync({
        email,
        countryCode: selectedCountry,
      })) as EmailVerificationResponse;

      if (response.success && response.code === "00") {
        // Existing user - log them in
        if (
          response.accessToken &&
          response.userId &&
          response.email &&
          response.country
        ) {
          const userData = {
            email: response.email,
            userId: response.userId,
            country: response.country,
            accessToken: response.accessToken,
          };

          login(userData);
          setVerificationStatus("success");
          setStatusMessage("Welcome back! You're now logged in.");

          // Close modal after a short delay
          setTimeout(() => {
            // You can add modal close logic here
          }, 2000);
        }
      } else if (response.code === "99") {
        // New user - need to send verification email
        setVerificationStatus("verifying");
        setStatusMessage("User not found. Sending verification email...");

        try {
          // Call the request-email-link endpoint to actually send the email
          const emailResponse = (await requestEmailLink.mutateAsync({
            email,
            countryCode: selectedCountry,
          })) as {
            success: boolean;
            message: string;
            tokenId: string;
          };

          // Handle the email response
          if (emailResponse.success) {
            setVerificationStatus("link-sent");
            setStatusMessage(
              emailResponse.message ||
                "Verification link sent to your email. Please check your inbox and verify your email address."
            );
          } else {
            setVerificationStatus("error");
            setStatusMessage(
              "Failed to send verification email. Please try again or contact support."
            );
          }
        } catch (emailError) {
          setVerificationStatus("error");
          setStatusMessage(
            "Failed to send verification email. Please try again or contact support."
          );
          console.error("Email sending failed:", emailError);
        }
      } else {
        // Other error cases
        setVerificationStatus("error");
        setStatusMessage(
          response.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      setVerificationStatus("error");
      setStatusMessage(
        "Network error. Please check your connection and try again."
      );
      console.error("Verification failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle successful authentication
  useEffect(() => {
    if (verificationStatus === "success") {
      // Close modal after short delay
      setTimeout(() => {
        closeModal();
        // Navigate to insights page after successful auth
        router.push(redirectTo);
      }, 2000);
    }
  }, [verificationStatus, closeModal, router, redirectTo]);

  const renderStatusMessage = () => {
    if (!statusMessage) return null;

    const statusClasses: Record<string, string> = {
      success: "text-green-600 bg-green-50 border border-green-200",
      "link-sent": "text-blue-600 bg-blue-50 border border-blue-200",
      error: "text-red-600 bg-red-50 border border-red-200",
      verifying: "text-blue-600 bg-blue-50 border border-blue-200",
    };

    const className = statusClasses[verificationStatus] || statusClasses.error;

    return (
      <div className={`text-center p-4 rounded-lg ${className}`}>
        {statusMessage}
      </div>
    );
  };

  // If trigger is provided, use it
  if (trigger) {
    return (
      <Dialog>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-[818px] pt-10 lg:pt-24 pb-10 lg:pb-36 flex flex-col items-center justify-center px-4 lg:px-36 rounded-2xl border-0 shadow-xl">
          <DialogClose asChild></DialogClose>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-[22px] font-semibold text-[#074318] text-center">
                  Let&apos;s do a quick check
                </h2>
                <p className="text-sm text-[#3A3A3A] text-center">
                  Please verify your identity, then the insights are all yours.
                </p>
              </div>

              {/* Status Message */}
              {renderStatusMessage()}

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 hidden">
                    Select your country
                  </label>
                  {isCountriesLoading ? (
                    <div className="text-sm text-gray-500 text-center py-4">
                      Loading countries...
                    </div>
                  ) : (
                    <ReactFlagsSelect
                      selected={selectedCountry}
                      onSelect={(code) => setSelectedCountry(code)}
                      countries={
                        countries
                          ?.map((country) => country.code)
                          .filter(
                            (code): code is string =>
                              code !== null && code !== undefined
                          ) || []
                      }
                      customLabels={
                        countries?.reduce((acc, country) => {
                          if (country.code && country.name) {
                            acc[country.code] = country.name;
                          }
                          return acc;
                        }, {} as Record<string, string>) || {}
                      }
                      placeholder="Select your country"
                      className="!border-gray-300 !rounded-lg"
                      selectButtonClassName="!border-gray-300 !rounded-lg !bg-white !text-gray-500 !h-15"
                      disabled={isSubmitting}
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 hidden">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="h-15 border-gray-300 focus:border-[#074318] focus:ring-[#074318]"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || !selectedCountry || !email}
                className="max-w-48 w-full mx-auto flex items-center justify-center h-12 bg-[#074318] hover:bg-[#074318]/90 text-white font-semibold rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Verifying..." : "Verify"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  // Default mode - controlled by context
  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[818px] pt-10 lg:pt-24 pb-10 lg:pb-36 flex flex-col items-center justify-center px-4 lg:px-36 rounded-2xl border-0 shadow-xl">
        <DialogClose asChild></DialogClose>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-[22px] font-semibold text-[#074318] text-center">
                Let&apos;s do a quick check
              </h2>
              <p className="text-sm text-[#3A3A3A] text-center">
                Please verify your identity, then the insights are all yours.
              </p>
            </div>

            {/* Status Message */}
            {renderStatusMessage()}

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 hidden">
                  Select your country
                </label>
                {isCountriesLoading ? (
                  <div className="text-sm text-gray-500 text-center py-4">
                    Loading countries...
                  </div>
                ) : (
                  <ReactFlagsSelect
                    selected={selectedCountry}
                    onSelect={(code) => setSelectedCountry(code)}
                    countries={
                      countries
                        ?.map((country) => country.code)
                        .filter(
                          (code): code is string =>
                            code !== null && code !== undefined
                        ) || []
                    }
                    customLabels={
                      countries?.reduce((acc, country) => {
                        if (country.code && country.name) {
                          acc[country.code] = country.name;
                        }
                        return acc;
                      }, {} as Record<string, string>) || {}
                    }
                    placeholder="Select your country"
                    className="!border-gray-300 !rounded-lg"
                    selectButtonClassName="!border-gray-300 !rounded-lg !bg-white !text-gray-500 !h-15"
                    disabled={isSubmitting}
                  />
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 hidden">
                  Email Address
                </label>
                <Input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="h-15 border-gray-300 focus:border-[#074318] focus:ring-[#074318]"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || !selectedCountry || !email}
              className="max-w-48 w-full mx-auto flex items-center justify-center h-12 bg-[#074318] hover:bg-[#074318]/90 text-white font-semibold rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Verifying..." : "Verify"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
