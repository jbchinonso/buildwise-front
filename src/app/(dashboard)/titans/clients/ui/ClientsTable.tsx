"use client";
import { DataTable } from "@/components/dashboard";
import { DataTableColumnHeader } from "@/components/ui";
import { IRecentClients } from "@/lib/type";
import { formatDateToNow, toAmount } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const columns: ColumnDef<IRecentClients>[] = [
  {
    accessorKey: "clientName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Client" />
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("clientName")}</div>
    ),
  },

  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => <div>{row.getValue("location")}</div>,
  },

  {
    // accessorKey: "propertiesCount",
    id: "properties",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Properties" />
    ),
    cell: ({ row }) => (
      <div>
        {toAmount(
          row.original?.properties || row.original?.propertiesCount || 0,
          false,
        )}
      </div>
    ),
  },

  {
    accessorKey: "lastPayment",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Payment" />
    ),
    cell: ({ row }) => <div>{toAmount(row.getValue("lastPayment") ?? 0)}</div>,
  },

  // {
  //   accessorKey: "totalPaid",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Total Paid" />
  //   ),
  //   cell: ({ row }) => <div>{toAmount(row.getValue("totalPaid") ?? 0)}</div>,
  // },

  // {
  //   accessorKey: "outstanding",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Outstanding" />
  //   ),
  //   cell: ({ row }) => <div>{toAmount(row.getValue("outstanding") || 0)}</div>,
  // },
  // {
  //   accessorKey: "instalment",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Instalment" />
  //   ),
  //   cell: ({ row }) => <div>{row.getValue("instalment")}</div>,
  // },

  {
    accessorKey: "paymentStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment Status" />
    ),
    cell: ({ row }) => <div>{row.getValue("paymentStatus")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  // {
  //   accessorKey: "",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Payment Status" />
  //   ),
  //   cell: ({ row }) => (
  //     <div>{row.getValue("paymentStatus")}</div>
  //   ),
  // },
  {
    accessorKey: "joined",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Joined" />
    ),
    cell: ({ row }) => <div>{formatDateToNow(row.getValue("joined"))}</div>,
  },

  {
    id: "actions",
    header: () => null,
    cell: ({ row }) => {
      const id = String(row.original?._id || row.original?.id);

      return (
        <div className="flex justify-center px-4">
          <Link href={`/titans/clients/all/${id}`} id="button">
            <ChevronRight className="size-4" />
            <span className="sr-only">View details</span>
          </Link>
        </div>
      );
    },
  },
];

export const ClientsTable = ({ data = [] }: { data: IRecentClients[] }) => {
  return <DataTable columns={columns} data={data} />;
};
