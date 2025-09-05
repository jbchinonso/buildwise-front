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
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => <div>{row.getValue("type")}</div>,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => <div>{row.getValue("amount")}</div>,
  },
 
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          <button id="button">
            {/* <ChevronRight className="size-4" /> */}
            <span className="sr-only">View details</span>
          </button>
        </div>
      );
    },
  },
];

export const CommissionsTable = ({ data = [] }: { data: Transaction[] }) => {
  return <DataTable columns={columns} data={data} />;
};
