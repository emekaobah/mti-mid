import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Globe, TrendingUp, Handshake } from "lucide-react";
import { getDashboardMetrics } from "@/lib/data/admin-dashboard-data";

export interface AdminMetricCardsProps {
  metrics?: ReturnType<typeof getDashboardMetrics>;
}

export default function AdminMetricCards({ metrics }: AdminMetricCardsProps) {
  const data = metrics || getDashboardMetrics();

  const metricCards = [
    {
      title: "Total Responses",
      value: data.totalResponses.toLocaleString(),
      description: "Form submissions received",
      icon: Users,
      trend: "+12.5%",
      trendDirection: "up" as const,
    },
    {
      title: "Unique Countries",
      value: data.uniqueCountries.toString(),
      description: "Countries represented",
      icon: Globe,
      trend: "+3",
      trendDirection: "up" as const,
    },
    {
      title: "Active Opportunities",
      value: data.activeOpportunities.toLocaleString(),
      description: "Trade opportunities identified",
      icon: Handshake,
      trend: "+8.2%",
      trendDirection: "up" as const,
    },
    {
      title: "Total Organizations",
      value: data.totalOrganizations.toLocaleString(),
      description: "Organizations engaged",
      icon: TrendingUp,
      trend: "+15.3%",
      trendDirection: "up" as const,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metricCards.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                {metric.description}
              </p>
              <div className="flex items-center pt-2">
                <span
                  className={`text-xs font-medium ${
                    metric.trendDirection === "up"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {metric.trend}
                </span>
                <span className="text-xs text-muted-foreground ml-1">
                  from last month
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
