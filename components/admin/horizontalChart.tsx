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

interface ProductData {
  productName: string;
  count: number;
}

interface ProductsGraphProps {
  data: OrgBreakdown[];
}

export const description = "A horizontal bar chart";

const chartConfig = {
  count: {
    label: "Count",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const HorizontalGraph: React.FC<ProductsGraphProps> = ({ data }) => {
  // Transform the data
  const chartData = data.map((item) => ({
    product: item?.organizations[0]?.organizationType,
    count: item?.organizations[0]?.count,
  }));

  // Calculate total requests
  const totalRequests = data.reduce(
    (sum, item) => sum + item?.organizations[0]?.count,
    0
  );

  return (
    <div>
      <Card>
        <CardHeader>
          <CardDescription className="flex items-center gap-3 text-xs">
            Organization {">"} Business Association
            <div className="bg-[#074318] rounded-full h-2 w-2"></div>
            {totalRequests} Requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="w-[420px] h-[300px]">
            <BarChart
              data={chartData}
              layout="vertical" // 👈 makes it horizontal
              accessibilityLayer
            >
              <CartesianGrid horizontal={false} />{" "}
              {/* grid lines across x only */}
              <XAxis type="number" /> {/* counts */}
              <YAxis
                dataKey="product"
                type="category"
                tickLine={false}
                axisLine={false}
                width={65} // space for product labels
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
