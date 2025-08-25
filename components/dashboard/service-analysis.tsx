"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { getServiceDistribution } from "@/lib/data/admin-dashboard-data";

export interface ServiceAnalysisProps {
  requestedServices?: ReturnType<typeof getServiceDistribution>["requested"];
  offeredServices?: ReturnType<typeof getServiceDistribution>["offered"];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"];

export default function ServiceAnalysis({ 
  requestedServices, 
  offeredServices 
}: ServiceAnalysisProps) {
  const requested = requestedServices || getServiceDistribution().requested;
  const offered = offeredServices || getServiceDistribution().offered;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Service Trade Analysis</h3>
          <p className="text-sm text-muted-foreground">
            Service trade patterns and opportunities
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Requested Services */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Requested Services</CardTitle>
            <CardDescription>
              Services organizations want to import
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={requested}
                  layout="horizontal"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="service" width={120} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#0088FE" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Offered Services */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Offered Services</CardTitle>
            <CardDescription>
              Services organizations can export
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={offered}
                  layout="horizontal"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="service" width={120} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#00C49F" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service Distribution Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Service Distribution Overview</CardTitle>
          <CardDescription>
            Comparison of requested vs offered services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={requested}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ service, percentage }) => `${service} ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {requested.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Top Requested Services</h4>
              <div className="space-y-3">
                {requested.slice(0, 5).map((service, index) => (
                  <div key={service.service} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="font-medium text-sm">{service.service}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-muted-foreground">
                        {service.count} requests
                      </span>
                      <span className="text-sm font-medium bg-muted px-2 py-1 rounded">
                        {service.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Service Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Service Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {requested.reduce((sum, service) => sum + service.count, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all service categories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Service Offers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {offered.reduce((sum, service) => sum + service.count, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all service categories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Top Service Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold">
              {requested[0]?.service}
            </div>
            <p className="text-xs text-muted-foreground">
              {requested[0]?.count} requests ({requested[0]?.percentage}%)
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Service Match Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Service Match Analysis</CardTitle>
          <CardDescription>
            Potential service trade matches between countries
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {requested.slice(0, 5).map((requestedService, index) => {
              const offeredService = offered.find(off => off.service === requestedService.service);
              return (
                <div key={requestedService.service} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{requestedService.service}</span>
                    <div className="flex items-center space-x-4 text-xs">
                      <span className="text-blue-600">
                        Requested: {requestedService.count}
                      </span>
                      <span className="text-green-600">
                        Offered: {offeredService?.count || 0}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="flex-1 bg-blue-100 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(requestedService.count / requested[0].count) * 100}%` }}
                      />
                    </div>
                    <div className="flex-1 bg-green-100 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${((offeredService?.count || 0) / (offered[0]?.count || 1)) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
