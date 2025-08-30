import { useApiQuery } from "@/lib/api-hooks";
import type { PopularHsCodesInsight, TradeType } from "../shared/types";

export interface UseHsCodesParams {
  direction?: TradeType;
  fromDate?: string;
  toDate?: string;
  take?: number;
}

export const usePopularHsCodes = (params?: UseHsCodesParams) => {
  return useApiQuery<"/api/MarketInsights/hs-codes">(
    "/api/MarketInsights/hs-codes",
    params
  );
};

export const usePopularHsCodesWithOptions = (
  params?: UseHsCodesParams,
  options?: Parameters<typeof useApiQuery<"/api/MarketInsights/hs-codes">>[2]
) => {
  return useApiQuery<"/api/MarketInsights/hs-codes">(
    "/api/MarketInsights/hs-codes",
    params,
    options
  );
};
