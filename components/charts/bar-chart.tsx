"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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

export const description = "A bar chart";

const chartData = [
  { country: "Cameroon", desktop: 186 },
  { country: "South Africa", desktop: 305 },
  { country: "Tanzania", desktop: 237 },
  { country: "Uganda", desktop: 73 },
  { country: "Nigeria", desktop: 209 },
];

const chartConfig = {
  desktop: {
    label: "requests",
    color: "#074318",
  },
} satisfies ChartConfig;

export function InsightsBarChart() {
  return (
    <Card className="flex flex-col h-full  border-0 shadow-none pb-0 w-full bg-[#F9F7F1]  ">
      <CardHeader className=" pb-0 flex flex-row justify-between">
        <CardDescription>Top Requested Sectors</CardDescription>
        <CardDescription>Last Update: 26/08/25, 08:44PM</CardDescription>
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

        <TabsContent value={"import"} className="mt-auto">
          <Card className="flex flex-col h-full border-0 shadow-none  w-full bg-transparent ">
            <CardContent className="mt-auto ">
              <ChartContainer config={chartConfig} className="h-full   ">
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="country"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar
                    dataKey="desktop"
                    fill="var(--color-desktop)"
                    radius={30}
                    barSize={40}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value={"export"}>
          <Card className="flex flex-col h-full border-0 shadow-none  w-full  bg-transparent ">
            <CardContent className="mt-auto ">
              <ChartContainer config={chartConfig} className="h-full   ">
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="country"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar
                    dataKey="desktop"
                    fill="var(--color-desktop)"
                    radius={30}
                    barSize={40}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
