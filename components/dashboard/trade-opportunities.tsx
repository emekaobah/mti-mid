"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getTradeOpportunities } from "@/lib/data/admin-dashboard-data";

export interface TradeOpportunitiesProps {
  opportunities?: ReturnType<typeof getTradeOpportunities>;
}

export default function TradeOpportunities({ opportunities }: TradeOpportunitiesProps) {
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
            High-potential trade matches and recommendations
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
                  <div className={`text-2xl font-bold ${getScoreColor(opportunity.matchScore)}`}>
                    {opportunity.matchScore}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Compatibility rating
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

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.length}</div>
            <p className="text-xs text-muted-foreground">
              Identified matches
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">High Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {data.filter(o => o.status === "high").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Score ≥ 85%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(data.reduce((sum, o) => sum + o.matchScore, 0) / data.length)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Overall match quality
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Countries Involved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(data.flatMap(o => [o.demandCountry, o.supply])).size}
            </div>
            <p className="text-xs text-muted-foreground">
              Unique countries
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recommendations</CardTitle>
          <CardDescription>
            Suggested actions based on trade opportunities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
              <div>
                <h4 className="font-medium">High-Priority Matches</h4>
                <p className="text-sm text-muted-foreground">
                  Focus on opportunities with scores above 85%. These represent the most promising trade relationships.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2"></div>
              <div>
                <h4 className="font-medium">Market Development</h4>
                <p className="text-sm text-muted-foreground">
                  Medium-priority matches may require additional market development and relationship building.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
              <div>
                <h4 className="font-medium">Cross-Sector Opportunities</h4>
                <p className="text-sm text-muted-foreground">
                  Look for opportunities to connect different sectors and create value chains across countries.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
