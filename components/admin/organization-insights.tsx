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
  Legend,
} from "recharts";
import {
  getOrganizationTypes,
  getBusinessTypes,
} from "@/lib/data/admin-dashboard-data";

export interface AdminOrganizationInsightsProps {
  organizationTypes?: ReturnType<typeof getOrganizationTypes>;
  businessTypes?: ReturnType<typeof getBusinessTypes>;
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
];

export default function AdminOrganizationInsights({
  organizationTypes,
  businessTypes,
}: AdminOrganizationInsightsProps) {
  const orgData = organizationTypes || getOrganizationTypes();
  const businessData = businessTypes || getBusinessTypes();

  return (
    <div className="space-y-6">
      {/* Header with compact breakdown */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">Organization Insights</h3>
          <p className="text-sm text-muted-foreground">
            Analysis of respondent organizations and business types
          </p>
        </div>
        {/* Compact breakdown in header */}
        <div className="text-right space-y-1">
          <div className="text-sm font-medium">Top Organization Types:</div>
          {orgData.slice(0, 3).map((org) => (
            <div key={org.type} className="text-xs text-muted-foreground">
              {org.type}: {org.count} ({org.percentage}%)
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Organization Types Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Organization Categories</CardTitle>
            <CardDescription>
              Distribution of respondent organization types
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orgData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ type, percentage }) => `${type} ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {orgData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Business Types - Vertical Bar Chart for better readability */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Business Categories</CardTitle>
            <CardDescription>
              Breakdown of business types within organizations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={businessData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 80 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="type"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compact Summary Stats */}
      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center space-x-6">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">
              {orgData
                .reduce((sum, org) => sum + org.count, 0)
                .toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">
              Total Organizations
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">
              {businessData.length}
            </div>
            <div className="text-xs text-muted-foreground">
              Business Categories
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">
              {orgData[0]?.type}
            </div>
            <div className="text-xs text-muted-foreground">
              Leading Type ({orgData[0]?.percentage}%)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
