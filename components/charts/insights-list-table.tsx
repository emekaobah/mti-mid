"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface InsightsListTableProps {
  title?: string;
  importData?: {
    key?: string | null;
    value?: number | undefined;
  }[];

  exportData?: {
    key?: string | null;
    value?: number | undefined;
  }[];
}

const ListItem = ({ itemKey, value }: { itemKey: string; value: number }) => {
  return (
    <div className="flex flex-row justify-between items-center bg-[#F9F9F9]/[.9] border-2 border-white px-4 py-3 rounded-md">
      <p className="text-sm  text-[#3A3A3A]">{itemKey}</p>
      <p className="text-sm font-semibold text-[#074318]">{value}</p>
    </div>
  );
};

export function InsightsListTable({
  title,
  importData,
  exportData,
}: InsightsListTableProps) {
  return (
    <Card className="flex flex-col h-full  border-0 shadow-none pb-0 w-full bg-[#074318]/[.03] ">
      <CardHeader className=" pb-0 flex flex-row justify-between">
        <CardDescription>{title || "Chart Title"}</CardDescription>
        {/* <CardDescription>Last Update: 26/08/25, 08:44PM</CardDescription> */}
      </CardHeader>
      <Tabs defaultValue="import" className=" h-full">
        <TabsList className=" bg-white ml-5">
          <TabsTrigger
            className="data-[state=active]:bg-[#074318] data-[state=active]:text-white rounded-sm text-xs font-normal"
            value="import"
          >
            Buy from Nigeria
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-[#074318] data-[state=active]:text-white rounded-sm text-xs font-normal"
            value="export"
          >
            Sell to Nigeria
          </TabsTrigger>
        </TabsList>

        <TabsContent value={"import"} className=" ">
          <Card className="flex flex-col h-full border-0 shadow-none  w-full bg-transparent ">
            <CardContent className=" flex flex-col gap-3">
              {importData?.map((item) =>
                item.key && item.value !== undefined ? (
                  <ListItem
                    key={item.key}
                    itemKey={item.key}
                    value={item.value}
                  />
                ) : null
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value={"export"}>
          <Card className="flex flex-col h-full border-0 shadow-none  w-full  bg-transparent ">
            <CardContent className=" ">
              {exportData?.map((item) =>
                item.key && item.value !== undefined ? (
                  <ListItem
                    key={item.key}
                    itemKey={item.key}
                    value={item.value}
                  />
                ) : null
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
