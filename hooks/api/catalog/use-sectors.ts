import { useApiQuery } from "@/lib/api-hooks";
import type { SectorResponse } from "../shared/types";

export const useSectors = () => {
  return useApiQuery<"/api/Catalog/sectors">("/api/Catalog/sectors");
};

export const useSectorsWithOptions = (
  options?: Parameters<typeof useApiQuery<"/api/Catalog/sectors">>[2]
) => {
  return useApiQuery<"/api/Catalog/sectors">(
    "/api/Catalog/sectors",
    undefined,
    options
  );
};
