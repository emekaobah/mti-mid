"use client";

import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductsGraph from "./products-graph";
import OrganizationGraph from "./organization-graph";
import { TableFilters } from "../table/filter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFilterStore from "@/hooks/store/useFilterStore";
import { useCountries } from "@/hooks/api";
import { useOrganizationTypes } from "@/hooks/api";
import { useProductChart, useOrgChart, useOrgBreakdown } from "@/hooks/api";
import { InsightsBarChart } from "../charts/bar-chart";
import {
  transformCountryData,
  transformSectorData,
} from "@/lib/utils/transform-sector-data";
import { useProductsBySector } from "@/hooks/api";
import OrgGraph from "./org-chart";
import OrgBreakdownGraph from "./orgBreakdown";

export function Graphs() {
  // useEffect(() => {}, []);
  const {
    countryGraphValue,
    setCountryGraphValue,
    hsCodeGraphValue,
    setHsCodeGraphValue,
    tradeType,
    sector,
  } = useFilterStore();

  const { data: countryOptions } = useCountries();
  const { data: hsCodes } = useProductsBySector(sector?.sectorId);

  const handleTabChange = () => {
    setCountryGraphValue("");
    setHsCodeGraphValue("");
  };

  const { data } = useProductChart({
    tradeType: tradeType === 1 ? 1 : 2,
    sectorId: sector.sectorId,
    ...(countryGraphValue !== "" && { countryCodes: countryGraphValue }),
    ...(hsCodeGraphValue !== "" && { hsCode: hsCodeGraphValue }),
  });

  useEffect(() => {
    console.log(countryGraphValue);
  }, [countryGraphValue]);

  const { data: orgChart } = useOrgChart({
    tradeType: tradeType === 1 ? 1 : 2,
    sectorId: sector.sectorId,
  });

  const { data: orgBreakdown } = useOrgBreakdown({
    tradeType: tradeType === 1 ? 1 : 2,
    parentId: "ORGTYPE_002",
    sectorId: sector.sectorId,
  });
  const selectedCountry = countryOptions?.data?.find(
    (option) => option.code === countryGraphValue
  )?.name;
  const selectedHsCode = hsCodes?.data?.find(
    (option) => option.hsCode === hsCodeGraphValue
  )?.hsCode;
  return (
    <div className="flex w-full flex-col gap-6 p-6">
      <Tabs defaultValue="countries" onValueChange={() => handleTabChange()}>
        <TabsList>
          <TabsTrigger value="countries">
            <Select
              value={countryGraphValue}
              onValueChange={(value) =>
                setCountryGraphValue(value === "all" ? "" : value)
              }
            >
              <SelectTrigger className="border-0 ring-0 outline-0 focus:border-0 focus:ring-0 focus:outline-0 focus-visible:border-0 focus-visible:ring-0 focus-visible:outline-0 data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 bg-transparent px-3 py-2 text-sm whitespace-nowrap transition-[color,box-shadow] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key="" value="all">
                  All
                </SelectItem>
                {countryOptions?.data?.map((option) => (
                  <SelectItem key={option.code} value={option.code ?? ""}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </TabsTrigger>
          <TabsTrigger value="hsCodes">
            <Select
              value={hsCodeGraphValue}
              onValueChange={(value) =>
                setHsCodeGraphValue(value === "all" ? "" : value)
              }
            >
              <SelectTrigger className="border-0 ring-0 outline-0 focus:border-0 focus:ring-0 focus:outline-0 focus-visible:border-0 focus-visible:ring-0 focus-visible:outline-0 data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 bg-transparent px-3 py-2 text-sm whitespace-nowrap transition-[color,box-shadow] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
                <SelectValue placeholder="Hs Codes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key="" value="all">
                  All
                </SelectItem>
                {hsCodes?.data?.map((option) => (
                  <SelectItem key={option.id} value={option.hsCode ?? ""}>
                    {option.hsCode}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </TabsTrigger>
          <TabsTrigger value="organization">Organization Type</TabsTrigger>
        </TabsList>
        <TabsContent value="countries">
          <ProductsGraph data={data} title={selectedCountry ?? ""} />
        </TabsContent>
        <TabsContent value="hsCodes">
          <ProductsGraph data={data} title={selectedHsCode ?? ""} />
        </TabsContent>
        <TabsContent value="organization">
          {/* <OrganizationGraph
            productsData={orgChart}
            organizationsData={orgBreakdown}
          /> */}
          <OrgGraph data={orgChart} />
          {/* <div className="flex gap-6">
            <OrgBreakdownGraph data={orgBreakdown} />
          </div> */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
