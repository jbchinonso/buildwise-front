"use client";
import { DataTable } from "@/components/dashboard";
import { DataTableColumnHeader } from "@/components/ui";
import { ITitans } from "@/lib/type";
import { toAmount } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import Link from "next/link";


const columns: ColumnDef<ITitans>[] = [
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
    cell: ({ row }) => (
      <div
        title={row.getValue("location")}
        className="max-w-[120px] line-clamp-2 overflow-ellipsis whitespace-break-spaces"
      >
        {row.getValue("location")}
      </div>
    ),
  },
  {
    accessorKey: "propertiesSold",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Properties sold" />
    ),
    cell: ({ row }) => (
      <div>{toAmount(row.getValue("propertiesSold"), false)}</div>
    ),
  },
  {
    accessorKey: "commission",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Commission" />
    ),
    cell: ({ row }) => <div>{toAmount(row.getValue("commission"))}</div>,
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
    accessorKey: "joined",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Joined" />
    ),
    cell: ({ row }) => (
      <div>
        {row.getValue("joined")}
        {/* {format(row.getValue("joinedDate") || "", "dd/MM/yyyy, HH:MMa")} */}
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

export const AllTitansTable = ({ data = [] }: { data: ITitans[] }) => {

  return <DataTable columns={columns} data={data} />;
};

