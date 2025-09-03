"use client";
import { InsightsBarChart } from "@/components/charts/bar-chart";
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
import { InsightsListTable } from "@/components/charts/insights-list-table";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const TradeInsightsPage = () => {
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
  const { isAuthenticated, isInitialized, userCountry } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isInitialized) {
      if (!isAuthenticated) {
        router.replace("/");
      } else if (userCountry === "NG") {
        router.replace("/trade-requests");
      }
    }
  }, [isAuthenticated, isInitialized, userCountry, router]);

  return (
    <div className="bg-[#FCFCFC] pb-20">
      <div className=" bg-[#F9F9F9]/[.9]  border-2 border-white rounded-lg mx-4 lg:mx-15 mt-3 flex flex-col gap-4 overflow-hidden">
        <div className="bg-[#F9F7F1] px-6 pt-8 py-5 ">
          <p className="text-[#181818] font-medium ">Trade Request Insights</p>
        </div>
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-8 my-6 
"
        >
          <InsightsBarChart
            title="Top Countries by Submissions"
            importData={transformCountryData(
              topImportCountries?.data?.countries
            )}
            exportData={transformCountryData(
              topExportCountries?.data?.countries
            )}
          />
          <InsightsListTable
            title="Most Popular HS Codes"
            importData={transformHsCodeData(
              popularImportHsCodes?.data?.hsCodes
            )}
            exportData={transformHsCodeData(
              popularExportHsCodes?.data?.hsCodes
            )}
          />
          <InsightsBarChart
            title="Top Product Sectors"
            importData={transformSectorData(
              topImportProductRequests?.data?.sectors
            )}
            exportData={transformSectorData(
              topExportProductRequests?.data?.sectors
            )}
            bgVariant="green"
          />
          <InsightsBarChart
            title="Top Service Sectors"
            importData={transformSectorData(
              topImportServiceSectors?.data?.sectors
            )}
            exportData={transformSectorData(
              topExportServiceSectors?.data?.sectors
            )}
          />

          <InsightsBarChart
            title="Top Organisations by Submissions"
            importData={transformOrganizationData(
              topImportOrganizationTypes?.data?.organizations
            )}
            exportData={transformOrganizationData(
              topExportOrganizationTypes?.data?.organizations
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default TradeInsightsPage;
