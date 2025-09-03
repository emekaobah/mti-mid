"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
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
    // Get current user data directly from localStorage
    const currentUser = authStorage.getUser();
    console.log("Current user from localStorage:", currentUser);

    // Check if user is authenticated
    if (!currentUser || !currentUser.accessToken) {
      console.log("User not authenticated, redirecting to login");
      router.push("/login");
      return;
    }

    // Check user country
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
        className={`flex items-center justify-center space-x-2 rounded-full h-12 w-full sm:w-auto max-w-[240px] bg-[#074318] hover:bg-[#074318]/90 text-base text-white font-semibold px-6 text-center ${className}`}
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
