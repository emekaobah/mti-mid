import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import ReactFlagsSelect from "react-flags-select";
import { useState } from "react";
import { useCountries } from "@/hooks/api/catalog/use-countries";
import { useAuthenticate } from "@/hooks/api/auth/use-authenticate";
import { useAuth } from "@/hooks/useAuth";
import type { EmailVerificationResponse } from "@/hooks/api/shared/types";

export function InsightsModal() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<
    "idle" | "success" | "link-sent" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const { data: countries, isLoading: isCountriesLoading } = useCountries();
  const { login } = useAuth();
  const authenticate = useAuthenticate();

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
        // New user - link sent
        setVerificationStatus("link-sent");
        setStatusMessage(
          "Verification link sent to your email. Please check your inbox and verify your email address."
        );
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

  const renderStatusMessage = () => {
    if (!statusMessage) return null;

    const statusClasses: Record<string, string> = {
      success: "text-green-600 bg-green-50 border border-green-200",
      "link-sent": "text-blue-600 bg-blue-50 border border-blue-200",
      error: "text-red-600 bg-red-50 border border-red-200",
    };

    const className = statusClasses[verificationStatus] || statusClasses.error;

    return (
      <div className={`text-center p-4 rounded-lg ${className}`}>
        {statusMessage}
      </div>
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="flex items-center justify-center space-x-2 rounded-full h-12 w-full sm:w-auto max-w-[240px] bg-[#074318] hover:bg-[#074318]/90 text-base text-white font-semibold px-6 text-center"
        >
          Explore Insights
        </Button>
      </DialogTrigger>
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
                  className="h-15 border-gray-300 rounded-lg focus:border-[#074318] focus:ring-[#074318]"
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
