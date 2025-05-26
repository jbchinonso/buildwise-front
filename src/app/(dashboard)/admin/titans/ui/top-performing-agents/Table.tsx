"use client"
import { DataTable } from "@/components/dashboard";
import { DataTableColumnHeader } from "@/components/ui";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

type Transaction = {
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

const columns: ColumnDef<Transaction>[] = [
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
    cell: ({ row }) => <div>₦83,500,000</div>,
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Commission" />
    ),
    cell: ({ row }) => <div>₦500,000</div>,
  },

  {
    accessorKey: "payment_status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sub-titans" />
    ),
    cell: ({ row }) => <div>15</div>,
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
