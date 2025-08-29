"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A bar chart";
const yChartData = [
  { product: "Rice", quantity: 186 },
  { product: "Cocoa", quantity: 305 },
  { product: "Tobacco", quantity: 237 },
  { product: "Starch", quantity: 73 },
  { product: "Flour", quantity: 209 },
  { product: "Beans", quantity: 214 },
  { product: "Wheat", quantity: 300 },
  { product: "Coffee", quantity: 150 },
  { product: "Spices", quantity: 100 },
  { product: "Malt", quantity: 120 },
];

const yChartConfig = {
  quantity: {
    label: "Quantity",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const chartData = [
  { month: "Individual Buyer & Consumer", quantity: 186 },
  { month: "SME Owner", quantity: 305 },
  { month: "Distributer & Wholesaler", quantity: 237 },
  { month: "Large Company & Corporation", quantity: 73 },
  { month: "Supermarket & Retailer", quantity: 209 },
  { month: "Startup", quantity: 214 },
];
const chartConfig = {
  quantity: {
    label: "Quantity",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const OrganizationGraph = () => {
  return (
    <div className="flex gap-6">
      <Card className="w-full">
        <CardHeader>
          {/* <CardTitle>Bar Chart</CardTitle> */}
          <CardDescription className="flex items-center gap-3 text-xs">
            All Countries
            <div className="bg-[#074318] rounded-full h-2 w-2"></div> 500
            Requests
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
              <Bar dataKey="quantity" fill="#074318" radius={8} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader>
          {/* <CardTitle>Bar Chart - Horizontal</CardTitle> */}
          <CardDescription className="flex items-center gap-3 text-xs">
            Organization {">"} Business Association
            <div className="bg-[#074318] rounded-full h-2 w-2"></div> 500
            Requests
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
