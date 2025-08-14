"use client";
import { DataTable } from "@/components/dashboard";
import { DataTableColumnHeader } from "@/components/ui";
import { ITopSellingDTO } from "@/lib/dtos/property.dto";
import { toCurrency } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<ITopSellingDTO>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Property" />
    ),
    cell: ({ row }) => (
      <p className="max-w-[200px] whitespace-normal  ">
        {row.getValue("name")}
      </p>
    ),
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => (
      <p className="max-w-[200px] capitalize whitespace-normal">
        {row.getValue("location")}
      </p>
    ),
  },

  {
    accessorKey: "revenue",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Revenue" />
    ),
    cell: ({ row }) => <div>{toCurrency(row.getValue("revenue")||0)}</div>,
  },
  {
    accessorKey: "unitSold",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Unit sold" />
    ),
    cell: ({ row }) => <div>{toCurrency(row.getValue("unitSold") || 0)}</div>,
  },
  {
    // id: "actions",
    accessorKey: "id",
    header: () => null,
    cell: ({ row }) => {
      const id = String(row.getValue("id")) || String(row?.id);

      return (
        <div className="flex justify-center px-4">
          <Link href={`/admin/properties/all/${id}`} id="button">
            <ChevronRight className="size-4" />
            <span className="sr-only">View details</span>
          </Link>
        </div>
      );
    },
  },
];

const Table = ({ data = [] }: { data: ITopSellingDTO[] }) => {
  return <DataTable columns={columns} data={data} />;
};

export default Table;
