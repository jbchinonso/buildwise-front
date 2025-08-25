"use client";
import { DataTable } from "@/components/dashboard";
import { DataTableColumnHeader } from "@/components/ui";
import { formatAddress, toAmount } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

type Client = {
  clientId: string;
  clientName: string;
  location: string;
  lga: string;
  propertiesCount: string | number;
  lastPayment: string | number;
  paymentStatus: number;
  outstanding: number;
  joinedDate: string;
};

const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "clientName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Client" />
    ),
    cell: ({ row }) => <div>{row.getValue("clientName")}</div>,
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => (
      <div>{formatAddress(row.original?.location, row.original?.lga)}</div>
    ),
  },
  {
    accessorKey: "propertiesCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Properties" />
    ),
    cell: ({ row }) => <div>{row.getValue("propertiesCount")}</div>,
  },

  {
    accessorKey: "lastPayment",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last payment" />
    ),
    cell: ({ row }) => <div>{toAmount(row.getValue("lastPayment")||0, true)}</div>,
  },
  {
    accessorKey: "paymentStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment Status" />
    ),
    cell: ({ row }) => (
      <div
        className="text-center"
      >
        {Number(row.getValue("paymentStatus") || 0).toFixed(2) + "% completed"}
      </div>
    ),
  },
  {
    accessorKey: "outstanding",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Outstanding" />
    ),
    cell: ({ row }) => (
      <div>{toAmount(row.getValue("outstanding") || 0, true)}</div>
    ),
  },
  {
    accessorKey: "joinedDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Joined" />
    ),
    cell: ({ row }) => (
      <div>
        {format(row.getValue("joinedDate") || "", "dd/MM/yyyy, HH:MMa")}
      </div>
    ),
  },

  {
    // id: "actions",
    accessorKey: "clientId",
    header: () => null,
    cell: ({ row }) => {
      const id = String(row.getValue("clientId")) || String(row?.id);

      return (
        <div className="flex justify-center px-4">
          <Link href={`/admin/clients/all/${id}`} id="button">
            <ChevronRight className="size-4" />
            <span className="sr-only">View details</span>
          </Link>
        </div>
      );
    },
  },
];

export const ClientsTable = ({ data = [] }: { data: Client[] }) => {
  return <DataTable columns={columns} data={data} />;
};
