import { DataTableColumnHeader } from "@/components/ui";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";

type Transaction = {
  id: string;
  property: string;
  location: string;
  plots: string;
  date_listed: string;
};

const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Property" />
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("address")}</div>
    ),
  },
  {
    accessorKey: "availableUnits",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Available plots"
        className="whitespace-normal text-start"
      />
    ),
    cell: ({ row }) => <div>{row.getValue("availableUnits")}</div>,
  },
  // {
  //   accessorKey: "reserved_plots",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader
  //       column={column}
  //       title="Reserved/sold plots"
  //       className="whitespace-normal text-left"
  //     />
  //   ),
  //   cell: ({ row }) => <div>{row.getValue("reserved_plots")}</div>,
  // },

  {
    id: "actions",
    cell: ({ row }) => {
      // "use server";
      return (
        <div className="flex justify-end">
          <button id="button">
            <ChevronRight className="size-4" />
            <span className="sr-only">View details</span>
          </button>
        </div>
      );
    },
  },
];
