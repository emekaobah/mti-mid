"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import InsightsButton from "./insights-button";
import { AuthModal } from "./modals/auth-modal";
import { useAuthModal } from "@/contexts/auth-modal-context";

const SiteHeader = () => {
  const { openModal } = useAuthModal();

  const handleOpenAuthModal = () => {
    openModal();
  };

  return (
    <div className="px-4 lg:px-15 pt-8 bg-[#F9F7F1] flex flex-col sm:flex-row items-center sm:justify-between gap-4">
      <Link href="/">
        <Image
          src="/mti-logo.svg"
          alt="logo"
          width={160}
          height={45}
          priority
        />
      </Link>

      <InsightsButton onOpenAuthModal={handleOpenAuthModal} />

      <AuthModal />
    </div>
  );
};

export default SiteHeader;
