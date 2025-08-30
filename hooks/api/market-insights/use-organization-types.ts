import { useApiQuery } from "@/lib/api-hooks";
import type { TopOrganizationsInsight, TradeType } from "../shared/types";

export interface UseOrganizationTypesParams {
  direction?: TradeType;
  fromDate?: string;
  toDate?: string;
  take?: number;
}

export const useTopOrganizationTypes = (
  params?: UseOrganizationTypesParams
) => {
  return useApiQuery<"/api/MarketInsights/organization-types">(
    "/api/MarketInsights/organization-types",
    params
  );
};

export const useTopOrganizationTypesWithOptions = (
  params?: UseOrganizationTypesParams,
  options?: Parameters<
    typeof useApiQuery<"/api/MarketInsights/organization-types">
  >[2]
) => {
  return useApiQuery<"/api/MarketInsights/organization-types">(
    "/api/MarketInsights/organization-types",
    params,
    options
  );
};
