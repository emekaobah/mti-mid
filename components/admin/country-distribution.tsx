"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { getCountryDistribution } from "@/lib/data/admin-dashboard-data";

export interface AdminCountryDistributionProps {
  data?: ReturnType<typeof getCountryDistribution>;
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
  "#FFC658",
  "#FF6B6B",
];

export default function AdminCountryDistribution({ data }: AdminCountryDistributionProps) {
  const chartData = data || getCountryDistribution();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Country Distribution</h3>
          <p className="text-sm text-muted-foreground">
            Responses by African countries
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ country, percentage }) => `${country} ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="responses"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Detailed List */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Top Countries</h4>
          <div className="space-y-2">
            {chartData.slice(0, 6).map((country, index) => (
              <div key={country.code} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm font-medium">{country.country}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    {country.responses.toLocaleString()}
                  </span>
                  <span className="text-xs bg-muted px-2 py-1 rounded">
                    {country.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="pt-4 border-t">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total Responses</span>
              <span className="font-medium">
                {chartData.reduce((sum, country) => sum + country.responses, 0).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
