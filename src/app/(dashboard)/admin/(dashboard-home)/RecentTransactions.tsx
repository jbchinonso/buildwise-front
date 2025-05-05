"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/dashboard";
import { DataTableColumnHeader, Button } from "@/components/ui";
import { ChevronRight } from "lucide-react";

type Transaction = {
  id: string;
  client: string;
  property: string;
  location: string;
  "last payment": string;
  totalPaid: string;
  outstanding: string;
  instalment: string;
  "payment status": string;
};

const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "client",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Client" />
    ),
    cell: ({ row }) => <div>{row.getValue("client")}</div>,
  },
  {
    accessorKey: "property",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Property" />
    ),
    cell: ({ row }) => <div>{row.getValue("property")}</div>,
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => <div>{row.getValue("location")}</div>,
  },
  {
    accessorKey: "last payment",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last payment" />
    ),
    cell: ({ row }) => <div>{row.getValue("last payment")}</div>,
  },
  {
    accessorKey: "total paid",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Paid" />
    ),
    cell: ({ row }) => <div>{row.getValue("total paid")}</div>,
  },
  {
    accessorKey: "outstanding",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Outstanding" />
    ),
    cell: ({ row }) => <div>{row.getValue("outstanding")}</div>,
  },
  {
    accessorKey: "instalment",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Instalment" />
    ),
    cell: ({ row }) => <div>{row.getValue("instalment")}</div>,
  },
  {
    accessorKey: "payment status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment status" />
    ),
    cell: ({ row }) => <div>{row.getValue("payment status")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          <button id="button">
            <ChevronRight className="size-4" />
            <span className="sr-only">View details</span>
          </button>
        </div>
      );
    },
  },
];

export const RecentTransactions = ({ data }: { data: Transaction[] }) => {
  
  return <DataTable columns={columns} data={data} />;
};
