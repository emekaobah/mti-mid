"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

interface InsightsButtonProps {
  onOpenAuthModal: () => void;
  className?: string;
}

const InsightsButton: React.FC<InsightsButtonProps> = ({
  onOpenAuthModal,
  className = "",
}) => {
  const pathname = usePathname();
  const { isAuthenticated, userCountry } = useAuth();
  const [isClient, setIsClient] = useState(false);
  const isHomePage = pathname === "/";

  // Ensure we're on the client before using dynamic values
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Determine redirect path based on user's country
  const getRedirectPath = () => {
    if (!isClient) {
      return "/trade-insights"; // Default for SSR
    }
    if (userCountry === "NG") {
      return "/trade-requests";
    }
    return "/trade-insights";
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      onOpenAuthModal();
    }
    // If authenticated, let the Link handle navigation naturally
  };

  if (isHomePage) {
    // Home page: Button that checks auth and either opens modal or navigates
    if (isClient && isAuthenticated) {
      // Authenticated: Navigate to insights or trade-requests based on country
      return (
        <Link
          href={getRedirectPath()}
          className={`flex items-center justify-center space-x-2 rounded-full h-12 w-full sm:w-auto max-w-[240px] bg-[#074318] hover:bg-[#074318]/90 text-base text-white font-semibold px-6 text-center ${className}`}
        >
          Explore Insights
        </Link>
      );
    } else {
      // Not authenticated or still loading: Button that opens modal
      return (
        <button
          onClick={onOpenAuthModal}
          className={`flex items-center justify-center space-x-2 rounded-full h-12 w-full sm:w-auto max-w-[240px] bg-[#074318] hover:bg-[#074318]/90 text-base text-white font-semibold px-6 text-center ${className}`}
        >
          Explore Insights
        </button>
      );
    }
  }

  // Other pages: Always a link, but check auth on click
  return (
    // <Link
    //   href={getRedirectPath()}
    //   onClick={handleClick}
    //   className={`flex items-center justify-center rounded-full h-12 w-12 sm:w-12 ${className}`}
    // >
    //   <Image
    //     src="/access-branding.svg"
    //     alt="Insights"
    //     width={172}
    //     height={25}

    //   />
    // </Link>

    <Image src="/access-branding.svg" alt="Insights" width={172} height={25} />
  );
};

export default InsightsButton;
