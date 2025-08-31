import { useApiQuery } from "@/lib/api-hooks";
import type { TopSectorsInsight, TradeType } from "../shared/types";
import { SectorsResponse } from "./types";

export interface UseTopSectorsParams {
  direction?: TradeType;
  fromDate?: string;
  toDate?: string;
  take?: number;
}

export const useTopProductSectors = (params?: UseTopSectorsParams) => {
  return useApiQuery<"/api/MarketInsights/product-sectors">(
    "/api/MarketInsights/product-sectors",
    params
  );
};

export const useTopServiceSectors = (params?: UseTopSectorsParams) => {
  return useApiQuery<"/api/MarketInsights/service-sectors">(
    "/api/MarketInsights/service-sectors",
    params
  );
};

export const useTopSectorsWithOptions = (
  params?: UseTopSectorsParams,
  options?: Parameters<
    typeof useApiQuery<"/api/MarketInsights/product-sectors">
  >[2]
) => {
  return useApiQuery<"/api/MarketInsights/product-sectors">(
    "/api/MarketInsights/product-sectors",
    params,
    options
  );
};
