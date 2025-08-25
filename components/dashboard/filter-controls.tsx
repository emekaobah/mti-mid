"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Filter } from "lucide-react";

interface FilterControlsProps {
  selectedCountry: string;
  selectedSector: string;
  selectedPeriod: string;
  selectedOrgType: string;
  selectedTradeType: string;
  onCountryChange: (value: string) => void;
  onSectorChange: (value: string) => void;
  onPeriodChange: (value: string) => void;
  onOrgTypeChange: (value: string) => void;
  onTradeTypeChange: (value: string) => void;
  onExportData: () => void;
}

export default function FilterControls({
  selectedCountry,
  selectedSector,
  selectedPeriod,
  selectedOrgType,
  selectedTradeType,
  onCountryChange,
  onSectorChange,
  onPeriodChange,
  onOrgTypeChange,
  onTradeTypeChange,
  onExportData,
}: FilterControlsProps) {
  const countries = [
    { value: "all", label: "All Countries" },
    { value: "KE", label: "Kenya" },
    { value: "GH", label: "Ghana" },
    { value: "ZA", label: "South Africa" },
    { value: "UG", label: "Uganda" },
    { value: "TZ", label: "Tanzania" },
    { value: "CM", label: "Cameroon" },
    { value: "EG", label: "Egypt" },
  ];

  const sectors = [
    { value: "all", label: "All Sectors" },
    { value: "agriculture", label: "Agriculture" },
    { value: "food-beverage", label: "Food & Beverage" },
    { value: "minerals-metals", label: "Minerals & Metals" },
    { value: "textiles", label: "Textiles & Apparel" },
    { value: "machinery", label: "Machinery & Electronics" },
    { value: "chemicals", label: "Chemicals" },
    { value: "services", label: "Services" },
  ];

  const periods = [
    { value: "6months", label: "Last 6 Months" },
    { value: "1year", label: "Last Year" },
    { value: "2years", label: "Last 2 Years" },
    { value: "all", label: "All Time" },
  ];

  const orgTypes = [
    { value: "all", label: "All Types" },
    { value: "government", label: "Government" },
    { value: "business", label: "Business Association" },
    { value: "cooperative", label: "Cooperative/Farmers" },
    { value: "other", label: "Other" },
  ];

  const tradeTypes = [
    { value: "both", label: "Import & Export" },
    { value: "import", label: "Import Only" },
    { value: "export", label: "Export Only" },
  ];

  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filters:</span>
          </div>

          <Select value={selectedCountry} onValueChange={onCountryChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedSector} onValueChange={onSectorChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sector" />
            </SelectTrigger>
            <SelectContent>
              {sectors.map((sector) => (
                <SelectItem key={sector.value} value={sector.value}>
                  {sector.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedPeriod} onValueChange={onPeriodChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              {periods.map((period) => (
                <SelectItem key={period.value} value={period.value}>
                  {period.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedOrgType} onValueChange={onOrgTypeChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Organization Type" />
            </SelectTrigger>
            <SelectContent>
              {orgTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedTradeType} onValueChange={onTradeTypeChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Trade Type" />
            </SelectTrigger>
            <SelectContent>
              {tradeTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="ml-auto">
            <Button onClick={onExportData} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
