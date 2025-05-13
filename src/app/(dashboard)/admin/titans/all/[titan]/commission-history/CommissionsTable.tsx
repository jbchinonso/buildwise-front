"use client";
import { DataTable } from "@/components/dashboard";
import { DataTableColumnHeader } from "@/components/ui";
import { ColumnDef } from "@tanstack/react-table";
import React, { PropsWithChildren } from "react";

export type Transaction = {
  id: string;
  property: string;
  commission: string;
  location: string;
  properties_sold: number;
  status: string;
  joined: string;
};

const TableHead: React.FC<PropsWithChildren & {title?: string}> = ({ children, title }) => {
  return <div>{children||title}</div>;
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "property",
    header: ({ column }) => <TableHead title="Property" />,
    cell: ({ row }) => <div>{row.getValue("property")}</div>,
  },
  {
    accessorKey: "commission",
    header: ({ column }) => (
      <TableHead title="Commission" />
    ),
    cell: ({ row }) => <div>{row.getValue("commission")}</div>,
  },
  {
    accessorKey: "commission_id",
    header: ({ column }) => (
      <TableHead title="Commission ID" />
    ),
    cell: ({ row }) => <div>{row.getValue("commission_id")}</div>,
  },

  {
    accessorKey: "status",
    header: ({ column }) => (
      <TableHead title="Status" />
    ),
    cell: ({ row }) => (
      <div
        className={`${
          row.getValue("status") == "Paid" ? "text-[#4FAB15]" : "text-[#F4BB1F]"
        }`}
      >
        {row.getValue("status")}
      </div>
    ),
  },
  {
    accessorKey: "date_paid",
    header: ({ column }) => (
      <TableHead title="Date paid" />
    ),
    cell: ({ row }) => <div>{row.getValue("date_paid")}</div>,
  },
];

export const CommissionsTable = ({ data = [] }: { data: Transaction[] }) => {
  return <DataTable columns={columns} data={data} />;
};
