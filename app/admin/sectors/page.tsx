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

const orgOptions = [
  { label: "All", value: "all" },
  { label: "Government", value: "Government" },
  { label: "Business", value: "Business" },
  { label: "Association", value: "Association" },
];

const countryOptions = [
  { label: "All", value: "all" },
  { label: "Nigeria", value: "Nigeria" },
  { label: "Cameroon", value: "Cameroon" },
  { label: "Uganda", value: "Uganda" },
  { label: "South Africa", value: "South Africa" },
  { label: "Tanzania", value: "Tanzania" },
];

const productOptions = [
  { label: "All", value: "all" },
  { label: "Beans", value: "Beans" },
  { label: "Tobacco", value: "Tobacco" },
  { label: "Sugar", value: "Sugar" },
  { label: "Melon", value: "Melon" },
];

const hsCodes = [
  { label: "All", value: "all" },
  { label: "0200-2022E", value: "0200-2022E" },
  { label: "0200-2023E", value: "0200-2023E" },
  { label: "0200-2024E", value: "0200-2024E" },
  { label: "0200-2025E", value: "0200-2025E" },
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
            <TableFilters
              // organizationOptions={orgOptions}
              // countryOptions={countryOptions}
              productOptions={productOptions}
              // hsCodeOptions={hsCodes}
            />
          </div>
          <Button
            className="bg-[#074318] rounded-full"
            // onClick={() => openModal("requestBuyerModal")}
          >
            Trade Request Insights
          </Button>
        </div>
        <Tabs defaultValue="buy" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="buy">Buy From Nigeria (4)</TabsTrigger>
            <TabsTrigger value="sell">Sell to Nigeria (6)</TabsTrigger>
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
