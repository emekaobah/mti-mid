"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { getOrganizationTypes, getBusinessTypes } from "@/lib/data/admin-dashboard-data";

export interface OrganizationInsightsProps {
  organizationTypes?: ReturnType<typeof getOrganizationTypes>;
  businessTypes?: ReturnType<typeof getBusinessTypes>;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"];

export default function OrganizationInsights({ 
  organizationTypes, 
  businessTypes 
}: OrganizationInsightsProps) {
  const orgData = organizationTypes || getOrganizationTypes();
  const businessData = businessTypes || getBusinessTypes();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Organization Insights</h3>
          <p className="text-sm text-muted-foreground">
            Analysis of respondent organizations and business types
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Organization Types Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Organization Types</CardTitle>
            <CardDescription>
              Distribution of respondent organization categories
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
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Business Types Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Business Types</CardTitle>
            <CardDescription>
              Breakdown of business categories within organizations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={businessData}
                  layout="horizontal"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="type" width={120} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Organizations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orgData.reduce((sum, org) => sum + org.count, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all organization types
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Most Common Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold">
              {orgData[0]?.type}
            </div>
            <p className="text-xs text-muted-foreground">
              {orgData[0]?.percentage}% of all organizations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Business Diversity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {businessData.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Different business categories
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Organization Type Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Organization Type Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {orgData.map((org, index) => (
              <div key={org.type} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="font-medium">{org.type}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground">
                    {org.count.toLocaleString()} organizations
                  </span>
                  <span className="text-sm font-medium bg-muted px-2 py-1 rounded">
                    {org.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
