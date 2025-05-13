"use client";
import { DataTable } from "@/components/dashboard";
import { DataTableColumnHeader } from "@/components/ui";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export type Transaction = {
  id: string;
  titan: string;
  upline: string;
  location: string;
  properties_sold: number;
  commission: string;
  status: string;
  joined: string;
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "titan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Titan" />
    ),
    cell: ({ row }) => <div>{row.getValue("titan")}</div>,
  },
  {
    accessorKey: "upline",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Upline" />
    ),
    cell: ({ row }) => <div>{row.getValue("upline")}</div>,
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => <div>{row.getValue("location")}</div>,
  },
  {
    accessorKey: "properties_sold",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Properties sold" />
    ),
    cell: ({ row }) => <div>{row.getValue("properties_sold")}</div>,
  },
  {
    accessorKey: "commission",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Commission" />
    ),
    cell: ({ row }) => <div>{row.getValue("commission")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <div
        className={`text-center ${
          row.getValue("status") == "Active" ? "text-[#09A4B9]" : ""
        }`}
      >
        {row.getValue("status")}
      </div>
    ),
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

const AllTitansTable = ({ data = [] }: { data: Transaction[] }) => {

  return <DataTable columns={columns} data={data} />;
};

export default AllTitansTable;
