"use client";
import { DataTable } from "@/components/dashboard";
import { DataTableColumnHeader } from "@/components/ui";
import { toAmount } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

type Titans = {
  _id: string;
  titanName: string;
  revenue: string;
  commission: string;
  subTitans: string;
};

const columns: ColumnDef<Titans>[] = [
  {
    accessorKey: "titanName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Titan Name" />
    ),
    cell: ({ row }) => <div>{row.getValue("titanName")}</div>,
  },
  {
    accessorKey: "revenue",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Revenue" />
    ),
    cell: ({ row }) => (
      <div>{toAmount(row.getValue("revenue") || 0)}</div>
    ),
  },
  {
    accessorKey: "commission",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="My Titans" />
    ),
    cell: ({ row }) => (
      <div>{toAmount(row.getValue("commission") || 0)}</div>
    ),
  },
  {
    accessorKey: "subTitans",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sub-titans" />
    ),
    cell: ({ row }) => {
      const sub = row.getValue("subTitans") || [];
      const length = Array.isArray(sub) ? sub?.length : Number(sub);

      return <div>{toAmount(length || 0, false)}</div>;
    },
  },
  {
    accessorKey: "_id",
    header: () => null,
    cell: ({ row }) => {
      const id =
        String(row.getValue("_id")) ||
        String(row?.original?._id) ||
        String(row.getValue("id"));

      return (
        <div className="flex justify-center px-4">
          <Link href={`/titans/my-titans/${id}`} id="button">
            <ChevronRight className="size-4" />
            <span className="sr-only">View details</span>
          </Link>
        </div>
      );
    },
  },
];

const Table = ({ data = [] }: { data: Titans[] }) => {
  return <DataTable columns={columns} data={data} />;
};

export default Table;
