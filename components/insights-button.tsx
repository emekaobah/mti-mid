"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { AuthModal } from "./modals/auth-modal";
import Image from "next/image";

const InsightsButton = () => {
  const pathname = usePathname();
  return (
    <div>
      {pathname === "/" ? (
        <AuthModal />
      ) : (
        <Image
          src="/access-branding.svg"
          alt="access bank logo"
          width={175}
          height={25}
        />
      )}
    </div>
  );
};

export default InsightsButton;
