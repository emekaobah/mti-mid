"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import useFilterStore from "@/hooks/store/useFilterStore";

interface FilterOption {
  label: string;
  value: string | number;
}

interface TableFiltersProps {
  filterPlaceholder?: string;
  dateFilterPlaceholder?: string;
  statusFilterPlaceholder?: string;
  noDateFilter?: boolean;
  noGlobalSearch?: boolean;
  filterOptions?: FilterOption[];
  pendingValidationOptions?: FilterOption[];
  isNinFilterOptions?: FilterOption[];
  isUserApprovedFilterOptions?: FilterOption[];
  userRegistrationStatus?: FilterOption[];
  validationStateOptions?: FilterOption[];
  className?: string;
  statusToFilter?: string;
  institutions?: FilterOption[];
  customComponent?: React.ReactNode;
  organizationOptions?: FilterOption[];
  countryOptions?: FilterOption[];
  productOptions?: FilterOption[];
  hsCodeOptions?: FilterOption[];
  showSubmittedRequests?: boolean;
  noBackground?: boolean;
  productSectorOptions?: FilterOption[];
  serviceSectorOptions?: FilterOption[];
}

export function TableFilters({
  filterPlaceholder = "Search",
  dateFilterPlaceholder = "Pick a date",
  statusFilterPlaceholder = "Filter by status",
  noDateFilter,
  noGlobalSearch,
  filterOptions,
  pendingValidationOptions,
  isNinFilterOptions,
  isUserApprovedFilterOptions,
  userRegistrationStatus,
  validationStateOptions,
  className,
  statusToFilter,
  institutions,
  customComponent,
  organizationOptions,
  countryOptions,
  productOptions,
  hsCodeOptions,
  showSubmittedRequests,
  productSectorOptions,
  serviceSectorOptions,
  noBackground,
}: TableFiltersProps) {
  const {
    globalFilter,
    setGlobalFilter,
    organizationFilterValue,
    setOrganizationFilterValue,
    countryFilterValue,
    setCountryFilterValue,
    hsCodesFilterValue,
    setHsCodesFilterValue,
    productFilterValue,
    setProductFilterValue,
    productSectorFilterValue,
    serviceSectorFilterValue,
    setProductSectorFilterValue,
    setServiceSectorFilterValue,
  } = useFilterStore();

  return (
    <div
      className={cn(
        `grid grid-cols-2 ${
          showSubmittedRequests
            ? "bg-[#07431810]"
            : !noBackground
            ? "bg-[#8A38F505]"
            : ""
        } ${!noBackground && "p-3"} ${
          showSubmittedRequests ? "rounded-t-2xl" : "rounded-2xl"
        } md:flex items-center gap-2 md:gap-6 overflow-x-auto thin-scrollbar`,
        className
      )}
    >
      {showSubmittedRequests && (
        <div className="flex items-center gap-2 text-[10px] ">
          <div className="bg-[#074318] rounded-full h-2 w-2"></div>
          <p className="">Submitted Requests</p>
        </div>
      )}
      {/* Organization Filter */}
      {organizationOptions && organizationOptions.length > 0 && (
        <Select
          value={organizationFilterValue}
          onValueChange={(value) =>
            setOrganizationFilterValue(value === "all" ? "" : value)
          }
        >
          <SelectTrigger className="w-[150px] bg-white outline-none focus:ring-white border border-[#E7E7E7] text-[10px] text-[rgba(58,58,58,0.6)] p-3 rounded-[10px]">
            <SelectValue placeholder="Organization Type" />
          </SelectTrigger>
          <SelectContent>
            {organizationOptions.map((option) => (
              <SelectItem key={option.value} value={option.value.toString()}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {/* Country Filter */}
      {countryOptions && countryOptions.length > 0 && (
        <Select
          value={countryFilterValue}
          onValueChange={(value) =>
            setCountryFilterValue(value === "all" ? "all" : value)
          }
        >
          <SelectTrigger className="w-[150px] bg-white outline-none focus:ring-white border border-[#E7E7E7] text-[10px] text-[rgba(58,58,58,0.6)] p-3  rounded-[10px]">
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent>
            {countryOptions.map((option) => (
              <SelectItem key={option.value} value={option.value.toString()}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {/* Product Filter */}
      {productOptions && productOptions.length > 0 && (
        <Select
          value={productFilterValue}
          onValueChange={(value) =>
            setProductFilterValue(value === "all" ? "all" : value)
          }
        >
          <SelectTrigger className="w-[150px] bg-white outline-none focus:ring-white border border-[#E7E7E7] text-[10px] text-[rgba(58,58,58,0.6)] p-3 rounded-[10px]">
            <SelectValue placeholder="Product" />
          </SelectTrigger>
          <SelectContent>
            {productOptions.map((option) => (
              <SelectItem key={option.value} value={option.value.toString()}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {/* hsCode Filter */}
      {hsCodeOptions && hsCodeOptions.length > 0 && (
        <Select
          value={hsCodesFilterValue}
          onValueChange={(value) =>
            setHsCodesFilterValue(value === "all" ? "all" : value)
          }
        >
          <SelectTrigger className="w-[150px] bg-white outline-none focus:ring-white border border-[#E7E7E7] text-[10px] text-[rgba(58,58,58,0.6)] p-3 rounded-[10px]">
            <SelectValue placeholder="HS Codes" />
          </SelectTrigger>
          <SelectContent>
            {hsCodeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value.toString()}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {/* ProductSector */}
      {productSectorOptions && productSectorOptions.length > 0 && (
        <Select
          value={productSectorFilterValue}
          onValueChange={(value) =>
            setProductSectorFilterValue(value === "all" ? "all" : value)
          }
        >
          <SelectTrigger className="w-[150px] bg-white outline-none focus:ring-white border border-[#E7E7E7] text-[10px] text-[rgba(58,58,58,0.6)] p-3 rounded-[10px]">
            <SelectValue placeholder="Product Sectors" />
          </SelectTrigger>
          <SelectContent>
            {productSectorOptions.map((option) => (
              <SelectItem key={option.value} value={option.value.toString()}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {/* Service Sector */}
      {serviceSectorOptions && serviceSectorOptions.length > 0 && (
        <Select
          value={serviceSectorFilterValue}
          onValueChange={(value) =>
            setServiceSectorFilterValue(value === "all" ? "all" : value)
          }
        >
          <SelectTrigger className="w-[150px] bg-white outline-none focus:ring-white border border-[#E7E7E7] text-[10px] text-[rgba(58,58,58,0.6)] p-3 rounded-[10px]">
            <SelectValue placeholder="Service Sectors" />
          </SelectTrigger>
          <SelectContent>
            {serviceSectorOptions.map((option) => (
              <SelectItem key={option.value} value={option.value.toString()}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {/* Global Search */}
      {!noGlobalSearch && (
        <div className="flex gap-3 items-center bg-white rounded-[10px] p-3 w-[220px] focus:ring-white border border-[#E7E7E7]">
          <Search className="text-gray-400" size={14} />
          <input
            placeholder={filterPlaceholder}
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="text-[10px] text-[rgba(58,58,58,0.6)]  outline-none"
          />
        </div>
      )}
    </div>
  );
}
