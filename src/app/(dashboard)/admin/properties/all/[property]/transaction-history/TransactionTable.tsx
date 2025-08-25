"use client";
import { DataTable } from "@/components/dashboard";
import { DataTableColumnHeader } from "@/components/ui";
import {
  IPropertySale,
  IPropertyTransactionDTO,
  propertyTransactionTableDTO,
} from "@/lib/dtos/property.dto";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const columns: ColumnDef<IPropertyTransactionDTO>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => (
      <div>
        {row.getValue("date")
          ? format(row.getValue("date") || "", "dd/MM/yyyy, HH:MMa")
          : "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "amountPaid",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount Paid" />
    ),
    cell: ({ row }) => <div>{row.getValue("amountPaid")}</div>,
  },
  {
    accessorKey: "client",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Client" />
    ),
    cell: ({ row }) => <div>{row.getValue("client")}</div>,
  },
  {
    accessorKey: "plotNo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Plot No." />
    ),
    cell: ({ row }) => <div>{row.getValue("plotNo")}</div>,
  },

  {
    // id: "actions",
    accessorKey: "id",
    header: () => null,
    cell: ({ row }) => {
      const id = String(row.getValue("id")) || String(row?.id);

      return (
        <Link
          href={`?receipt=${id}`}
          id="button"
          replace
          className="flex gap-1 items-center justify-center px-4"
        >
          View reciept
          <ChevronRight className="size-4" />
          <span className="sr-only">View details</span>
        </Link>
      );
    },
  },
];

export const TransactionTable = ({ data = [] }: { data: IPropertySale[] }) => {
  const transactions = propertyTransactionTableDTO(data);

  return <DataTable columns={columns} data={transactions} />;
};
