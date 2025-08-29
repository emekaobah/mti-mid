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
import SectorCard from "@/components/cards/sectors-cards";
import { TableFilters } from "@/components/table/filter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const productOptions = [
  { label: "All", value: "all" },
  { label: "Agriculture", value: "Agriculture" },
  { label: "Chemicals", value: "Chemicals" },
  { label: "Building Materials", value: "Building Materials" },
];

const serviceOptions = [
  { label: "All", value: "all" },
  { label: "Business Service", value: "Business Service" },
  { label: "HR Services", value: "HR Services" },
  { label: "Educational Services", value: "Educational Services" },
];

const Sectors = () => {
  const { openModal } = useModalStore();
  const router = useRouter();

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
        <div className="bg-[#F9F7F1] p-6 flex justify-between items-center rounded-t-md">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-0.5">
              <h1 className="font-medium text-base">Trade Request</h1>
            </div>
            <div className="w-full">
              <TableFilters
                productSectorOptions={productOptions}
                serviceSectorOptions={serviceOptions}
              />
            </div>
          </div>
          <Button
            className="bg-[#074318] rounded-full"
            // onClick={() => openModal("requestBuyerModal")}
          >
            Trade Request Insights
          </Button>
        </div>
        <Tabs defaultValue="buy" className="w-full">
          <TabsList className="w-full bg-[#F9F7F1]">
            <TabsTrigger value="buy" className="bg-[#F9F7F1]">
              Buy From Nigeria (4)
            </TabsTrigger>
            <TabsTrigger value="sell" className="bg-[#F9F7F1]">
              Sell to Nigeria (6)
            </TabsTrigger>
          </TabsList>
          <TabsContent value="buy">
            <div className="grid grid-cols-4 p-6 gap-6">
              <SectorCard
                sector="Agriculture"
                date="Aug 26 - Aug 28"
                request="50"
                onClick={() => openModal("verifyBvnModal")}
              />
              <SectorCard
                sector="Chemicals"
                date="Aug 26 - Aug 28"
                request="50"
              />
              <SectorCard
                sector="Food & Beverages"
                date="Aug 26 - Aug 28"
                request="50"
              />
              <SectorCard
                sector="HR Services"
                date="Aug 26 - Aug 28"
                request="50"
              />
            </div>
          </TabsContent>
          <TabsContent value="sell">
            {/* <ProductsGraph /> */}
            <div className="grid grid-cols-4 p-6 gap-6">
              <SectorCard
                sector="Financial Services"
                date="Aug 26 - Aug 28"
                request="50"
                onClick={() => openModal("verifyBvnModal")}
              />
              <SectorCard
                sector="Educational Services"
                date="Aug 26 - Aug 28"
                request="50"
              />
              <SectorCard
                sector="Food & Beverages"
                date="Aug 26 - Aug 28"
                request="50"
              />
              <SectorCard
                sector="Paper & Packaging"
                date="Aug 26 - Aug 28"
                request="50"
              />
              <SectorCard
                sector="Environmental Goods"
                date="Aug 26 - Aug 28"
                request="50"
              />
              <SectorCard
                sector="Building Materials"
                date="Aug 26 - Aug 28"
                request="50"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default Sectors;
