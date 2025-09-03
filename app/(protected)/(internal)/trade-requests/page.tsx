"use client";

import { useEffect, useState } from "react";
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
import SectorCardSkeleton from "@/components/cards/sectors-cards/skeleton";
import { TableFilters } from "@/components/table/filter";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs2";
import useFilterStore from "@/hooks/store/useFilterStore";
import { useTableQueryParams } from "@/hooks/custom-hooks/useTableQueryParams";
// import { useSectorCountNew } from "@/hooks/api";
import Configs from "@/lib/configs";
import { useApiQueryNew } from "@/hooks/api";
import { useSectorCount } from "@/hooks/api";
import { SectorCount } from "@/hooks/api/trade-interest/types";
import { useSectors } from "@/hooks/api";
import { FilterOption } from "@/components/table/filter";
import { useServiceSectors } from "@/hooks/api";
import { useAuth } from "@/hooks/useAuth";

const Sectors = () => {
  const { openModal } = useModalStore();
  const router = useRouter();
  const { setTradeType, tradeType, setSector } = useFilterStore();
  const tableFilter = useFilterStore((state) => state);
  const { data, isLoading: productSectorLoading } = useSectors();
  const { data: serviceSectorsData, isLoading: serviceSectorLoading } =
    useServiceSectors();
  const [isBuy, setIsBuy] = useState<boolean>(true);
  const { isAuthenticated, isInitialized, userCountry } = useAuth();

  // Create skeleton array for consistent loading state
  const skeletonArray = Array.from({ length: 4 }, (_, i) => i);

  useEffect(() => {
    if (isInitialized) {
      if (!isAuthenticated) {
        router.replace("/");
      } else if (userCountry !== "NG") {
        router.replace("/trade-insights");
      }
    }
  }, [isAuthenticated, isInitialized, userCountry, router]);

  useEffect(() => {
    setTradeType(1);
  }, [setTradeType]);

  const { finalUrl } = useTableQueryParams({
    baseUrl: `${Configs.baseUrl}/api/TradeInterest/sector-count`,
    tradeType: tableFilter.tradeType,
  });

  const { data: sectors, isLoading } = useSectorCount({
    tradeType: tradeType === 1 ? 1 : 2,
    ...(tableFilter.productSectorFilterValue !== "" && {
      sectorIds: tableFilter.productSectorFilterValue,
    }),
    ...(tableFilter.serviceSectorFilterValue !== "" && {
      serviceSectorIds: tableFilter.serviceSectorFilterValue,
    }),
    ...(tableFilter.globalFilter !== "" && {
      searchTerm: tableFilter.globalFilter,
    }),
  });

  const handleSectorClick = (sector: SectorCount) => {
    setSector(sector);
    openModal("verifyBvnModal");
  };

  const handleTabChange = () => {
    setSector({} as SectorCount);
    setIsBuy(!isBuy);
  };

  const productSectors = [
    { label: "All", value: "all" },
    ...(data?.data
      ?.map((sector, i) => ({
        label: sector?.name,
        value: sector?.id,
      }))
      .filter(
        (item): item is { label: string; value: string } =>
          Boolean(item.label) && Boolean(item.value)
      ) ?? []),
  ];

  const serviceSectors = [
    { label: "All", value: "all" },
    ...(serviceSectorsData?.data
      ?.map((sector, i) => ({
        label: sector?.name,
        value: sector?.id,
      }))
      .filter(
        (item): item is { label: string; value: string } =>
          Boolean(item.label) && Boolean(item.value)
      ) ?? []),
  ];

  // RouteGuard handles all validation - just render the page

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
        <div className="bg-[#F9F7F1] p-6 flex flex-col md:flex-row justify-between items-center rounded-t-md">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-0.5">
              <h1 className="font-medium text-base">Trade Request</h1>
            </div>
            <div className="w-full">
              <TableFilters
                productSectorOptions={productSectors}
                serviceSectorOptions={serviceSectors}
              />
            </div>
          </div>
          <Button
            className="bg-[#074318] rounded-full"
            onClick={() => router.push("/trade-insights")}
          >
            Trade Request Insights
          </Button>
        </div>
        <Tabs defaultValue="buy" className="w-full">
          <TabsList className="w-full bg-[#F9F7F1]">
            <TabsTrigger
              value="buy"
              className="bg-[#F9F7F1]"
              onClick={() => {
                handleTabChange();
                setTradeType(1);
              }}
            >
              Buy From Nigeria {isBuy && <span>({sectors.length})</span>}
            </TabsTrigger>
            <TabsTrigger
              value="sell"
              className="bg-[#F9F7F1] "
              onClick={() => {
                handleTabChange();
                setTradeType(2);
              }}
            >
              Sell to Nigeria{!isBuy && <span>({sectors.length})</span>}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="buy">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-3 md:p-6 gap-6">
              {isLoading
                ? // Show skeleton loading state
                  skeletonArray.map((_, i) => <SectorCardSkeleton key={i} />)
                : // Show actual sector cards
                  sectors?.map((x, i) => (
                    <SectorCard
                      sector={x.sectorName}
                      date="Aug 26 - Aug 28"
                      request={x.count}
                      key={i}
                      onClick={() => handleSectorClick(x)}
                    />
                  ))}
            </div>
          </TabsContent>
          <TabsContent value="sell">
            {/* <ProductsGraph /> */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-3 md:p-6 gap-6">
              {isLoading
                ? // Show skeleton loading state
                  skeletonArray.map((_, i) => <SectorCardSkeleton key={i} />)
                : // Show actual sector cards
                  sectors?.map((x, i) => (
                    <SectorCard
                      sector={x.sectorName}
                      date="Aug 26 - Aug 28"
                      request={x.count}
                      key={i}
                      onClick={() => handleSectorClick(x)}
                    />
                  ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default Sectors;
