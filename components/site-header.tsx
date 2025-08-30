"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
// import useModalStore from "@/hooks/store/useModalStore";
// import { Button } from "./ui/button";
import InsightsButton from "./insights-button";

const SiteHeader = () => {
  // const { openModal } = useModalStore();
  return (
    <div className="px-4 lg:px-15 pt-8 bg-[#F9F7F1] flex flex-col sm:flex-row items-center sm:justify-between gap-4">
      <Link href="/">
        <Image src="/mti-logo.svg" alt="logo" width={160} height={45} />
      </Link>
      {/* <Button
        // href="/form"
        onClick={() => openModal("verifyMailandCountry")}
        className="flex items-center justify-center space-x-2 rounded-full h-12 w-full sm:w-auto max-w-[240px] bg-[#074318] hover:bg-[#074318]/90 text-base text-white font-semibold px-6 text-center"
      >
        Explore Insights
      </Button> */}
      <InsightsButton />
    </div>
  );
};

export default SiteHeader;
