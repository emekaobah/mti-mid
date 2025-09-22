"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReactFlagsSelect from "react-flags-select";
import { useCountries } from "@/hooks/api/catalog/use-countries";
import {
  EmailVerificationResultResponse,
  useAuthenticate,
  useRequestEmailLink,
} from "@/hooks/api";
import { toast } from "sonner";
import { authStorage } from "@/lib/auth-storage";
// Zod schema for form validation
const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  countryCode: z.string().min(1, "Country is required"),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

export const LoginForm = () => {
  const router = useRouter();
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  // Fetch countries from API
  const { data: countries, isLoading: isCountriesLoading } = useCountries();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      countryCode: "",
    },
  });

  const selectedCountryCode = watch("countryCode");

  const authenticateMutation = useAuthenticate();
  const requestEmailLinkMutation = useRequestEmailLink();

  // Helper function to get intended destination and redirect
  const redirectAfterLogin = () => {
    const intendedDestination = authStorage.getIntendedDestination();
    if (intendedDestination) {
      // Clear the stored destination
      authStorage.clearIntendedDestination();
      // Redirect to the intended destination
      router.push(intendedDestination);
    } else {
      // Default redirect to homepage
      router.push("/");
    }
  };

  const onSubmit = (data: LoginFormData) => {
    setSubmitMessage(null);

    authenticateMutation.mutate(data, {
      onSuccess: (response: unknown) => {
        const authResponse = response as EmailVerificationResultResponse;
        console.log("Authentication response:", authResponse);

        if (authResponse.data?.success === true) {
          // Save user data to localStorage for future auth requests
          if (
            authResponse.data.email &&
            authResponse.data.userId &&
            authResponse.data.accessToken &&
            authResponse.data.country
          ) {
            const userData = {
              email: authResponse.data.email,
              userId: authResponse.data.userId,
              country: authResponse.data.country,
              accessToken: authResponse.data.accessToken,
            };

            authStorage.setUser(userData);
            console.log("User data saved to localStorage:", userData);
          }

          toast.success(
            authResponse.data?.message || "Authentication successful!"
          );
          setTimeout(() => {
            redirectAfterLogin();
          }, 2000);
        } else if (authResponse.data?.code === "99") {
          // User's email is not verified, request email verification link
          console.log("Email not verified, requesting email link...");

          requestEmailLinkMutation.mutate(data, {
            onSuccess: (emailLinkResponse: unknown) => {
              const emailResponse =
                emailLinkResponse as EmailVerificationResultResponse;
              console.log("Email link response:", emailResponse);

              if (
                emailResponse.succeeded &&
                emailResponse.data?.success === true
              ) {
                toast.success(
                  emailResponse.data?.message ||
                    "Email verification link sent successfully!"
                );
                setEmailSent(true);
                setSubmitMessage({
                  type: "success",
                  message:
                    "Email verification link has been sent to your email address. Please check your inbox and verify your email before logging in.",
                });
              } else {
                // Show error message even when succeeded is true but data.success is false
                const errorMessage =
                  emailResponse.data?.message ||
                  "Failed to send email verification link. Please try again.";
                toast.error(errorMessage);
                setSubmitMessage({
                  type: "error",
                  message: errorMessage,
                });
              }
            },
            onError: (error: Error) => {
              console.error("Error requesting email link:", error);
              toast.error(
                "Failed to send email verification link. Please try again later."
              );
              setSubmitMessage({
                type: "error",
                message:
                  "Failed to send email verification link. Please try again later.",
              });
            },
          });
        } else {
          toast.error(
            authResponse.data?.message ||
              "Authentication failed. Please try again."
          );
          setSubmitMessage({
            type: "error",
            message:
              authResponse.data?.message ||
              "Authentication failed. Please try again.",
          });
        }
      },

      onError: () => {
        toast.error("Something went wrong, please try again later.");
        setSubmitMessage({
          type: "error",
          message: "Something went wrong, please try again later.",
        });
      },
    });
  };

  return (
    <div className="flex justify-center w-full">
      <Card className="shadow-none border-0 w-full max-w-4xl">
        <CardHeader className="text-center">
          <CardTitle className=" font-medium text-[#3A3A3A]">
            Please verify your email to get started{" "}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center w-full p-4 sm:p-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 sm:space-y-6 w-full"
          >
            {/* Email Field */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Country Field */}
            <div className="space-y-2">
              <Label
                htmlFor="countryCode"
                className="text-sm font-medium text-gray-700"
              >
                Country
              </Label>
              {isCountriesLoading ? (
                <div className="text-sm text-gray-500 text-center py-4 border border-gray-300 rounded-lg">
                  Loading countries...
                </div>
              ) : (
                <ReactFlagsSelect
                  selected={selectedCountryCode}
                  onSelect={(code) => setValue("countryCode", code)}
                  searchable
                  countries={
                    countries?.data
                      ?.map((country) => country.code)
                      .filter(
                        (code): code is string =>
                          code !== null && code !== undefined
                      ) || []
                  }
                  customLabels={
                    countries?.data?.reduce((acc, country) => {
                      if (country.code && country.name) {
                        acc[country.code] = country.name;
                      }
                      return acc;
                    }, {} as Record<string, string>) || {}
                  }
                  placeholder="Select your country"
                  className="!border-gray-300 !rounded-lg"
                  selectButtonClassName="!border-gray-300 !rounded-lg !bg-white !text-gray-500 !h-12"
                  disabled={authenticateMutation.isPending}
                />
              )}
              {errors.countryCode && (
                <p className="text-sm text-red-600">
                  {errors.countryCode.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={
                  authenticateMutation.isPending ||
                  requestEmailLinkMutation.isPending ||
                  emailSent
                }
                className={`w-full sm:min-w-[280px] sm:w-auto rounded-4xl font-semibold h-12 ${
                  emailSent
                    ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                    : "bg-[#074318] hover:bg-[#074318]/90 text-white"
                }`}
              >
                {authenticateMutation.isPending ||
                requestEmailLinkMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {authenticateMutation.isPending
                      ? "Verifying..."
                      : "Sending Email Link..."}
                  </>
                ) : emailSent ? (
                  "Email Sent ✓"
                ) : (
                  "Verify Email"
                )}
              </Button>
            </div>

            {/* Status Messages */}
            {submitMessage && (
              <div
                className={`p-3 rounded-lg text-sm ${
                  submitMessage.type === "success"
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {submitMessage.message}
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
