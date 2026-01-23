"use client";
import { DataTableColumnHeader } from "@/components/ui";
import { ColumnDef } from "@tanstack/react-table";

type ICommission = {
  id: string;
  client: string;
  payment: string;
  commission: string;
  commission_id: string;
  status: string;
};

const columns: ColumnDef<ICommission>[] = [
  {
    accessorKey: "client",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Client" />
    ),
    cell: ({ row }) => <div>{row.getValue("client")}</div>,
  },
  {
    accessorKey: "payment",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment" />
    ),
    cell: ({ row }) => <div>{row.getValue("payment")}</div>,
  },
  {
    accessorKey: "commission",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => <div>{row.getValue("commission")}</div>,
  },
  {
    accessorKey: "commission_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Commission ID" />
    ),
    cell: ({ row }) => <div>{row.getValue("commission_id")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <div
        className={`text-center rounded-full px-1 p-0.5 text-[#292A2C] ${
          row.getValue("status") == "Paid" ? "bg-[#70F41F]" : "bg-[#F4BB1F] "
        }`}
      >
        {row.getValue("status")}
      </div>
    ),
  },
];