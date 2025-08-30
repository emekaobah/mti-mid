import { useApiQuery } from "@/lib/api-hooks";
import type { TopBusinessTypesInsight, TradeType } from "../shared/types";

export interface UseBusinessTypesParams {
  direction?: TradeType;
  fromDate?: string;
  toDate?: string;
  take?: number;
}

export const useTopBusinessTypes = (params?: UseBusinessTypesParams) => {
  return useApiQuery<"/api/MarketInsights/business-types">(
    "/api/MarketInsights/business-types",
    params
  );
};

export const useTopBusinessTypesWithOptions = (
  params?: UseBusinessTypesParams,
  options?: Parameters<
    typeof useApiQuery<"/api/MarketInsights/business-types">
  >[2]
) => {
  return useApiQuery<"/api/MarketInsights/business-types">(
    "/api/MarketInsights/business-types",
    params,
    options
  );
};
