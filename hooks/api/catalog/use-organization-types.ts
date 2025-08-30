import { useApiQuery } from "@/lib/api-hooks";
import type { OrganizationTypeResponse } from "../shared/types";

export const useOrganizationTypes = () => {
  return useApiQuery<"/api/Catalog/organization-types">(
    "/api/Catalog/organization-types"
  );
};

export const useOrganizationTypesWithOptions = (
  options?: Parameters<typeof useApiQuery<"/api/Catalog/organization-types">>[2]
) => {
  return useApiQuery<"/api/Catalog/organization-types">(
    "/api/Catalog/organization-types",
    undefined,
    options
  );
};

// Get organization subtypes by parent ID
export const useOrganizationSubtypes = (parentId: string) => {
  return useApiQuery<"/api/Catalog/organization-types/{parentId}/subtypes">(
    `/api/Catalog/organization-types/${parentId}/subtypes` as "/api/Catalog/organization-types/{parentId}/subtypes",
    undefined,
    { enabled: !!parentId }
  );
};
