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
} from "recharts";

export interface SubmissionTrendsProps {
  data: Array<{
    month: string;
    submissions: number;
  }>;
}

export default function AdminSubmissionTrends({ data }: SubmissionTrendsProps) {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-base">Submission Trends</CardTitle>
        <CardDescription>
          Monthly form submission patterns and growth analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
                formatter={(value: number) => [value, "Submissions"]}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Bar dataKey="submissions" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {Math.max(...data.map((d) => d.submissions))}
            </div>
            <p className="text-xs text-muted-foreground">Peak Month</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {Math.round(
                data.reduce((sum, d) => sum + d.submissions, 0) / data.length
              )}
            </div>
            <p className="text-xs text-muted-foreground">Average</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {data.reduce((sum, d) => sum + d.submissions, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Total</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
