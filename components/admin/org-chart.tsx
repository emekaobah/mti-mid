"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { OrgChart } from "@/hooks/api/trade-interest/types";

interface ChartData {
  organization: string;
  count: number;
}

interface OrganizationGraphProps {
  data: OrgChart | null; // Allow null
}

export const description = "A bar chart";

const chartConfig = {
  count: {
    label: "Count",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const OrgGraph: React.FC<OrganizationGraphProps> = ({ data }) => {
  // Guard against null/undefined data or missing organizationCounts
  if (
    !data ||
    !data.organizationCounts ||
    !Array.isArray(data.organizationCounts)
  ) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-[300px]">
          <div>Loading organization data...</div>
        </CardContent>
      </Card>
    );
  }

  // Transform the organizationCounts array to match the chart's expected format
  const chartData: ChartData[] = data.organizationCounts.map((item) => ({
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
            All Organizations
            <div className="bg-[#074318] rounded-full h-2 w-2"></div>
            {totalRequests} Requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="w-full h-[300px]">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="organization"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                // tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="count"
                fill="#074318"
                radius={30}
                width={10}
                maxBarSize={30}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrgGraph;
