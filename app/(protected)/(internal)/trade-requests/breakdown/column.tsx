"use client";
import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { TradeSubmissions } from "@/lib/custom-apis/types";
import { TradeRequestsAction } from "./column-action";
import useFilterStore from "@/hooks/store/useFilterStore";

export const useTradeColumns = (): ColumnDef<TradeSubmissions>[] => {
  const sector = useFilterStore((state) => state.sector);

  return useMemo(
    () => [
      {
        header: "S/N.",
        cell: ({ row, table }) => {
          //@ts-expect-error table.options.meta may not be defined
          const currentPage = table.options.meta?.currentPage || 1;
          //@ts-expect-error table.options.meta may not be defined
          const pageSize = table.options.meta?.pageSize || 12;
          return (currentPage - 1) * pageSize + row.index + 1;
        },
      },
      {
        accessorKey: "organizationType",
        header: "Organization Type",
      },
      {
        accessorKey: "country",
        header: "Country",
      },
      ...(sector.sectorId !== "SECTOR_016"
        ? [
            {
              accessorKey: "productName",
              header: "Product Name",
            },
          ]
        : [
            {
              accessorKey: "otherProduct",
              header: "Product Name",
            },
          ]),
      {
        accessorKey: "quantity",
        header: "Quantity",
      },
      ...(sector.sectorId !== "SECTOR_016"
        ? [
            {
              accessorKey: "hsCode",
              header: "HS Code",
            },
          ]
        : []),
      {
        accessorKey: "unit",
        header: "Unit",
      },
      {
        accessorKey: "frequency",
        header: "Frequency",
      },
      {
        header: "Action",
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const rowData = row.original;
          return <TradeRequestsAction submission={rowData} />;
        },
      },
    ],
    [sector.sectorId]
  );
};
