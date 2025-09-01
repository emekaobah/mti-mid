"use client";

import { TrendingUp } from "lucide-react";
import { PieChart, Pie, Cell } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export const description = "A radial chart with a label";

const chartData = [
  { browser: "Agriculture", visitors: 12, fill: "var(--color-chrome)" },
  { browser: "Business Services", visitors: 8, fill: "var(--color-safari)" },
  { browser: "Chemicals", visitors: 7, fill: "var(--color-firefox)" },
  {
    browser: "Furniture & Home Goods",
    visitors: 6,
    fill: "var(--color-edge)",
  },
  { browser: "Transport Services", visitors: 7, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

// Transform data to include fill property for colors using original chart colors
const transformData = (data: { key: string; value: number }[]) => {
  if (!data || data.length === 0) return [];

  return data.map((item, index) => ({
    browser: item.key,
    visitors: item.value,
    fill: chartData[index]?.fill || chartData[0]?.fill || "var(--color-chrome)",
  }));
};

// Fallback data for when no data is provided
const fallbackData = [
  { browser: "No Data", visitors: 1, fill: "var(--color-chrome)" },
];

interface InsightsRadialChartProps {
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

export function InsightsRadialChart({
  title,
  importData,
  exportData,
}: InsightsRadialChartProps) {
  // Transform and validate data
  const transformedImportData =
    importData && importData.length > 0
      ? transformData(importData as { key: string; value: number }[])
      : fallbackData;

  const transformedExportData =
    exportData && exportData.length > 0
      ? transformData(exportData as { key: string; value: number }[])
      : fallbackData;
  return (
    <Card className="flex flex-col h-full border-0 shadow-none bg-[#0A5C21]/[.03] w-full  ">
      <CardHeader className=" pb-0 flex flex-row justify-between">
        <CardDescription>{title || "Chart Titles"}</CardDescription>
        {/* <CardDescription>Last Update: 26/08/25, 08:44PM</CardDescription> */}
      </CardHeader>
      <Tabs defaultValue="import" className="mt-auto  h-full">
        <TabsList className="ml-5 bg-white">
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

        {/* import */}
        <TabsContent value={"import"} className=" mt-auto  ">
          <Card className="flex flex-col h-full border-0 shadow-none bg-transparent w-full  ">
            {/* <CardHeader className="items-center pb-0">
              <CardTitle>Radial Chart - Label</CardTitle>
              <CardDescription>January - June 2024</CardDescription>
            </CardHeader> */}
            <CardContent className="flex-1 pb-0  ">
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[270px]  "
              >
                {/* Render concentric Pie rings. Each ring is 24px thick and there are no gaps. */}
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent hideLabel nameKey="browser" />
                    }
                  />
                  {transformedImportData.map((d, i) => {
                    const thickness = 24; // px per ring
                    const inner = i * thickness; // innermost ring has inner=0 (filled)
                    const outer = inner + thickness;

                    // Pie expects numeric radii in pixels; using single-segment data renders a full ring
                    return (
                      <Pie
                        key={d.browser}
                        data={[{ name: d.browser, value: d.visitors }]}
                        dataKey="value"
                        startAngle={90}
                        endAngle={-270}
                        cx="50%"
                        cy="50%"
                        innerRadius={inner}
                        outerRadius={outer}
                        paddingAngle={0}
                        isAnimationActive={false}
                      >
                        <Cell fill={d.fill} />
                      </Pie>
                    );
                  })}
                </PieChart>
              </ChartContainer>

              {/* labels / legend */}

              <div className="mt-4  ">
                <ul className="space-y-3">
                  {transformedImportData.map((d) => (
                    <li key={d.browser} className="flex items-center gap-3">
                      {/* rectangular swatch */}
                      <span
                        className="w-7 h-4  inline-block shrink-0"
                        style={{ background: d.fill }}
                      />

                      {/* label and inline count */}
                      <span className="text-xs  text-[#3A3A3A] capitalize ">
                        {d.browser}
                      </span>

                      <span className="text-xs font-semibold text-emerald-700 ml-2">
                        {d.visitors}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* export */}

        <TabsContent value={"export"}>
          <Card className="flex flex-col h-full border-0 shadow-none bg-transparent w-full  ">
            <CardContent className="flex-1 pb-0 ">
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[270px] "
              >
                {/* Render concentric Pie rings. Each ring is 24px thick and there are no gaps. */}
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent hideLabel nameKey="browser" />
                    }
                  />
                  {transformedExportData.map((d, i) => {
                    const thickness = 24; // px per ring
                    const inner = i * thickness; // innermost ring has inner=0 (filled)
                    const outer = inner + thickness;

                    // Pie expects numeric radii in pixels; using single-segment data renders a full ring
                    return (
                      <Pie
                        key={d.browser}
                        data={[{ name: d.browser, value: d.visitors }]}
                        dataKey="value"
                        startAngle={90}
                        endAngle={-270}
                        cx="50%"
                        cy="50%"
                        innerRadius={inner}
                        outerRadius={outer}
                        paddingAngle={0}
                        isAnimationActive={false}
                      >
                        <Cell fill={d.fill} />
                      </Pie>
                    );
                  })}
                </PieChart>
              </ChartContainer>

              {/* labels / legend */}

              <div className="mt-auto">
                <ul className="space-y-3">
                  {transformedExportData.map((d) => (
                    <li key={d.browser} className="flex items-center gap-3">
                      {/* rectangular swatch */}
                      <span
                        className="w-7 h-4  inline-block shrink-0"
                        style={{ background: d.fill }}
                      />

                      {/* label and inline count */}
                      <span className="text-xs  text-[#3A3A3A] capitalize ">
                        {d.browser}
                      </span>

                      <span className="text-xs font-semibold text-emerald-700 ml-2">
                        {d.visitors}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
