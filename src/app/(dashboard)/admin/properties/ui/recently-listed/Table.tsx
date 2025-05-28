"use client";
import { DataTable } from "@/components/dashboard";
import { DataTableColumnHeader } from "@/components/ui";
import { ColumnDef } from "@tanstack/react-table";

export type Transaction = {
  id: string;
  property: string;
  location: string;
  date_listed: string;
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "property",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Property" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[100px] whitespace-pre-wrap break-all">
        {row.getValue("property")}
      </div>
    ),
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => (
      <p className="max-w-[100px] whitespace-pre-wrap break-words">
        {row.getValue("location")}
      </p>
    ),
  },
  {
    accessorKey: "date_listed",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date listed" />
    ),
    cell: ({ row }) => <div>{row.getValue("date_listed")}</div>,
  },
];

const Table = ({ data = [] }: { data: Transaction[] }) => {
  return <DataTable columns={columns} data={data} />;
};

export default Table;
