import { useApiQuery } from "@/lib/api-hooks";
import type { ProductResponse, ProductSearchResponse } from "../shared/types";

// Get products by sector
export const useProductsBySector = (sectorId: string | null) => {
  return useApiQuery<"/api/Catalog/products/{sectorId}">(
    `/api/Catalog/products/${sectorId}` as "/api/Catalog/products/{sectorId}",
    undefined,
    { enabled: !!sectorId }
  );
};

// Get product by HS code
export const useProductByHsCode = (code: string) => {
  return useApiQuery<"/api/Catalog/products/by-hscode/{code}">(
    `/api/Catalog/products/by-hscode/${code}` as "/api/Catalog/products/by-hscode/{code}",
    undefined,
    { enabled: !!code }
  );
};

// Search products
export interface ProductSearchParams {
  q?: string;
  sectorId?: string;
  hsPrefix?: string;
  take?: number;
}

export const useProductSearch = (params?: ProductSearchParams) => {
  return useApiQuery<"/api/Catalog/products/search">(
    "/api/Catalog/products/search",
    params
  );
};
