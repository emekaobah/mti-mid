"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export interface RegionalAnalysisProps {
  data: Array<{
    region: string;
    countries: number;
    submissions: number;
    tradeVolume: number;
    percentage: number;
  }>;
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
];

export default function AdminRegionalAnalysis({ data }: RegionalAnalysisProps) {
  return (
    <div className="space-y-6">
      {/* Regional Distribution Chart */}
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="region"
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
              }}
              formatter={(value: number, name: string) => [
                value.toLocaleString(),
                name === "submissions" ? "Submissions" : "Trade Volume",
              ]}
            />
            <Bar dataKey="submissions" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="tradeVolume" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Regional Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Regions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {data.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Active African regions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Leading Region</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold">{data[0]?.region}</div>
            <p className="text-xs text-muted-foreground">
              {data[0]?.submissions} submissions ({data[0]?.percentage}%)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Countries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {data.reduce((sum, region) => sum + region.countries, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Across all regions</p>
          </CardContent>
        </Card>
      </div>

      {/* Regional Breakdown Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Regional Breakdown</CardTitle>
          <CardDescription>
            Detailed analysis by African regions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.map((region, index) => (
              <div
                key={region.region}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <div>
                    <div className="font-medium">{region.region}</div>
                    <div className="text-sm text-muted-foreground">
                      {region.countries} countries
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">
                    {region.submissions} submissions
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {region.percentage}% of total
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
