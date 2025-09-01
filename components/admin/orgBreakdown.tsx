"use client";

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

interface ChartData {
  organization: string;
  count: number;
}

interface OrganizationGraphProps {
  data: OrgBreakdown | null; // Allow null
}

export const description = "A bar chart";

const chartConfig = {
  count: {
    label: "Count",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const OrgBreakdownGraph: React.FC<OrganizationGraphProps> = ({ data }) => {
  // Guard against null/undefined data or missing organizationCounts
  if (!data || !data.organizations || !Array.isArray(data.organizations)) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-[300px]">
          <div>Loading organization data...</div>
        </CardContent>
      </Card>
    );
  }

  // Transform the organizationCounts array to match the chart's expected format
  const chartData: ChartData[] = data.organizations.map((item) => ({
    organization: item.organizationType,
    count: item.count,
  }));

  // Use the totalRequests from the data object
  const totalRequests = data.totalRequests;

  return (
    <div>
      <Card>
        <CardHeader>
          <CardDescription className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-2">
              Organization {">"} Business
              <div className="bg-[#074318] rounded-full h-2 w-2"></div>
              {totalRequests} Requests
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="w-[440px] h-[300px]">
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical" // ✅ makes it horizontal
            >
              <CartesianGrid horizontal={false} />
              <XAxis type="number" />
              <YAxis
                dataKey="organization"
                type="category"
                tickLine={false}
                axisLine={false}
                width={100} // ✅ adjust so labels fit
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="count"
                fill="#074318"
                radius={5}
                barSize={20} // ✅ control thickness
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrgBreakdownGraph;
