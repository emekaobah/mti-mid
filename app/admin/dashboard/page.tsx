import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Download,
  Filter,
  BarChart3,
  Globe,
  Users,
  TrendingUp,
  Building2,
  Package,
  Handshake,
  MapPin,
} from "lucide-react";

// Import admin dashboard components
import AdminMetricCards from "@/components/admin/metric-cards";
import AdminCountryDistribution from "@/components/admin/country-distribution";
import AdminOrganizationInsights from "@/components/admin/organization-insights";
import AdminTradeFlowAnalysis from "@/components/admin/trade-flow-analysis";
import AdminServiceAnalysis from "@/components/admin/service-analysis";
import AdminTradeOpportunities from "@/components/admin/trade-opportunities";
import AdminSubmissionTrends from "@/components/admin/submission-trends";
import AdminRegionalAnalysis from "@/components/admin/regional-analysis";
import AdminVolumeAnalysis from "@/components/admin/volume-analysis";

// Import data functions
import {
  getDashboardMetrics,
  getCountryDistribution,
  getOrganizationTypes,
  getBusinessTypes,
  getSectorDistribution,
  getServiceDistribution,
  getSubmissionTrends,
  getVolumeDistribution,
  getTradeOpportunities,
  getRecentSubmissions,
  getDataQualityMetrics,
  getFrequencyDistribution,
  getRegionalAnalysis,
} from "@/lib/data/admin-dashboard-data";

const AdminDashboardPage = () => {
  // Get data
  const metrics = getDashboardMetrics();
  const countryData = getCountryDistribution();
  const orgTypes = getOrganizationTypes();
  const businessTypes = getBusinessTypes();
  const sectorData = getSectorDistribution();
  const serviceData = getServiceDistribution();
  const trendsData = getSubmissionTrends();
  const volumeData = getVolumeDistribution();
  const opportunitiesData = getTradeOpportunities();
  const recentSubmissions = getRecentSubmissions();
  const dataQuality = getDataQualityMetrics();
  const regionalData = getRegionalAnalysis();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold">MTI Admin Dashboard</h1>
            </div>
            <Badge variant="secondary">Internal Use Only</Badge>
          </div>

          <div className="ml-auto flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 space-y-6 p-4 sm:p-6 lg:px-8">
        {/* Overview Metrics */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Strategic Overview
              </h2>
              <p className="text-muted-foreground">
                Internal insights for decision-making and policy development
              </p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span>Live data</span>
            </div>
          </div>
          <AdminMetricCards metrics={metrics} />
        </div>

        <Separator />

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger
              value="overview"
              className="flex items-center space-x-2"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger
              value="geographic"
              className="flex items-center space-x-2"
            >
              <Globe className="h-4 w-4" />
              <span>Geographic</span>
            </TabsTrigger>
            <TabsTrigger
              value="organizations"
              className="flex items-center space-x-2"
            >
              <Building2 className="h-4 w-4" />
              <span>Organizations</span>
            </TabsTrigger>
            <TabsTrigger value="trade" className="flex items-center space-x-2">
              <Package className="h-4 w-4" />
              <span>Trade Analysis</span>
            </TabsTrigger>
            <TabsTrigger
              value="services"
              className="flex items-center space-x-2"
            >
              <Handshake className="h-4 w-4" />
              <span>Services</span>
            </TabsTrigger>
            <TabsTrigger
              value="opportunities"
              className="flex items-center space-x-2"
            >
              <TrendingUp className="h-4 w-4" />
              <span>Opportunities</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Top Row: Geographic Distribution and Submission Trends */}
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>Geographic Distribution</span>
                  </CardTitle>
                  <CardDescription>
                    Strategic analysis of country participation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AdminCountryDistribution data={countryData} />
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Submission Trends</span>
                  </CardTitle>
                  <CardDescription>
                    Strategic insights from form submission patterns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AdminSubmissionTrends data={trendsData} />
                </CardContent>
              </Card>
            </div>

            {/* Bottom Row: Organization Types - Full Width for Better Space */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Organization Types</span>
                </CardTitle>
                <CardDescription>
                  Internal analysis of respondent organizations and business
                  types
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AdminOrganizationInsights
                  organizationTypes={orgTypes}
                  businessTypes={businessTypes}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Geographic Tab */}
          <TabsContent value="geographic" className="space-y-6">
            {/* Top Row: Country Distribution and Regional Analysis */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Country Distribution</CardTitle>
                  <CardDescription>
                    Strategic breakdown by country for policy planning
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AdminCountryDistribution data={countryData} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Regional Analysis</CardTitle>
                  <CardDescription>
                    Trade patterns by African regions for strategic planning
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AdminRegionalAnalysis data={regionalData} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Organizations Tab */}
          <TabsContent value="organizations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Organization Insights</CardTitle>
                <CardDescription>
                  Internal analysis for stakeholder engagement strategy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AdminOrganizationInsights
                  organizationTypes={orgTypes}
                  businessTypes={businessTypes}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trade Analysis Tab */}
          <TabsContent value="trade" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Trade Flow Analysis</CardTitle>
                  <CardDescription>
                    Strategic analysis of import/export patterns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AdminTradeFlowAnalysis
                    importData={sectorData.import}
                    exportData={sectorData.export}
                    frequencyData={getFrequencyDistribution()}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Volume Analysis</CardTitle>
                  <CardDescription>
                    Strategic insights for supply chain planning
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AdminVolumeAnalysis data={volumeData} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Service Analysis</CardTitle>
                <CardDescription>
                  Internal analysis for service trade policy development
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AdminServiceAnalysis
                  requestedServices={serviceData.requested}
                  offeredServices={serviceData.offered}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Opportunities Tab */}
          <TabsContent value="opportunities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Trade Opportunities</CardTitle>
                <CardDescription>
                  Strategic opportunities for intervention and policy
                  development
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AdminTradeOpportunities opportunities={opportunitiesData} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Data Management Section */}
        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Data Management</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Recent Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Today</span>
                    <Badge variant="secondary">12</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>This Week</span>
                    <Badge variant="secondary">89</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>This Month</span>
                    <Badge variant="secondary">342</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Data Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Complete Submissions</span>
                    <Badge variant="default">
                      {dataQuality.completeSubmissions}%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Valid Email</span>
                    <Badge variant="default">{dataQuality.validEmail}%</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Contact Info</span>
                    <Badge variant="secondary">
                      {dataQuality.contactInfo}%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Export All Data
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    <Filter className="h-4 w-4 mr-2" />
                    Advanced Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
