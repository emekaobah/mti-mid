"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "./ui/button";
import { authStorage } from "@/lib/auth-storage";

interface InsightsButtonProps {
  className?: string;
}

const InsightsButton: React.FC<InsightsButtonProps> = ({ className = "" }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const handleTradeInsights = () => {
    // Check if user is authenticated (includes token expiration check)
    if (!authStorage.isAuthenticated()) {
      console.log(
        "User not authenticated or token expired, redirecting to login"
      );
      router.push("/login");
      return;
    }

    // Get current user data directly from localStorage
    const currentUser = authStorage.getUser();
    console.log("Current user from localStorage:", currentUser);

    // Check user country (with null safety)
    if (!currentUser) {
      console.log("User data not found, redirecting to login");
      router.push("/login");
      return;
    }

    const userCountry = currentUser.country;
    console.log("User country:", userCountry);

    if (userCountry === "NG") {
      router.push("/trade-requests");
    } else {
      router.push("/trade-insights");
    }
  };

  if (isHomePage) {
    // Home page: Simple button that navigates to insights
    return (
      <Button
        onClick={handleTradeInsights}
        className={`flex items-center justify-center space-x-2 rounded-full h-12 w-full s min-w-[150px]  lg:max-w-[240px] bg-[#074318] hover:bg-[#074318]/90 text-base text-white font-semibold lg:px-6 text-center ${className}`}
      >
        Explore Insights
      </Button>
    );
  }

  // Other pages: Always a link, but check auth on click
  return (
    <Image src="/access-branding.svg" alt="Insights" width={172} height={25} />
  );
};

export default InsightsButton;
