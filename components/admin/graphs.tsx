"use client";

import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductsGraph from "./products-graph";
import OrganizationGraph from "./organization-graph";

export function Graphs() {
  useEffect(() => {}, []);
  return (
    <div className="flex w-full flex-col gap-6 p-6">
      <Tabs defaultValue="countries">
        <TabsList>
          <TabsTrigger value="countries">Countries</TabsTrigger>
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
