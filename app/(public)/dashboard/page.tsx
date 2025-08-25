"use client";

import { useState } from "react";
import MetricCards from "@/components/dashboard/metric-cards";
import AfricaTradeMap from "@/components/dashboard/africa-trade-map";
import TopParticipatingCountries from "@/components/dashboard/top-participating-countries";
import TradeFlowAnalysis from "@/components/dashboard/trade-flow-analysis";
import OrganizationInsights from "@/components/dashboard/organization-insights";
import ServiceAnalysis from "@/components/dashboard/service-analysis";
import TradeOpportunities from "@/components/dashboard/trade-opportunities";
import TradeVolumeAnalysis from "@/components/dashboard/trade-volume-analysis";
import FilterControls from "@/components/dashboard/filter-controls";
import {
  getDashboardMetrics,
  getCountryDistribution,
  getSectorDistribution,
  getOrganizationTypes,
  getBusinessTypes,
  getServiceDistribution,
  getTradeOpportunities,
  getFrequencyDistribution,
  getSubmissionTrends,
  getVolumeDistribution,
} from "@/lib/data/dashboard-data";

export default function DashboardPage() {
  // Filter states
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedSector, setSelectedSector] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("6months");
  const [selectedOrgType, setSelectedOrgType] = useState("all");
  const [selectedTradeType, setSelectedTradeType] = useState("both");

  // Get data (in a real app, these would be filtered based on the state)
  const metrics = getDashboardMetrics();
  const countryData = getCountryDistribution();
  const sectorData = getSectorDistribution();
  const organizationTypes = getOrganizationTypes();
  const businessTypes = getBusinessTypes();
  const serviceData = getServiceDistribution();
  const opportunities = getTradeOpportunities();
  const trendData = getSubmissionTrends();
  const volumeData = getVolumeDistribution();

  const handleExportData = () => {
    // In a real app, this would export filtered data
    console.log("Exporting data with filters:", {
      selectedCountry,
      selectedSector,
      selectedPeriod,
      selectedOrgType,
      selectedTradeType,
    });
    alert("Data export functionality would be implemented here");
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          MTI Trade Insights Dashboard
        </h1>
        <p className="text-muted-foreground">
          Comprehensive analysis of African trade opportunities with Nigeria
        </p>
      </div>

      {/* Filter Controls */}
      <FilterControls
        selectedCountry={selectedCountry}
        selectedSector={selectedSector}
        selectedPeriod={selectedPeriod}
        selectedOrgType={selectedOrgType}
        selectedTradeType={selectedTradeType}
        onCountryChange={setSelectedCountry}
        onSectorChange={setSelectedSector}
        onPeriodChange={setSelectedPeriod}
        onOrgTypeChange={setSelectedOrgType}
        onTradeTypeChange={setSelectedTradeType}
        onExportData={handleExportData}
      />

      {/* Overview Metrics */}
      <MetricCards metrics={metrics} />

      {/* Dashboard Charts Grid */}
      <div className="grid grid-cols-1  lg:grid-cols-2 gap-6">
        {/* Top row: Africa Trade Map, Top Participating Countries, High Potential Matches */}
        <AfricaTradeMap />
        <TopParticipatingCountries data={countryData} />
        <TradeOpportunities opportunities={opportunities} />

        {/* Charts */}
        <TradeFlowAnalysis
          importData={sectorData.import}
          exportData={sectorData.export}
        />
        <OrganizationInsights
          organizationTypes={organizationTypes}
          businessTypes={businessTypes}
        />
        <ServiceAnalysis
          requestedServices={serviceData.requested}
          offeredServices={serviceData.offered}
        />
        <TradeVolumeAnalysis
          frequencyData={trendData}
          volumeData={volumeData}
        />
      </div>

      {/* Footer */}
      <div className="border-t pt-6 text-center text-sm text-muted-foreground">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <span>📊 Data updated: 2 hours ago</span>
          <span>📈 Next update: In 4 hours</span>
          <span>💡 Insights: 24 new opportunities</span>
        </div>
      </div>
    </div>
  );
}
