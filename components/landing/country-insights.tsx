"use client";
import React from "react";
import { InsightsBarChart } from "../charts/bar-chart";
import { useTopCountries } from "@/hooks/api/market-insights/use-top-countries";
import {
  transformCountryData,
  transformSectorData,
} from "@/lib/utils/transform-sector-data";
import { useSectorCount } from "@/hooks/api";

const Chart = () => {
  const { data: topImportCountries } = useTopCountries({
    direction: 1,
    take: 5,
  });
  const { data: topExportCountries } = useTopCountries({
    direction: 2,
    take: 5,
  });

  const { data: topImportSectors } = useSectorCount({
    tradeType: 1,
  });

  const { data: topExportSectors } = useSectorCount({
    tradeType: 2,
  });

  console.log(topImportSectors, "This is topImportSectors");

  console.log(topImportCountries, "This is topImportCountries");
  console.log(topExportCountries, "This is topExportCountries");
  console.log("top Import Countries", topImportCountries?.data?.countries);
  console.log("top Export Countries", topExportCountries?.data?.countries);

  return (
    <div className=" bg-[#FCFCFC] rounded-4xl border-6 border-black p-4 lg:p-10 min-h-[780px] flex flex-col  ">
      <h3 className="font-semibold ">Country Insights</h3>
      <div className="flex flex-col lg:flex-row  gap-4  min-h-[680px] mt-4">
        <div className="lg:w-1/2 w-full">
          <InsightsBarChart
            title="Trade Requests"
            importData={transformCountryData(
              topImportCountries?.data?.countries
            )}
            exportData={transformCountryData(
              topExportCountries?.data?.countries
            )}
          />
        </div>
        <div className="lg:w-1/2 w-full">
          <InsightsBarChart
            title="Top Requested Sectors"
            importData={transformSectorData(topImportSectors?.slice(0, 5))}
            exportData={transformSectorData(topExportSectors?.slice(0, 5))}
            bgVariant="green"
          />
        </div>
      </div>
    </div>
  );
};

export default Chart;
