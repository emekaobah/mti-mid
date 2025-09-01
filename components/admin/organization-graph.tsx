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
import { OrgChart, OrgBreakdown } from "@/hooks/api/trade-interest/types";

interface OrganizationGraphProps {
  productsData: OrgChart[];
  organizationsData: OrgBreakdown[];
}

export const description = "A bar chart";

const yChartConfig = {
  count: {
    label: "Count",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const chartConfig = {
  count: {
    label: "Count",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const OrganizationGraph: React.FC<OrganizationGraphProps> = ({
  productsData,
  organizationsData,
}) => {
  // Transform products data for the first chart
  const yChartData = (productsData || []).map((item) => ({
    product: item.organizationType,
    quantity: item.count,
  }));

  // Debug logging to see what we're receiving
  console.log("organizationsData type:", typeof organizationsData);
  console.log("organizationsData value:", organizationsData);
  console.log("is Array:", Array.isArray(organizationsData));

  // Ensure we have arrays to work with
  const safeOrganizationsData = Array.isArray(organizationsData)
    ? organizationsData
    : [];
  const safeProductsData = Array.isArray(productsData) ? productsData : [];

  // Transform products data for the first chart
  const xChartData = safeProductsData.map((item) => ({
    product: item.organizationType,
    quantity: item.count,
  }));

  // Flatten and transform organizations data for the second chart
  const chartData = safeOrganizationsData.flatMap((breakdown) =>
    Array.isArray(breakdown?.organizations)
      ? breakdown.organizations.map((org) => ({
          month: org.organizationType,
          quantity: org.count,
        }))
      : []
  );

  // Calculate totals for each chart
  const productsTotal = safeProductsData.reduce(
    (sum, item) => sum + (item?.count || 0),
    0
  );

  // Calculate total from all organizations in all breakdowns
  const organizationsTotal = safeOrganizationsData.reduce((sum, breakdown) => {
    if (!Array.isArray(breakdown?.organizations)) return sum;
    return (
      sum +
      breakdown.organizations.reduce(
        (orgSum, org) => orgSum + (org?.count || 0),
        0
      )
    );
  }, 0);

  return (
    <div className="flex gap-6">
      <Card className="w-full">
        <CardHeader>
          <CardDescription className="flex items-center gap-3 text-xs">
            All Organizations
            <div className="bg-[#074318] rounded-full h-2 w-2"></div>
            {productsTotal} Requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={yChartConfig}>
            <BarChart accessibilityLayer data={yChartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="product"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="quantity"
                fill="#074318"
                radius={8}
                maxBarSize={30}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardDescription className="flex items-center gap-3 text-xs">
            Organization {">"} Business Association
            <div className="bg-[#074318] rounded-full h-2 w-2"></div>
            {organizationsTotal} Requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{
                left: -20,
              }}
            >
              <XAxis type="number" dataKey="quantity" hide />
              <YAxis
                dataKey="month"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="quantity" fill="#074318" radius={5} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganizationGraph;
