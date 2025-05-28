"use client"
import { DataTable } from "@/components/dashboard";
import { DataTableColumnHeader } from "@/components/ui";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export type Transaction = {
  id: string;
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
    accessorKey: "property",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Property" />
    ),
    cell: ({ row }) => (
      <p className="max-w-[200px] whitespace-normal  ">
        {row.getValue("property")}
      </p>
    ),
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => (
      <p className="max-w-[200px] whitespace-normal  ">
        {row.getValue("location")}
      </p>
    ),
  },

  {
    accessorKey: "revenue",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Revenue" />
    ),
    cell: ({ row }) => <div>{row.getValue("revenue")}</div>,
  },
  {
    accessorKey: "unit_sold",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Unit sold" />
    ),
    cell: ({ row }) => <div>{row.getValue("unit_sold")}</div>,
  },
  {
    // id: "actions",
    accessorKey: "id",
    header: () => null,
    cell: ({ row }) => {
      const id = String(row.getValue("id")) || String(row?.id);

      return (
        <div className="flex justify-center px-4">
          <Link href={`/admin/titans/all/${id}`} id="button">
            <ChevronRight className="size-4" />
            <span className="sr-only">View details</span>
          </Link>
        </div>
      );
    },
  },
];

const Table = ({ data = [] }: { data: Transaction[] }) => {
  return <DataTable columns={columns} data={data} />;
};

export default Table;
