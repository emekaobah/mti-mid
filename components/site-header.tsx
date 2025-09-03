"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import InsightsButton from "./insights-button";
import { AuthModal } from "./modals/auth-modal";
import { useAuthModal } from "@/contexts/auth-modal-context";
import { usePathname } from "next/navigation";

const SiteHeader = () => {
  const { openModal } = useAuthModal();
  const pathname = usePathname();

  const handleOpenAuthModal = () => {
    openModal("explore_insights");
  };

  return (
    <div className="px-4 lg:px-15 py-8 bg-[#F9F7F1] flex flex-col sm:flex-row items-center sm:justify-between gap-4">
      <Link href="/">
        <div className="flex flex-col gap-1">
          <Image
            src="/mti-logo.svg"
            alt="logo"
            width={160}
            height={45}
            priority
          />
          <div
            className={`flex items-center gap-1 ${
              pathname !== "/" ? "hidden" : ""
            }`}
          >
            <p className="text-[10px] text-[#3A3A3A]">Powered by</p>
            <Image
              src="/access-brand-mini.svg"
              alt="logo"
              width={55}
              height={13}
              priority
            />
          </div>
        </div>
      </Link>

      <InsightsButton />

      <AuthModal />
    </div>
  );
};

export default SiteHeader;
