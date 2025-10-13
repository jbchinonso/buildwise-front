"use client";
import { DataTable } from "@/components/dashboard";
import { DataTableColumnHeader } from "@/components/ui";
import { ColumnDef } from "@tanstack/react-table";
import React, { PropsWithChildren } from "react";

type Transaction = {
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

const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "property",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Property" />
    ),
    cell: ({ row }) => <div>{row.getValue("property")}</div>,
  },
  {
    accessorKey: "commission",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Commission" />
    ),
    cell: ({ row }) => <div>{row.getValue("commission")}</div>,
  },
  {
    accessorKey: "commission_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Commission id" />
    ),
    cell: ({ row }) => <div>{row.getValue("commission_id")}</div>,
  },

  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
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
    header: ({ }) => (
      <TableHead title="Date paid" />
    ),
    cell: ({ row }) => <div>{row.getValue("date_paid")}</div>,
  },
];

export const CommissionsTable = ({ data = [] }: { data: Transaction[] }) => {
  return <DataTable columns={columns} data={data} />;
};
