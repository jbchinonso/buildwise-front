"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/dashboard";
import { DataTableColumnHeader } from "@/components/ui";
import { ChevronRight } from "lucide-react";
import { ArrowRight } from "iconsax-react";
import Link from "next/link";
import { toAmount } from "@/lib/utils";

type Transaction = {
  client: string;
  property: string;
  totalPaid: number;
  outstanding?: number;
  instalment?: number;
  paymentStatus?: string;
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
    accessorKey: "lastPayment",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last payment" />
    ),
    cell: ({ row }) => <div>{row.getValue("lastPayment")}</div>,
  },
  {
    accessorKey: "totalPaid",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Paid" />
    ),
    cell: ({ row }) => <div>{toAmount(row.getValue("totalPaid") || 0)}</div>,
  },
  {
    accessorKey: "outstanding",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Outstanding" />
    ),
    cell: ({ row }) => <div>{toAmount(row.getValue("outstanding") || 0)}</div>,
  },
  {
    accessorKey: "instalment",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Instalment" />
    ),
    cell: ({ row }) => <div>{toAmount(row.getValue("instalment") || 0)}</div>,
  },
  {
    accessorKey: "paymentStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment status" />
    ),
    cell: ({ row }) => <div>{row.getValue("paymentStatus")}</div>,
  },
  {
    accessorKey: "_id",
    header: () => null,
    cell: ({ row }) => {
      const id =
        String(row.getValue("id")) ||
        String(row.getValue("_id"));

      return (
        <div className="flex justify-center px-4">
          <Link href={`${id}`} id="button">
            <ChevronRight className="size-4" />
            <span className="sr-only">View details</span>
          </Link>
        </div>
      );
    },
  },
];

export const RecentTransactions = ({
  data,
  error,
}: {
  data: Transaction[];
  error?: string;
}) => {
  return (
    <section className="flex flex-col w-full">
      <div className="flex items-baseline justify-between w-full gap-4">
        <h2 className="font-semibold text-grey-600">Recent Transactions</h2>

        <Link
          href="/"
          className="flex items-center gap-1 text-xs font-medium text-primary-400 flex-nowrap whitespace-nowrap"
        >
          View all <ArrowRight size={14} color="currentColor" />
        </Link>
      </div>

      {!error ? (
        <DataTable columns={columns} data={data} />
      ) : (
        <div className="w-full flex p-4 bg-white rounded-lg mt-4 border border-grey-50 min-h-[200px]">
          <p className="text-sm text-red-500 m-auto">
            There was an error fetching transactions
          </p>
        </div>
      )}
    </section>
  );
};
