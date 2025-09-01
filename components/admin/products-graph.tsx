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
import { ProductChart } from "@/hooks/api/trade-interest/types";

interface ProductData {
  productName: string;
  count: number;
}

interface ProductsGraphProps {
  data: ProductChart[];
}

export const description = "A bar chart";

const chartConfig = {
  count: {
    label: "Count",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const ProductsGraph: React.FC<ProductsGraphProps> = ({ data }) => {
  // Transform the data to match the chart's expected format
  const chartData = data.map((item) => ({
    product: item.productName,
    count: item.count,
  }));

  // Calculate total requests for display
  const totalRequests = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardDescription className="flex items-center gap-3 text-xs">
            All Countries
            <div className="bg-[#074318] rounded-full h-2 w-2"></div>
            {totalRequests} Requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="w-full h-[300px]">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="product"
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

export default ProductsGraph;
