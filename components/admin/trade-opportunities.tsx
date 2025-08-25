"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getTradeOpportunities } from "@/lib/data/admin-dashboard-data";

export interface AdminTradeOpportunitiesProps {
  opportunities?: ReturnType<typeof getTradeOpportunities>;
}

export default function AdminTradeOpportunities({
  opportunities,
}: AdminTradeOpportunitiesProps) {
  const data = opportunities || getTradeOpportunities();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "high":
        return "bg-green-100 text-green-800 border-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-yellow-600";
    if (score >= 70) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Trade Opportunities</h3>
          <p className="text-sm text-muted-foreground">
            High-potential trade matches for strategic intervention
          </p>
        </div>
      </div>

      {/* Opportunity Cards */}
      <div className="grid gap-4">
        {data.map((opportunity, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <CardTitle className="text-base">
                    {opportunity.demand} Trade Opportunity
                  </CardTitle>
                </div>
                <Badge
                  variant="outline"
                  className={getStatusColor(opportunity.status)}
                >
                  {opportunity.status.toUpperCase()} Priority
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">
                    Demand Country
                  </div>
                  <div className="text-lg font-semibold">
                    {opportunity.demandCountry}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Looking for: {opportunity.demand}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">
                    Supply Country
                  </div>
                  <div className="text-lg font-semibold">
                    {opportunity.supply}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Can provide: {opportunity.demand}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">
                    Match Score
                  </div>
                  <div
                    className={`text-2xl font-bold ${getScoreColor(
                      opportunity.matchScore
                    )}`}
                  >
                    {opportunity.matchScore}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Strategic priority rating
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Match Quality</span>
                  <span className="font-medium">{opportunity.matchScore}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      opportunity.matchScore >= 90
                        ? "bg-green-500"
                        : opportunity.matchScore >= 80
                        ? "bg-yellow-500"
                        : opportunity.matchScore >= 70
                        ? "bg-orange-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${opportunity.matchScore}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Strategic Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.length}</div>
            <p className="text-xs text-muted-foreground">
              Identified strategic matches
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">High Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {data.filter((o) => o.status === "high").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Immediate intervention needed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                data.reduce((sum, o) => sum + o.matchScore, 0) / data.length
              )}
              %
            </div>
            <p className="text-xs text-muted-foreground">
              Overall strategic value
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Countries Involved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(data.flatMap((o) => [o.demandCountry, o.supply])).size}
            </div>
            <p className="text-xs text-muted-foreground">Strategic partners</p>
          </CardContent>
        </Card>
      </div>

      {/* Strategic Action Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Strategic Action Plan</CardTitle>
          <CardDescription>
            Recommended interventions for each opportunity level
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
              <div>
                <h4 className="font-medium">High-Priority Interventions</h4>
                <p className="text-sm text-muted-foreground">
                  Immediate diplomatic engagement and trade facilitation for
                  opportunities with scores above 85%. These represent the most
                  promising trade relationships requiring urgent attention.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2"></div>
              <div>
                <h4 className="font-medium">Medium-Priority Development</h4>
                <p className="text-sm text-muted-foreground">
                  Medium-priority matches require market development, capacity
                  building, and relationship building over the next 6-12 months
                  to reach high-priority status.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
              <div>
                <h4 className="font-medium">Cross-Sector Coordination</h4>
                <p className="text-sm text-muted-foreground">
                  Coordinate efforts across different sectors and create value
                  chains that connect multiple countries for maximum economic
                  impact.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Implementation Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Implementation Timeline</CardTitle>
          <CardDescription>
            Strategic timeline for opportunity development
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <h4 className="font-medium text-green-800">
                  Immediate (0-3 months)
                </h4>
                <p className="text-sm text-green-600">
                  High-priority diplomatic engagement
                </p>
              </div>
              <Badge variant="outline" className="bg-green-100 text-green-800">
                {data.filter((o) => o.status === "high").length} opportunities
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <h4 className="font-medium text-yellow-800">
                  Short-term (3-6 months)
                </h4>
                <p className="text-sm text-yellow-600">
                  Market development and capacity building
                </p>
              </div>
              <Badge
                variant="outline"
                className="bg-yellow-100 text-yellow-800"
              >
                {data.filter((o) => o.status === "medium").length} opportunities
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <h4 className="font-medium text-blue-800">
                  Long-term (6-12 months)
                </h4>
                <p className="text-sm text-blue-600">
                  Infrastructure and policy development
                </p>
              </div>
              <Badge variant="outline" className="bg-blue-100 text-blue-800">
                Strategic planning
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
