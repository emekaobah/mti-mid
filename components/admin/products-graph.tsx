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
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A bar chart";
const chartData = [
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

const chartConfig = {
  quantity: {
    label: "Quantity",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const ProductsGraph = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          {/* <CardTitle>Bar Chart</CardTitle> */}
          <CardDescription className="flex items-center gap-3 text-xs">
            All Countries
            <div className="bg-[#074318] rounded-full h-2 w-2"></div> 500
            Requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
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
              <Bar dataKey="quantity" fill="#074318" radius={8} width={10} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        {/* <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground leading-none">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter> */}
      </Card>
    </div>
  );
};

export default ProductsGraph;
