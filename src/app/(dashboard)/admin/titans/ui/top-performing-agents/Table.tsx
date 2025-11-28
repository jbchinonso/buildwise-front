"use client"
import { DataTable } from "@/components/dashboard";
import { DataTableColumnHeader } from "@/components/ui";
import { TopAgentData } from "@/lib/types/titant";
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

const columns: ColumnDef<TopAgentData>[] = [
  {
    accessorKey: "titan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Titans" />
    ),
  },
  {
    accessorKey: "totalRevenue",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Revenue" />
    ),
    cell: ({ row }) => (
      <div>₦{Number(row.getValue("totalRevenue")).toLocaleString()}</div>
    ),
  },
  {
    accessorKey: "totalCommission",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Commission" />
    ),
    cell: ({ row }) => (
      <div>₦{Number(row.getValue("totalCommission")).toLocaleString()}</div>
    ),
  },
  {
    accessorKey: "subTitans",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sub-titans" />
    ),
  },
  {
    accessorKey: "_id",
    header: () => null,
    cell: ({ row }) => {
      const id = row.getValue("_id");
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


const Table = ({ data = [] }: { data: TopAgentData[] }) => {
  return <DataTable columns={columns} data={data} />;
};

export default Table;
