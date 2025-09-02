"use client";

import React from "react";
import Image from "next/image";
import logo from "@/public/logo-svg.svg";
import { MoveLeft } from "lucide-react";
import { Minus } from "lucide-react";
import { Graphs } from "@/components/admin/graphs";
import { Button } from "@/components/ui/button";
import useModalStore from "@/hooks/store/useModalStore";
import { useRouter } from "next/navigation";
import useFilterStore from "@/hooks/store/useFilterStore";
import useTradeSUbmissionStore from "@/hooks/store/useTradeSubmissionStore";

const BusinessDetails = () => {
  const { openModal } = useModalStore();
  const router = useRouter();
  const { sector, tradeType } = useFilterStore();
  const { submission } = useTradeSUbmissionStore();

  return (
    <main className="min-h-screen  bg-[#FCFCFC] lg:px-15 px-4 mx-auto">
      <div className="flex flex-col my-4 gap-2">
        {/* <div className="flex gap-4">
          <p className="text-xs">Powered by</p>
          <Image src={logo} alt="Access bank logo" />
        </div> */}
        <div className="flex items-center gap-3" onClick={() => router.back()}>
          <MoveLeft />
          <p className="text-xs">Back</p>
        </div>
      </div>
      <div className=" flex flex-col border-white bg-[#f9f9f9] rounded-md">
        <div className="bg-[#F9F7F1] p-6 flex flex-col gap-3 md:flex-row justify-between items-center rounded-t-md">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-0.5">
              <h1 className="font-medium text-base">Trade Request</h1>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="bg-[#074318] rounded-full h-2 w-2"></div>
              <p>
                Product Sector:{" "}
                <span className="font-medium"> {sector.sectorName}</span>
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="bg-[#074318] rounded-full h-2 w-2"></div>
              <p>
                Trade Interest:
                <span className="font-medium">
                  {" "}
                  {tradeType === 1 ? "  Buy from Nigeria" : "  Sell to Nigeria"}
                </span>
              </p>
            </div>
          </div>
          <Button
            className="bg-[#074318] rounded-full"
            onClick={() => openModal("requestBuyerModal")}
          >
            Request Buyer&apos;s Contact
          </Button>
        </div>

        <div className="grid gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 p-6">
          <div className="">
            <p className="text-xs text-[#575757]">Organization</p>
            <h2 className="text-base text-[#3A3A3A]">
              {submission?.organizationType ?? "-"}
            </h2>
          </div>
          <div className="">
            <p className="text-xs text-[#575757]">Business Type 1</p>
            <h2 className="text-base text-[#3A3A3A]">{"-"}</h2>
          </div>
          <div className="">
            <p className="text-xs text-[#575757]">Business Type 2</p>
            <h2 className="text-base text-[#3A3A3A]">{"-"}</h2>
          </div>
          <div className="">
            <p className="text-xs text-[#575757]">Product Name</p>
            <h2 className="text-base text-[#3A3A3A]">
              {submission?.productName ?? "-"}
            </h2>
          </div>
          <div className="">
            <p className="text-xs text-[#575757]">Country</p>
            <h2 className="text-base text-[#3A3A3A]">
              {submission?.country ?? "-"}
            </h2>
          </div>
          <div className="">
            <p className="text-xs text-[#575757]">HS Code</p>
            <h2 className="text-base text-[#3A3A3A]">
              {submission?.hsCode ?? "-"}
            </h2>
          </div>
          <div className="">
            <p className="text-xs text-[#575757]">Quantity</p>
            <h2 className="text-base text-[#3A3A3A]">
              {submission?.quantity ?? "-"}
            </h2>
          </div>
          <div className="">
            <p className="text-xs text-[#575757]">Unit</p>
            <h2 className="text-base text-[#3A3A3A]">
              {submission?.unit ?? "-"}
            </h2>
          </div>
          <div className="">
            <p className="text-xs text-[#575757]">Standards/Certifications</p>
            <h2 className="text-base text-[#3A3A3A]">-</h2>
          </div>
          <div className="">
            <p className="text-xs text-[#575757]">Regulatory Authority</p>
            <h2 className="text-base text-[#3A3A3A]">-</h2>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BusinessDetails;
