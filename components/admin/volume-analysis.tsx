"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
} from "recharts";

export interface VolumeAnalysisProps {
  data: Array<{
    volume: string;
    frequency: string;
    count: number;
    x: number;
    y: number;
  }>;
}

export default function AdminVolumeAnalysis({ data }: VolumeAnalysisProps) {
  // Transform data for scatter plot
  const scatterData = data.map((item) => ({
    ...item,
    size: item.count * 2, // Use count to determine bubble size
  }));

  return (
    <div className="space-y-6">
      {/* Volume Distribution Scatter Plot */}
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              dataKey="x"
              name="Trade Volume"
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="number"
              dataKey="y"
              name="Frequency"
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <ZAxis type="number" dataKey="size" range={[60, 400]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
              }}
              formatter={(value: number, name: string) => [
                value.toLocaleString(),
                name === "x" ? "Volume" : name === "y" ? "Frequency" : "Count",
              ]}
            />
            <Scatter data={scatterData} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Volume Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">High Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {data
                .filter((item) => item.volume === "High")
                .reduce((sum, item) => sum + item.count, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Trade opportunities</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Medium Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {data
                .filter((item) => item.volume === "Medium")
                .reduce((sum, item) => sum + item.count, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Trade opportunities</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Low Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {data
                .filter((item) => item.volume === "Low")
                .reduce((sum, item) => sum + item.count, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Trade opportunities</p>
          </CardContent>
        </Card>
      </div>

      {/* Volume Breakdown Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Volume Breakdown</CardTitle>
          <CardDescription>
            Detailed analysis by volume and frequency
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.map((item, index) => (
              <div
                key={`${item.volume}-${item.frequency}`}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      item.volume === "High"
                        ? "bg-green-500"
                        : item.volume === "Medium"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  />
                  <div>
                    <div className="font-medium">{item.volume} Volume</div>
                    <div className="text-sm text-muted-foreground">
                      {item.frequency} frequency
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{item.count} opportunities</div>
                  <div className="text-sm text-muted-foreground">
                    Volume: {item.x.toLocaleString()}
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
