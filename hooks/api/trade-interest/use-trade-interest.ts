import { useApiQuery } from "@/lib/api-hooks";
import type { TradeType } from "../shared/types";

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
}

export const useSectorCount = (params?: UseSectorCountParams) => {
  return useApiQuery<"/api/TradeInterest/sector-count">(
    "/api/TradeInterest/sector-count",
    params
  );
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
