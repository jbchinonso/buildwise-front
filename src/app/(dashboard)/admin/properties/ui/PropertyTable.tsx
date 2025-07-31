"use client";
import { DataTable } from "@/components/dashboard";
import { DataTableColumnHeader } from "@/components/ui";
import { IPropertyTableDTO } from "@/lib/dtos/property.dto";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const columns: ColumnDef<IPropertyTableDTO>[] = [
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
    accessorKey: "available_units",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Available units" />
    ),
    cell: ({ row }) => <div>{row.getValue("available_units")}</div>,
  },
  {
    accessorKey: "reserved",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reserved" />
    ),
    cell: ({ row }) => <div>{row.getValue("reserved")}</div>,
  },
  {
    accessorKey: "closed",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Closed" />
    ),
    cell: ({ row }) => (
      <div className={"text-center"}>{row.getValue("closed")}</div>
    ),
  },
  {
    accessorKey: "total_revenue",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total revenue" />
    ),
    cell: ({ row }) => <div>{row.getValue("total_revenue")}</div>,
  },
  {
    accessorKey: "outstanding",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Outstanding" />
    ),
    cell: ({ row }) => <div>{row.getValue("outstanding")}</div>,
  },
  {
    accessorKey: "listed",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Listed" />
    ),
    cell: ({ row }) => <div>{row.getValue("listed")}</div>,
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

export const PropertyTable = ({ data = [] }: { data: IPropertyTableDTO[] }) => {
  return <DataTable columns={columns} data={data} />;
};
