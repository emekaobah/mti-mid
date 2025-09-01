"use client";
import { InsightsBarChart } from "@/components/charts/bar-chart";
import { useTopBusinessTypes } from "@/hooks/api/market-insights/use-business-types";
import { usePopularHsCodes } from "@/hooks/api/market-insights/use-hs-codes";
import { useTopOrganizationTypes } from "@/hooks/api/market-insights/use-organization-types";
import { useTopCountries } from "@/hooks/api/market-insights/use-top-countries";
import {
  useTopProductSectors,
  useTopServiceSectors,
} from "@/hooks/api/market-insights/use-top-sectors";
import React, { useEffect } from "react";
import {
  transformSectorData,
  transformCountryData,
  transformOrganizationData,
  transformHsCodeData,
} from "@/lib/utils/transform-sector-data";
import { InsightsPieChart } from "@/components/charts/pie-chart";
import { InsightsRadialChart } from "@/components/charts/radial-chart";
import { InsightsListTable } from "@/components/charts/insights-list-table";

const TradeInsightsPage = () => {
  const { data: topBusinessTypes } = useTopBusinessTypes();
  const { data: topImportOrganizationTypes } = useTopOrganizationTypes({
    direction: 1,
  });
  const { data: topExportOrganizationTypes } = useTopOrganizationTypes({
    direction: 2,
  });

  const { data: popularImportHsCodes } = usePopularHsCodes({
    direction: 1,
    take: 5,
  });
  const { data: popularExportHsCodes } = usePopularHsCodes({
    direction: 2,
    take: 5,
  });

  const { data: topImportProductRequests } = useTopProductSectors({
    direction: 1,
    take: 5,
  });
  const { data: topExportProductRequests } = useTopProductSectors({
    direction: 2,
    take: 5,
  });
  const { data: topImportServiceSectors } = useTopServiceSectors({
    direction: 1,
    take: 5,
  });
  const { data: topExportServiceSectors } = useTopServiceSectors({
    direction: 2,
    take: 5,
  });
  const { data: topImportCountries } = useTopCountries({
    direction: 1,
    take: 5,
  });
  const { data: topExportCountries } = useTopCountries({
    direction: 2,
    take: 5,
  });

  return (
    <div className="bg-[#FCFCFC] pb-20">
      {" "}
      <div className=" bg-[#F9F9F9]/[.9]  border-2 border-white rounded-lg mx-4 lg:mx-15 mt-3 flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="lg:w-[60%] w-full">
            {" "}
            <InsightsRadialChart
              title="Top Countries by Submissions"
              importData={transformCountryData(topImportCountries?.countries)}
              exportData={transformCountryData(topExportCountries?.countries)}
            />
          </div>
          <div className="ww-full lg:w-[40%]">
            {" "}
            <InsightsListTable
              title="Most Popular HS Codes"
              importData={transformHsCodeData(popularImportHsCodes?.hsCodes)}
              exportData={transformHsCodeData(popularExportHsCodes?.hsCodes)}
            />
          </div>
        </div>
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-8 my-6 
"
        >
          <InsightsBarChart
            title="Top Product Sectors"
            importData={transformSectorData(topImportProductRequests?.sectors)}
            exportData={transformSectorData(topExportProductRequests?.sectors)}
          />
          <InsightsPieChart
            title="Top Service Sectors"
            importData={transformSectorData(topImportServiceSectors?.sectors)}
            exportData={transformSectorData(topExportServiceSectors?.sectors)}
          />

          <InsightsRadialChart
            title="Top Organisations by Submissions"
            importData={transformOrganizationData(
              topImportOrganizationTypes?.organizations
            )}
            exportData={transformOrganizationData(
              topExportOrganizationTypes?.organizations
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default TradeInsightsPage;
