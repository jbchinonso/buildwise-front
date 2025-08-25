"use client";
import { DataTable } from "@/components/dashboard";
import { DataTableColumnHeader } from "@/components/ui";
import { IRecentlyListedDTO } from "@/lib/dtos/property.dto";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

const columns: ColumnDef<IRecentlyListedDTO>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Property" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[100px] whitespace-pre-wrap break-words">
        {row.getValue("name")}
      </div>
    ),
  },
  {
    // accessorKey: "lga",
    id: "location", // Use a unique ID for the column
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => (
      <p className="max-w-[100px] whitespace-pre-wrap break-words capitalize">
        {`${row.original?.lga}, ${row.original?.state}`}
      </p>
    ),
  },
  {
    accessorKey: "dateListed",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date listed" />
    ),
    cell: ({ row }) => (
      <div>
        {format(row.getValue("dateListed") || "", "dd/MM/yyyy, HH:MMa")}
      </div>
    ),
  },
];

const Table = ({ data = [] }: { data: IRecentlyListedDTO[] }) => {
  return <DataTable columns={columns} data={data} />;
};

export default Table;
