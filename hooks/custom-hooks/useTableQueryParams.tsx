import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import usePaginationStore from "../store/usePaginationStore";

interface UseTableQueryParams {
  baseUrl: string;
  globalFilter: string;
  pageSize?: number;
  searchQueryLabel?: string;
  organizationFilter: string;
  organizationFilterLabel: string | undefined;
  countryFilter: string;
  countryFilterLabel: string | undefined;
  productFilter: string;
  productFilterLabel: string | undefined;
  hsCodesFilter: string;
  hsCodesFilterLabel: string | undefined;
}

export const useTableQueryParams = ({
  baseUrl,
  globalFilter,
  pageSize = 12,
  searchQueryLabel,
  organizationFilter,
  organizationFilterLabel,
  countryFilter,
  countryFilterLabel,
  productFilter,
  productFilterLabel,
  hsCodesFilter,
  hsCodesFilterLabel,
}: UseTableQueryParams) => {
  const [debouncedGlobalFilter] = useDebounce(globalFilter, 300);

  const pageNumber = usePaginationStore((state) => state.pageNumber);
  const resetPageNumber = usePaginationStore((state) => state.resetPageNumber);

  // Reset page number when any filter changes
  useEffect(() => {
    resetPageNumber();
  }, [debouncedGlobalFilter, resetPageNumber]);

  const finalUrl = useMemo(() => {
    const url = new URL(baseUrl);

    if (organizationFilter) {
      url.searchParams.append(
        organizationFilterLabel ?? "OrganizationType",
        organizationFilter
      );
    }

    if (countryFilter) {
      url.searchParams.append(countryFilterLabel ?? "Country", countryFilter);
    }

    if (productFilter) {
      url.searchParams.append(productFilterLabel ?? "Product", productFilter);
    }

    if (hsCodesFilter) {
      url.searchParams.append(hsCodesFilterLabel ?? "HsCodes", hsCodesFilter);
    }

    if (debouncedGlobalFilter) {
      url.searchParams.append(
        searchQueryLabel || "Query",
        debouncedGlobalFilter.trim()
      );
    }

    url.searchParams.append("PageSize", pageSize.toString());
    url.searchParams.append("PageNumber", pageNumber.toString());

    return url.toString();
  }, [baseUrl, debouncedGlobalFilter, pageNumber, pageSize, searchQueryLabel]);

  return {
    finalUrl,
    debouncedGlobalFilter,
  };
};
