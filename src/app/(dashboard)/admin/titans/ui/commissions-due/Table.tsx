"use client";
import { DataTable } from "@/components/dashboard";
import { DataTableColumnHeader } from "@/components/ui";
import { CommissionDueData } from "@/lib/types/titant";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

type Transaction = {
  id: string;
  client: string;
  property: string;
  location: string;
  last_payment: string;
  totalPaid: string;
  outstanding: string;
  instalment: string;
  payment_status: string;
};

const columns: ColumnDef<CommissionDueData>[] = [
  {
    accessorKey: "titan",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Titan" />,
  },
  {
    accessorKey: "property",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Property" />,
  },
  // {
  //   accessorKey: "unpaidCommission",
  //   header: ({ column }) => <DataTableColumnHeader column={column} title="Unpaid Commission" />,
  //   cell: ({ row }) => <div>₦{Number(row.getValue("unpaidCommission")).toLocaleString()}</div>,
  // },
  {
    accessorKey: "titanId",
    header: () => null,
    cell: ({ row }) => {
      const id = row.getValue("titanId");
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

const Table = ({ data = [] }: { data:  CommissionDueData[] }) => {
  return <DataTable columns={columns} data={data} />;
};

export default Table;
