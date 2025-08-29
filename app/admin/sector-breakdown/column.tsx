"use client";

import { ColumnDef } from "@tanstack/react-table";
// import { AppUserVehicle } from "@/lib/types/responseTypes";
// import { formatDateItem } from "@/lib/utils";
import { TradeData } from "./data";
import { RequestsColumnAction } from "./column-action";

export const columns: ColumnDef<TradeData>[] = [
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
  {
    accessorKey: "productName",
    header: "Product Name",
  },

  {
    accessorKey: "quantity",
    header: "HS Code",
  },
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
    cell: () => {
      return <RequestsColumnAction />;
    },
  },
];
