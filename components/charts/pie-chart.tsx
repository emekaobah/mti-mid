"use client";

import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { TabsContent } from "@radix-ui/react-tabs";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

export const description = "A pie chart with a legend";

// Predefined color palette for sectors - maintaining existing 5-color scheme
const SECTOR_COLORS = [
  "#074318", // chrome
  "#0C6F28", // safari
  "#109435", // firefox
  "#15CB49", // edge
  "#21E85A", // other
];

// Transform data to include fill property for colors
const transformData = (data: { key: string; value: number }[]) => {
  if (!data || data.length === 0) return [];

  return data.map((item, index) => ({
    name: item.key,
    value: item.value,
    fill: `var(--color-sector-${index})`,
    sectorKey: `sector-${index}`, // Add this to match chart config keys
  }));
};

// Create dynamic chart config based on data
const createChartConfig = (data: { key: string; value: number }[]) => {
  if (!data || data.length === 0) return {};

  const config: ChartConfig = {};

  data.forEach((item, index) => {
    config[`sector-${index}`] = {
      label: item.key,
      color: SECTOR_COLORS[index % SECTOR_COLORS.length],
    };
  });

  return config;
};

// Fallback data for when no data is provided
const fallbackData = [{ name: "No Data", value: 1, fill: "#6B7280" }];

const fallbackConfig = {
  "no-data": {
    label: "No Data",
    color: "#6B7280",
  },
} satisfies ChartConfig;

interface InsightsPieChartProps {
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

export function InsightsPieChart({
  title,
  importData,
  exportData,
}: InsightsPieChartProps) {
  // Transform and validate data
  const transformedImportData =
    importData && importData.length > 0
      ? transformData(importData as { key: string; value: number }[])
      : fallbackData;

  const transformedExportData =
    exportData && exportData.length > 0
      ? transformData(exportData as { key: string; value: number }[])
      : fallbackData;

  // Create dynamic chart configs
  const importChartConfig =
    importData && importData.length > 0
      ? createChartConfig(importData as { key: string; value: number }[])
      : fallbackConfig;

  const exportChartConfig =
    exportData && exportData.length > 0
      ? createChartConfig(exportData as { key: string; value: number }[])
      : fallbackConfig;

  return (
    <Card className="flex flex-col shadow-none border-0 w-full bg-[#074318]/[.03]">
      <CardHeader className=" pb-0 flex flex-row justify-between">
        <CardDescription>{title || "Chart Title"}</CardDescription>
        {/* <CardDescription>Last Update: 26/08/25, 08:44PM</CardDescription> */}
      </CardHeader>

      <Tabs defaultValue="import">
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
        <TabsContent value="import">
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={importChartConfig}
              className="mx-auto aspect-square max-h-[300px]"
            >
              <PieChart>
                <Pie data={transformedImportData} dataKey="value" />
                <ChartLegend
                  content={<ChartLegendContent nameKey="sectorKey" />}
                  className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </TabsContent>
        <TabsContent value="export">
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={exportChartConfig}
              className="mx-auto aspect-square max-h-[300px]"
            >
              <PieChart>
                <Pie data={transformedExportData} dataKey="value" />
                <ChartLegend
                  content={<ChartLegendContent nameKey="sectorKey" />}
                  className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
