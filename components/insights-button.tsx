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
      router.push("/login");
      return;
    }

    // Get current user data directly from localStorage
    const currentUser = authStorage.getUser();

    // Check user country (with null safety)
    if (!currentUser) {
      router.push("/login");
      return;
    }

    const userCountry = currentUser.country;

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
        className={` space-x-2 rounded-full h-12  bg-[#074318] hover:bg-[#074318]/90 text-sm lg:text-base text-white font-semibold lg:min-w-[240px]  text-center ${className}`}
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
