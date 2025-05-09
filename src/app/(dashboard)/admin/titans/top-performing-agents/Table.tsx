"use client"
import { DataTable } from "@/components/dashboard";
import { DataTableColumnHeader } from "@/components/ui";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";

export type Transaction = {
  id: string;
  client: string;
  property: string;
  location: string;
  last_payment: string;
  totalPaid: string;
  outstanding: string;
  instalment: string;
  payment_status: string;
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "client",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Titans" />
    ),
    cell: ({ row }) => <div>{row.getValue("client")}</div>,
  },
  {
    accessorKey: "property",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Revenue" />
    ),
    cell: ({ row }) => <div>{row.getValue("property")}</div>,
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Commission" />
    ),
    cell: ({ row }) => <div>{row.getValue("location")}</div>,
  },

  {
    accessorKey: "payment_status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sub-titans" />
    ),
    cell: ({ row }) => <div>{row.getValue("payment_status")}</div>,
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

const Table = ({ data = [] }: { data: Transaction[] }) => {
  return <DataTable columns={columns} data={data} />;
};

export default Table;
