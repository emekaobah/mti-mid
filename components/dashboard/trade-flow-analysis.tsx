"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from "recharts";
import { getSectorDistribution, getFrequencyDistribution } from "@/lib/data/admin-dashboard-data";

export interface TradeFlowProps {
  importData?: ReturnType<typeof getSectorDistribution>["import"];
  exportData?: ReturnType<typeof getSectorDistribution>["export"];
  frequencyData?: ReturnType<typeof getFrequencyDistribution>;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D", "#FFC658", "#FF6B6B"];

export default function TradeFlowAnalysis({ 
  importData, 
  exportData, 
  frequencyData 
}: TradeFlowProps) {
  const importSectors = importData || getSectorDistribution().import;
  const exportSectors = exportData || getSectorDistribution().export;
  const frequency = frequencyData || getFrequencyDistribution();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Trade Flow Analysis</h3>
          <p className="text-sm text-muted-foreground">
            Import and export patterns by sector and frequency
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Import Sectors */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Import Requirements</CardTitle>
            <CardDescription>
              Sectors with highest import demand
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={importSectors}
                  layout="horizontal"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="sector" width={120} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#0088FE" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Export Sectors */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Export Capabilities</CardTitle>
            <CardDescription>
              Sectors with highest export supply
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={exportSectors}
                  layout="horizontal"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="sector" width={120} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#00C49F" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trade Frequency Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Trade Frequency Distribution</CardTitle>
          <CardDescription>
            How often organizations want to trade
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={frequency}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ frequency, percentage }) => `${frequency} ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {frequency.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Frequency Breakdown</h4>
              <div className="space-y-3">
                {frequency.map((item, index) => (
                  <div key={item.frequency} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="font-medium">{item.frequency}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-muted-foreground">
                        {item.count.toLocaleString()} requests
                      </span>
                      <span className="text-sm font-medium bg-muted px-2 py-1 rounded">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trade Balance Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Import Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {importSectors.reduce((sum, sector) => sum + sector.count, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all sectors
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Export Offers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {exportSectors.reduce((sum, sector) => sum + sector.count, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all sectors
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Top Import Sector</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold">
              {importSectors[0]?.sector}
            </div>
            <p className="text-xs text-muted-foreground">
              {importSectors[0]?.count} requests ({importSectors[0]?.percentage}%)
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Sector Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Sector Comparison</CardTitle>
          <CardDescription>
            Import demand vs export supply by sector
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {importSectors.slice(0, 5).map((importSector, index) => {
              const exportSector = exportSectors.find(exp => exp.sector === importSector.sector);
              return (
                <div key={importSector.sector} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{importSector.sector}</span>
                    <div className="flex items-center space-x-4 text-xs">
                      <span className="text-blue-600">
                        Import: {importSector.count}
                      </span>
                      <span className="text-green-600">
                        Export: {exportSector?.count || 0}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="flex-1 bg-blue-100 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(importSector.count / importSectors[0].count) * 100}%` }}
                      />
                    </div>
                    <div className="flex-1 bg-green-100 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${((exportSector?.count || 0) / (exportSectors[0]?.count || 1)) * 100}%` }}
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
