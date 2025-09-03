"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
} from "recharts";

const tradeRequestsData = {
  buyFromNigeria: [
    { country: "Cameroon", value: 20, flag: "🇨🇲", fill: "#ef4444" },
    { country: "South Africa", value: 10, flag: "🇿🇦", fill: "#1e40af" },
    { country: "Tanzania", value: 7, flag: "🇹🇿", fill: "#000000" },
    { country: "Uganda", value: 5, flag: "🇺🇬", fill: "#f59e0b" },
    { country: "Nigeria", value: 3, flag: "🇳🇬", fill: "#10b981" },
  ],
  sellToNigeria: [
    { country: "Ghana", value: 12, flag: "🇬🇭", fill: "#ef4444" },
    { country: "Kenya", value: 9, flag: "🇰🇪", fill: "#1e40af" },
    { country: "Rwanda", value: 6, flag: "🇷🇼", fill: "#000000" },
    { country: "Mali", value: 4, flag: "🇲🇱", fill: "#f59e0b" },
    { country: "Senegal", value: 2, flag: "🇸🇳", fill: "#10b981" },
  ],
};

const chartConfig = {
  country: { label: "Country" },
  value: { label: "Requests" },
};

export default function TradeRequestsChart() {
  const [activeMode, setActiveMode] = useState<
    "buyFromNigeria" | "sellToNigeria"
  >("buyFromNigeria");

  const data = tradeRequestsData[activeMode];

  return (
    <Card className="h-full">
      <CardHeader className="flex items-start justify-between gap-4">
        <div>
          <CardTitle className="text-sm">Trade Requests</CardTitle>
          <div className="text-xs text-muted-foreground">
            Last Update: 26/08/25, 08:44PM
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={activeMode === "buyFromNigeria" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveMode("buyFromNigeria")}
            className={
              activeMode === "buyFromNigeria"
                ? "bg-orange-500 hover:bg-orange-600"
                : ""
            }
          >
            Buy From Nigeria
          </Button>
          <Button
            variant={activeMode === "sellToNigeria" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveMode("sellToNigeria")}
            className={
              activeMode === "sellToNigeria"
                ? "bg-orange-500 hover:bg-orange-600"
                : ""
            }
          >
            Sell to Nigeria
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 20, left: 20, bottom: 40 }}
            >
              <XAxis
                dataKey="country"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#6b7280" }}
              />
              <YAxis hide />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
