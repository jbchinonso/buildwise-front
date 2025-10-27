"use client"
import { DataTable } from "@/components/dashboard";
import { DataTableColumnHeader } from "@/components/ui";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

type Titans = {
  id: string;
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
    cell: ({ row }) => <div>{row.getValue("revenue")}</div>,
  },
  {
    accessorKey: "commission",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="My Titans" />
    ),
    cell: ({ row }) => <div>{row.getValue("commission")}</div>,
  },
  {
    accessorKey: "subTitans",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sub-titans" />
    ),
    cell: ({ row }) => <div>{row.getValue("subTitans")}</div>,
  },
  {
    accessorKey: "id",
    header: () => null,
    cell: ({ row }) => {
      const id =
        String(row.getValue("id")) ||
        String(row?.original?.id) ||
        String(row.getValue("_id"));

      return (
        <div className="flex justify-center px-4">
          <Link href={`?titan=${id}`} id="button">
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
