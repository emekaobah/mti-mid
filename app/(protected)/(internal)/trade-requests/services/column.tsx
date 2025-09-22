"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { TradeSubmissions } from "@/lib/custom-apis/types";
import { TradeRequestsAction } from "./column-action";
import useFilterStore from "@/hooks/store/useFilterStore";

export const useServiceColumns = (): ColumnDef<TradeSubmissions>[] => {
  const { sector } = useFilterStore();

  return useMemo(
    () => [
      {
        header: "S/N.",
        size: 1,
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
        size: 1,
      },

      {
        accessorKey: "country",
        header: "Country",
        size: 1,
      },
      ...(sector.sectorId === "SERVICESEC_014"
        ? [
            {
              accessorKey: "otherService",
              header: "Service Name",
              size: 1,
            },
          ]
        : [
            {
              accessorKey: "serviceName",
              header: "Service Name",
              size: 1,
            },
          ]),

      {
        accessorKey: "description",
        header: "Service Description",
        size: 2,
      },
      {
        header: "Action",
        id: "actions",
        enableHiding: false,
        size: 1,
        cell: ({ row }) => {
          const rowData = row.original;
          return <TradeRequestsAction submission={rowData} />;
        },
      },
    ],
    [sector.sectorId]
  );
};
