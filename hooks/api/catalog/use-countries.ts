import { useApiQuery } from "@/lib/api-hooks";

export const useCountries = () => {
  return useApiQuery<"/api/Catalog/countries">("/api/Catalog/countries");
};

export const useCountriesWithOptions = (
  options?: Parameters<typeof useApiQuery<"/api/Catalog/countries">>[2]
) => {
  return useApiQuery<"/api/Catalog/countries">(
    "/api/Catalog/countries",
    undefined,
    options
  );
};
