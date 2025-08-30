import { useApiQuery } from "@/lib/api-hooks";
import type { TopCountriesInsight, TradeType } from "../shared/types";

export interface UseTopCountriesParams {
  direction?: TradeType;
  fromDate?: string;
  toDate?: string;
  take?: number;
}

export const useTopCountries = (params?: UseTopCountriesParams) => {
  return useApiQuery<"/api/MarketInsights/countries">(
    "/api/MarketInsights/countries",
    params
  );
};

export const useTopCountriesWithOptions = (
  params?: UseTopCountriesParams,
  options?: Parameters<typeof useApiQuery<"/api/MarketInsights/countries">>[2]
) => {
  return useApiQuery<"/api/MarketInsights/countries">(
    "/api/MarketInsights/countries",
    params,
    options
  );
};
