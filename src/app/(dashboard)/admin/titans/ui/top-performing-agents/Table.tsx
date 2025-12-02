"use client"
import { DataTable } from "@/components/dashboard";
import { DataTableColumnHeader } from "@/components/ui";
import { TopAgentData } from "@/lib/types/titan";
import { toAmount } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const columns: ColumnDef<TopAgentData>[] = [
  {
    accessorKey: "titan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Titans" />
    ),
    cell: ({ row }) => <div className="capitalize">{row.getValue("titan")}</div>,
  },
  {
    accessorKey: "totalRevenue",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Revenue" />
    ),
    cell: ({ row }) => <div>{toAmount(row.getValue("totalRevenue"))}</div>,
  },
  {
    accessorKey: "totalCommission",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Commission" />
    ),
    cell: ({ row }) => <div>{toAmount(row.getValue("totalCommission"))}</div>,
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
