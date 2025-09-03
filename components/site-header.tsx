"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import InsightsButton from "./insights-button";
import { AuthModal } from "./modals/auth-modal";
import { usePathname, useRouter } from "next/navigation";
import { MoveLeft } from "lucide-react";

const SiteHeader = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="px-4 lg:px-15 pt-8 pb-3 bg-[#F9F7F1] flex flex-col  gap-7 w-full ">
      <div className="flex flex-row justify-between w-full sm:flex-row items-center gap-4 sm:justify-between">
        {" "}
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
      </div>

      {pathname !== "/" && (
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => router.back()}
        >
          <MoveLeft color="#074318" />
          <p className=" font-semibold text-[#074318]">Back</p>
        </div>
      )}
    </div>
  );
};

export default SiteHeader;
