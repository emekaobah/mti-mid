"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { PieChart, Pie, ResponsiveContainer } from "recharts";

const sectorsData = {
  buyFromNigeria: [
    { sector: "Agriculture", value: 12, fill: "#f97316" },
    { sector: "Business Services", value: 8, fill: "#eab308" },
    { sector: "Chemicals", value: 7, fill: "#84cc16" },
    { sector: "Furniture & Home Goods", value: 6, fill: "#06b6d4" },
    { sector: "Transport Services", value: 7, fill: "#fca5a5" },
    { sector: "Tourism Services", value: 6, fill: "#8b5cf6" },
  ],
  sellToNigeria: [
    { sector: "Agriculture", value: 9, fill: "#f97316" },
    { sector: "Auto Parts", value: 7, fill: "#eab308" },
    { sector: "Textiles", value: 5, fill: "#84cc16" },
    { sector: "Pharma", value: 4, fill: "#06b6d4" },
  ],
};

const chartConfig = {
  sector: { label: "Sector" },
  value: { label: "Requests" },
};

function SectorsRadialChart({
  data,
}: {
  data: typeof sectorsData.buyFromNigeria;
}) {
  const totalValue = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="relative w-56 h-56 mx-auto">
      <ChartContainer config={chartConfig} className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          {/*
            Render concentric, full-circle arcs by creating one RadialBar per sector.
            Each RadialBar gets its own inner/outer radius so they appear as stacked arcs.
            Use startAngle={90} and endAngle={-270} so the arcs make a full 360deg circle
            and start from the top.
          */}
          {/* Render concentric full-circle rings using multiple Pie elements */}
          <PieChart>
            {data.map((d, i) => {
              const ringHeight = 10; // percent per ring
              const gap = 2; // percent gap between rings
              const outer = 90 - i * (ringHeight + gap);
              const inner = outer - ringHeight;

              return (
                <Pie
                  key={d.sector}
                  data={[d]}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  startAngle={90}
                  endAngle={-270}
                  innerRadius={`${inner}%`}
                  outerRadius={`${outer}%`}
                  paddingAngle={0}
                  stroke="transparent"
                  fill={d.fill}
                />
              );
            })}
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-600">
            {totalValue}
          </div>
          <div className="text-xs text-gray-500">Total</div>
        </div>
      </div>
    </div>
  );
}

export default function TopRequestedSectorsChart() {
  const [activeMode, setActiveMode] = useState<
    "buyFromNigeria" | "sellToNigeria"
  >("buyFromNigeria");

  const data = sectorsData[activeMode];

  return (
    <Card className="h-full">
      <CardHeader className="flex items-start justify-between gap-4">
        <div>
          <CardTitle className="text-sm">Top Requested Sectors</CardTitle>
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
        <div className="flex flex-col items-center gap-4">
          <SectorsRadialChart data={data} />
          <div className="w-full max-w-xs">
            <ul className="grid gap-2">
              {data.map((d) => (
                <li key={d.sector} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded"
                    style={{ backgroundColor: d.fill }}
                  />
                  <div className="flex-1 text-sm text-muted-foreground">
                    {d.sector}
                  </div>
                  <div className="text-sm font-mono font-medium">{d.value}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
