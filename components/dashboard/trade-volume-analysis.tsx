"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";
import {
  getSubmissionTrends,
  getVolumeDistribution,
} from "@/lib/data/admin-dashboard-data";

export interface TradeVolumeAnalysisProps {
  frequencyData?: ReturnType<typeof getSubmissionTrends>;
  volumeData?: ReturnType<typeof getVolumeDistribution>;
}

export default function TradeVolumeAnalysis({
  frequencyData,
  volumeData,
}: TradeVolumeAnalysisProps) {
  const trends = frequencyData || getSubmissionTrends();
  const volume = volumeData || getVolumeDistribution();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Trade Volume Analysis</h3>
          <p className="text-sm text-muted-foreground">
            Submission trends and volume patterns over time
          </p>
        </div>
      </div>

      {/* Submission Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Submission Trends</CardTitle>
          <CardDescription>Monthly form submission activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={trends}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="submissions"
                  stroke="#0088FE"
                  strokeWidth={2}
                  dot={{ fill: "#0088FE", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Volume Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Volume Distribution</CardTitle>
          <CardDescription>
            Trade volumes by frequency and volume level
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="x" name="Volume" unit=" units" />
                <YAxis
                  type="number"
                  dataKey="y"
                  name="Frequency"
                  unit=" times/year"
                />
                <ZAxis type="number" range={[60, 400]} />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter
                  name="High Volume"
                  data={volume.filter((v) => v.volume === "High")}
                  fill="#FF6B6B"
                />
                <Scatter
                  name="Medium Volume"
                  data={volume.filter((v) => v.volume === "Medium")}
                  fill="#FFBB28"
                />
                <Scatter
                  name="Low Volume"
                  data={volume.filter((v) => v.volume === "Low")}
                  fill="#00C49F"
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Volume Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">
              Average Monthly Submissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                trends.reduce((sum, month) => sum + month.submissions, 0) /
                  trends.length
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Over the last 12 months
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Peak Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold">
              {
                trends.reduce((max, month) =>
                  month.submissions > max.submissions ? month : max
                ).month
              }
            </div>
            <p className="text-xs text-muted-foreground">
              {
                trends.reduce((max, month) =>
                  month.submissions > max.submissions ? month : max
                ).submissions
              }{" "}
              submissions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {trends
                .reduce((sum, month) => sum + month.submissions, 0)
                .toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              In the last 12 months
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Volume Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Volume Level Breakdown</CardTitle>
          <CardDescription>
            Distribution of trade volumes across different levels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {["High", "Medium", "Low"].map((level) => {
              const levelData = volume.filter((v) => v.volume === level);
              const totalCount = levelData.reduce(
                (sum, item) => sum + item.count,
                0
              );
              return (
                <div key={level} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{level} Volume</span>
                    <span className="text-sm text-muted-foreground">
                      {totalCount} organizations
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {levelData.map((item) => (
                      <div
                        key={item.frequency}
                        className="bg-muted p-2 rounded"
                      >
                        <div className="font-medium">{item.frequency}</div>
                        <div className="text-muted-foreground">
                          {item.count} orgs
                        </div>
                      </div>
                    ))}
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
