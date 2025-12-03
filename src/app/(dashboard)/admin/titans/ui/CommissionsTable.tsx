"use client";
import { DataTable } from "@/components/dashboard";
import { ICommissionHistory } from "@/lib/type";
import { cn, formatDate, toAmount } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import React, { PropsWithChildren } from "react";

const TableHead: React.FC<PropsWithChildren & { title?: string }> = ({
  children,
  title,
}) => {
  return <div>{children || title}</div>;
};

const columns: ColumnDef<ICommissionHistory>[] = [
  {
    accessorKey: "property",
    header: ({}) => <TableHead title="Property" />,
    cell: ({ row }) => <div>{row.getValue("property")}</div>,
  },
  {
    accessorKey: "commission",
    header: ({}) => <TableHead title="Commission" />,
    cell: ({ row }) => <div>{toAmount(row.getValue("commission") || 0)}</div>,
  },
  {
    accessorKey: "commissionId",
    header: ({}) => <TableHead title="Commission ID" />,
    cell: ({ row }) => <div>{row.getValue("commissionId")}</div>,
  },

  {
    accessorKey: "status",
    header: ({}) => <TableHead title="Status" />,
    cell: ({ row }) => (
      <div
        className={cn(
          "capitalize",
          `${
            row.getValue("status") == "paid"
              ? "text-[#4FAB15]"
              : "text-[#F4BB1F]"
          }`
        )}
      >
        {row.getValue("status")}
      </div>
    ),
  },
  {
    accessorKey: "datePaid",
    header: ({}) => <TableHead title="Date paid" />,
    cell: ({ row }) => (
      <div>{formatDate(row.getValue("datePaid"), "dd/MM/yyyy, HH:MMa")}</div>
    ),
  },
];

export const CommissionsTable = ({
  data = [],
}: {
  data: ICommissionHistory[];
}) => {
  return <DataTable columns={columns} data={data} />;
};
