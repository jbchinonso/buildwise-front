"use client";
import { DataTable } from "@/components/dashboard";
import { DataTableColumnHeader } from "@/components/ui";
import { IRecentlyListedDTO } from "@/lib/dtos/property.dto";
import { ColumnDef } from "@tanstack/react-table";


export const columns: ColumnDef<IRecentlyListedDTO>[] = [
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

const Table = ({ data = [] }: { data: IRecentlyListedDTO[] }) => {
  return <DataTable columns={columns} data={data} />;
};

export default Table;
