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

const countryOptions = [
  { label: "All", value: "all" },
  { label: "Agriculture", value: "Agriculture" },
  { label: "Chemicals", value: "Chemicals" },
  { label: "Building Materials", value: "Building Materials" },
];

export function Graphs() {
  // useEffect(() => {}, []);
  const { countryFilterValue, setCountryFilterValue } = useFilterStore();
  return (
    <div className="flex w-full flex-col gap-6 p-6">
      <Tabs defaultValue="countries">
        <TabsList>
          <TabsTrigger value="countries">
            {/* <TableFilters
              countryOptions={countryOptions}
              noGlobalSearch
              noBackground
            /> */}
            Countries
          </TabsTrigger>
          <TabsTrigger value="hsCodes">HS Codes</TabsTrigger>
          <TabsTrigger value="organization">Organization Type</TabsTrigger>
        </TabsList>
        <TabsContent value="countries">
          <ProductsGraph />
        </TabsContent>
        <TabsContent value="hsCodes">
          <ProductsGraph />
        </TabsContent>
        <TabsContent value="organization">
          <OrganizationGraph />
        </TabsContent>
      </Tabs>
    </div>
  );
}
