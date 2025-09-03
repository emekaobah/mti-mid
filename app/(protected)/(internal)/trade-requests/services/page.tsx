"use client";

import React, { useEffect } from "react";
import { MoveLeft } from "lucide-react";
import { DataTable } from "@/components/table/data-table";
import { columns } from "./column";
import { useRouter } from "next/navigation";
import Configs from "@/lib/configs";
import useFilterStore from "@/hooks/store/useFilterStore";
import { useCountries } from "@/hooks/api";
import { useOrganizationTypes } from "@/hooks/api";

const SectorBreakdown = () => {
  const router = useRouter();
  const {
    sector,
    tradeType,
    setHsCodesFilterValue,
    setOrganizationFilterValue,
    setCountryFilterValue,
    setProductFilterValue,
  } = useFilterStore();

  useEffect(() => {
    setHsCodesFilterValue("");
    setOrganizationFilterValue("");
    setCountryFilterValue("");
    setProductFilterValue("");
  }, [
    setHsCodesFilterValue,
    setOrganizationFilterValue,
    setCountryFilterValue,
    setProductFilterValue,
  ]);

  const { data: countries } = useCountries();
  const { data: organizations } = useOrganizationTypes();

  const countryOptions = [
    { label: "All", value: "all" },
    ...(countries?.data
      ?.map((sector) => ({
        label: sector?.name,
        value: sector?.code,
      }))
      .filter(
        (item): item is { label: string; value: string } =>
          Boolean(item.label) && Boolean(item.value)
      ) ?? []),
  ];

  const orgOptions = [
    { label: "All", value: "all" },
    ...(organizations?.data
      ?.map((sector) => ({
        label: sector?.name,
        value: sector?.name,
      }))
      .filter(
        (item): item is { label: string; value: string } =>
          Boolean(item.label) && Boolean(item.value)
      ) ?? []),
  ];

  return (
    <main className="min-h-screen  bg-[#FCFCFC] lg:px-15 px-4 mx-auto">
      <div className="flex flex-col my-4 gap-2">
        {/* <div className="flex gap-4">
          <p className="text-xs">Powered by</p>
          <Image src={logo} alt="Access bank logo" />
        </div> */}
        {/* <div className="flex items-center gap-3" onClick={() => router.back()}>
          <MoveLeft />
          <p className="text-xs">Back</p>
        </div> */}
      </div>
      <div className=" flex flex-col border-white rounded-md bg-[#f9f9f9]">
        <div className="rounded-t-md bg-[#F9F7F1] p-6 flex flex-col gap-3">
          <div className="flex items-center gap-0.5">
            <h1 className="font-medium text-base">Trade Request Statistics</h1>
            {/* <Minus color="#F65D2F" className="rotate-90" />
            <p className="text-sm">Aug 26 - Aug 28</p> */}
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
                {tradeType === 1 ? "  Buy from Nigeria" : "  Sell to Nigeria"}
              </span>
            </p>
          </div>
        </div>
        {/* <div className="w-full">
          <Graphs />
        </div> */}
      </div>
      <div className="mt-10">
        <DataTable
          columns={columns}
          emptyTableText="No data found"
          baseUrl={`${Configs.baseUrl}api/TradeInterest/submissions-table`}
          organizationFilterOptions={orgOptions}
          countryFilterOptions={countryOptions}
          // productFilterOptions={productOptions}
          // hsCodesFilterOptions={hsCodeOptions}
          noGlobalSearch
        />
      </div>
    </main>
  );
};

export default SectorBreakdown;
