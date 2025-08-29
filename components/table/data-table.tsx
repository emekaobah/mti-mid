"use client";

import React, { useEffect, useState } from "react";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
// import { useFetchTableData } from "@/hooks/fetchers/useFetchTableData";
import usePaginationStore from "@/hooks/store/usePaginationStore";
import { useTableQueryParams } from "@/hooks/custom-hooks/useTableQueryParams";
import { usePaginationControls } from "@/hooks/custom-hooks/useTablePaginationControls";
// import { useDownloadData } from "@/hooks/custom-hook/useDownloadTableData";
import { useTableInstance } from "@/hooks/custom-hooks/useTableInstance";
import useFilterStore from "@/hooks/store/useFilterStore";
import { TableFilters } from "./filter";
// import { TableActions } from "./table-action";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  emptyTableText: string;
  className?: string;
  filterPlaceholder?: string;
  filterOptions?: { label: string; value: string | number }[];
  statusToFilter?: keyof TData;
  statusfilterLabel?: string;
  statusFilterPlaceholder?: string;
  isExportable?: boolean;
  dateFilterPlaceholder?: string;
  baseUrl?: string;
  createData?: React.ReactNode;
  btnTheme?: "outline" | "default";
  noDateFilter?: boolean;
  noGlobalSearch?: boolean;
  role?: number;
  userId?: string;
  searchQueryLabel?: string;
  exportUrl?: string;
  pendingValidationOptions?: { label: string; value: string | number }[];
  isNinFilterOptions?: { label: string; value: string | number }[];
  isUserApprovedFilterOptions?: { label: string; value: string | number }[];
  userRegistrationStatus?: { label: string; value: string | number }[];
  userValidationStatus?: { label: string; value: string | number }[];
  validationStateOptions?: { label: string; value: string | number }[];
  isUser?: boolean;
  organizationFilterOptions?: { label: string; value: string | number }[];
  countryFilterOptions?: { label: string; value: string | number }[];
  productFilterOptions?: { label: string; value: string | number }[];
  hsCodesFilterOptions?: { label: string; value: string | number }[];
  dummyData?: any[];
}

export function DataTable<TData, TValue>({
  columns,
  emptyTableText,
  className,
  filterPlaceholder,
  filterOptions,
  statusToFilter,
  statusFilterPlaceholder,
  isExportable = false,
  dateFilterPlaceholder,
  baseUrl,
  createData,
  btnTheme,
  statusfilterLabel,
  noDateFilter,
  noGlobalSearch,
  role,
  exportUrl,
  searchQueryLabel,
  userId,
  pendingValidationOptions,
  isNinFilterOptions,
  isUserApprovedFilterOptions,
  userRegistrationStatus,
  isUser,
  validationStateOptions,
  organizationFilterOptions,
  countryFilterOptions,
  productFilterOptions,
  hsCodesFilterOptions,
  dummyData,
}: DataTableProps<TData, TValue>) {
  const [url, setUrl] = useState<string>("");
  const [isLoading, setIsloading] = useState<string>("");
  const pageNumber = usePaginationStore((state) => state.pageNumber);
  const setPageNumber = usePaginationStore((state) => state.setPageNumber);
  const pageSize = 12;
  const tableFilter = useFilterStore((state) => state);

  //   url and query params
  // const { finalUrl, debouncedGlobalFilter } = useTableQueryParams({
  //   baseUrl,
  //   // statusFilter: tableFilter.filteredStatusValue,
  //   // pendingValidationFilter: tableFilter.pendingValidationValue,
  //   // ninFilterValidationValue: tableFilter.ninFilterValidationValue,
  //   // approvalFilterValue: tableFilter.approvalFilterValue,
  //   globalFilter: tableFilter.globalFilter,
  //   // dateRange: tableFilter.dateRange,
  //   pageSize,
  //   // validationStateValue: tableFilter.validationStateValue,
  //   // statusfilterLabel,
  //   searchQueryLabel,
  //   // userRegistrationStatusValue: tableFilter.userRegistrationStatusValue,
  //   // isUser,
  //   organizationFilter: tableFilter.organizationFilterValue,
  //   organizationFilterLabel,
  //   countryFilter: tableFilter.countryFilterValue,
  //   countryFilterLabel,
  //   productFilter: tableFilter.productFilterValue,
  //   productFilterLabel,
  //   hsCodesFilter: tableFilter.hsCodesFilterValue,
  //   hsCodesFilterLabel,
  // });

  useEffect(() => {
    setPageNumber(pageNumber);
  }, [pageNumber, setPageNumber]);

  //   Please don't touch this below
  // useEffect(() => {
  //   setUrl(finalUrl);
  // }, [finalUrl]);

  // Fetch data with the updated URL
  // const { data, isLoading, error, response } =
  //   useFetchTableData<TData[]>(finalUrl);

  //page  --meta
  // const pageMeta = response?.data?.pageMeta || {
  //   pageNumber: 1,
  //   pageSize: 12,
  //   totalPages: 1,
  //   totalRecords: 0,
  // };

  const table = useTableInstance<TData>({
    data: dummyData as TData[],
    columns,
    // pageMeta,
  });

  // Pagination
  // const { handleNextPage, handlePreviousPage, fetchedRecords } =
  //   usePaginationControls(pageMeta, setPageNumber);

  //   // Download table data
  //   const downloadData = useDownloadData({
  //     pageNumber,
  //     pageSize,
  //     dateRange: tableFilter.dateRange,
  //     debouncedGlobalFilter,
  //     userId,
  //     url,
  //     exportUrl,
  //   });

  return (
    <>
      <TableFilters
        filterPlaceholder={filterPlaceholder}
        dateFilterPlaceholder={dateFilterPlaceholder}
        statusFilterPlaceholder={statusFilterPlaceholder}
        noDateFilter={noDateFilter}
        noGlobalSearch={noGlobalSearch}
        filterOptions={filterOptions}
        pendingValidationOptions={pendingValidationOptions}
        isNinFilterOptions={isNinFilterOptions}
        isUserApprovedFilterOptions={isUserApprovedFilterOptions}
        userRegistrationStatus={userRegistrationStatus}
        validationStateOptions={validationStateOptions}
        organizationOptions={organizationFilterOptions}
        countryOptions={countryFilterOptions}
        productOptions={productFilterOptions}
        hsCodeOptions={hsCodesFilterOptions}
      />

      {/* <TableActions
        createData={createData}
        isExportable={isExportable}
        btnTheme={btnTheme}
        downloadData={downloadData}
      /> */}

      {isLoading ? (
        <div className="skeleton-loader">
          {/* Skeleton table rows or placeholders */}
          <Table className="compact">
            <TableHeader>
              <TableRow>
                {columns.map((column, index) => (
                  <TableHead key={index}>
                    <div className="bg-gray-300 w-24 h-6 animate-pulse"></div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(5)].map((_, index) => (
                <TableRow key={index}>
                  {columns.map((column, index) => (
                    <TableCell key={index}>
                      <div className="bg-gray-200 w-24 h-6 animate-pulse"></div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : table.getRowModel().rows?.length ? (
        <>
          {/* Table Wrapper with Horizontal Scrolling */}
          <div className="overflow-x-auto">
            <div className="overflow-hidden bg-white shadow-sm">
              <Table className="compact">
                <TableHeader
                  className={cn(
                    "text-sm text-left font-medium bg-primaryPurple bg-opacity-[0.05] rounded-t-xl",
                    className
                  )}
                >
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header, index) => (
                        <TableHead
                          className={cn(
                            "text-[#074318] text-center bg-[#0A5C2110] text-nowrap",
                            index !== headerGroup.headers.length - 1 &&
                              "border-r-[1.5px] border-gray-300"
                          )}
                          key={header.id}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody className="shadow-sm border border-[#D9D9D9]">
                  {table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} className="bg-white">
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className="text-center text-[#3A3A3A] md:min-w-[200px] md:py-5 md:pr-5"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          {/* Pagination Controls */}
          {/* <div className="flex justify-between items-center pt-6 pb-3"> */}
          {/* Total Records Info */}
          {/* <div className="hidden md:flex text-sm text-gray-600 mb-0 md:mb-4">
              {`Showing ${fetchedRecords} of ${pageMeta.totalRecords} records`}
            </div>
            <div className="flex md:hidden text-sm text-gray-600 mb-0 md:mb-4">
              {`${fetchedRecords} of ${pageMeta.totalRecords} records`}
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <Button
                variant="ghost"
                onClick={handlePreviousPage}
                disabled={pageNumber === 1}
                className="bg-white text-black"
              >
                <ChevronLeft />
                Prev
              </Button>
              {response?.data.pageMeta && (
                <span>
                  {response?.data?.pageMeta.pageNumber}/
                  {response?.data?.pageMeta.totalPages}
                </span>
              )}
              <Button
                variant="ghost"
                onClick={handleNextPage}
                disabled={pageNumber === pageMeta.totalPages}
                className="bg-white text-black"
              >
                Next
                <ChevronRight />
              </Button>
            </div> */}
          {/* </div> */}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 rounded-[15px] bg-white mb-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 17v-2m0 0a3 3 0 006 0v2m-6-2a3 3 0 100-6 3 3 0 000 6zm-7-2a9 9 0 1118 0A9 9 0 012 15z"
            />
          </svg>
          <p className="text-gray-600 text-sm mb-6">
            {/* {response?.data?.message ?? emptyTableText} */}
            {emptyTableText}
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="px-8 py-2 rounded-[12px]"
          >
            Refresh
          </Button>
        </div>
      )}
    </>
  );
}
