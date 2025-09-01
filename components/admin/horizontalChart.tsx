"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { OrgBreakdown } from "@/hooks/api/trade-interest/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOrgBreakdown } from "@/hooks/api";
import useFilterStore from "@/hooks/store/useFilterStore";

interface ChartData {
  product: string;
  count: number;
}

export const description = "A horizontal bar chart";

const chartConfig = {
  count: {
    label: "Count",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const HorizontalGraph: React.FC = () => {
  const [parentId, setParentId] = useState("ORGTYPE_002");
  const { tradeType, sector } = useFilterStore();

  const { data } = useOrgBreakdown({
    tradeType: tradeType === 1 ? 1 : 2,
    parentId: parentId,
    sectorId: sector.sectorId,
  });

  // Guard against undefined/null data
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-[300px]">
          <div>Loading breakdown data...</div>
        </CardContent>
      </Card>
    );
  }

  // Transform the data - assuming each item has organizations array
  const chartData: ChartData[] = data
    .filter((item) => item?.organizations && item.organizations.length > 0)
    .map((item) => ({
      product: item.organizations[0]?.organizationType || "Unknown",
      count: item.organizations[0]?.count || 0,
    }));

  // Calculate total requests
  const totalRequests = chartData.reduce((sum, item) => sum + item.count, 0);

  const businessTypes = [
    {
      label: "Business",
      value: "ORGTYPE_002",
    },
    {
      label: "Association",
      value: "ORGTYPE_003",
    },
  ];

  return (
    <div>
      <Card>
        <CardHeader>
          <CardDescription className="flex items-center gap-3 text-xs justify-between">
            <div className="flex items-center gap-2">
              Organization {">"} Business
              <div className="bg-[#074318] rounded-full h-2 w-2"></div>
              {totalRequests} Requests
            </div>
            <Select
              value={parentId}
              onValueChange={(value) => setParentId(value)}
            >
              <SelectTrigger className="border-0 ring-0 outline-0 focus:border-0 focus:ring-0 focus:outline-0 focus-visible:border-0 focus-visible:ring-0 focus-visible:outline-0 data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 bg-transparent px-3 py-2 text-sm whitespace-nowrap transition-[color,box-shadow] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
                <SelectValue placeholder="Organization Type" />
              </SelectTrigger>
              <SelectContent>
                {businessTypes?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="w-[420px] h-[300px]">
            <BarChart data={chartData} layout="vertical" accessibilityLayer>
              <CartesianGrid horizontal={false} />
              <XAxis type="number" />
              <YAxis
                dataKey="product"
                type="category"
                tickLine={false}
                axisLine={false}
                width={65}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="count" fill="#074318" radius={5} barSize={20} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default HorizontalGraph;
