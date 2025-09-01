import { useApiQuery, useApiQueryString } from "@/lib/api-hooks";
import type { TradeType } from "../shared/types";
import {
  ApiResponse,
  SectorCount,
  ProductChart,
  OrgChart,
  OrgBreakdown,
} from "./types";

// Get trade interest by country
export interface UseTradeInterestByCountryParams {
  tradeType?: TradeType;
  countryIds?: string[];
}

export const useTradeInterestByCountry = (
  params?: UseTradeInterestByCountryParams
) => {
  return useApiQuery<"/api/TradeInterest/trade-interest-by-country">(
    "/api/TradeInterest/trade-interest-by-country",
    params
  );
};

// Get sector count
export interface UseSectorCountParams {
  tradeType?: TradeType;
  countryCodes?: string[];
  sectorIds?: string[];
  serviceSectorIds?: string[];
  searchTerm?: string;
}

export const useSectorCount = (params?: UseSectorCountParams) => {
  const result = useApiQuery<"/api/TradeInterest/sector-count">(
    "/api/TradeInterest/sector-count",
    params
  );

  const apiResponse = result.data as ApiResponse<SectorCount[]> | undefined;
  const sectorsData = apiResponse?.data || [];

  return { ...result, data: sectorsData };
};

export const useApiQueryNew = (url: string, params?: string | number) => {
  return useApiQueryString<"/api/TradeInterest/sector-count">(url, params);
};

// Get trade interest by ID
export const useTradeInterestById = (id: string, asNoTracking?: boolean) => {
  return useApiQuery<"/api/TradeInterest/{id}">(
    `/api/TradeInterest/${id}` as "/api/TradeInterest/{id}",
    { asNoTracking },
    { enabled: !!id }
  );
};

// Get all trade interests with pagination
export interface UseTradeInterestsParams {
  pageNumber?: number;
  pageSize?: number;
}

export const useTradeInterests = (params?: UseTradeInterestsParams) => {
  return useApiQuery<"/api/TradeInterest">("/api/TradeInterest", params);
};

// Trade interest by organization chart

// Get product chart
export interface UseProductChartParams {
  tradeType: TradeType;
  countryCodes?: string[];
  sectorId?: string;
  serviceSectorIds?: string;
  organizationType?: string;
}

export const useProductChart = (params?: UseProductChartParams) => {
  const result = useApiQuery<"/api/TradeInterest/product-chart">(
    "/api/TradeInterest/product-chart",
    params
  );

  const apiResponse = result.data as ApiResponse<ProductChart[]> | undefined;
  const productData = apiResponse?.data || [];

  return { ...result, data: productData };
};

// Get org chart
export interface UseOrgChartParams {
  tradeType: TradeType;
  countryCodes?: string[];
  sectorId?: string;
  serviceSectorIds?: string;
  organizationType?: string;
}

export const useOrgChart = (params?: UseOrgChartParams) => {
  const result = useApiQuery<"/api/TradeInterest/organization-chart">(
    "/api/TradeInterest/organization-chart",
    params
  );

  const apiResponse = result.data as ApiResponse<OrgChart[]> | undefined;
  const productData = apiResponse?.data || [];

  return { ...result, data: productData };
};

// Get org breakdown
export interface UseOrgBreakdownParams {
  tradeType: TradeType;
  parentId: string;
  sectorId?: string;
  serviceSectorId?: string;
  countryCodes?: string[];
  hsCode?: string;
}

export const useOrgBreakdown = (params?: UseOrgBreakdownParams) => {
  const result = useApiQuery<"/api/TradeInterest/organization-breakdown">(
    "/api/TradeInterest/organization-breakdown",
    params
  );

  const apiResponse = result.data as ApiResponse<OrgBreakdown[]> | undefined;
  const productData = apiResponse?.data || [];

  return { ...result, data: productData };
};
