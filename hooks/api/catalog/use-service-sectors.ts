import { useApiQuery } from "@/lib/api-hooks";
import type { ServiceSectorResponse } from "../shared/types";

export const useServiceSectors = () => {
  return useApiQuery<"/api/Catalog/service-sectors">(
    "/api/Catalog/service-sectors"
  );
};

export const useServiceSectorsWithOptions = (
  options?: Parameters<typeof useApiQuery<"/api/Catalog/service-sectors">>[2]
) => {
  return useApiQuery<"/api/Catalog/service-sectors">(
    "/api/Catalog/service-sectors",
    undefined,
    options
  );
};
