"use client";
import { ReceiptModal } from "@/components/dashboard/ReceiptModal";
import { DataTable } from "@/components/dashboard";
import { DataTableColumnHeader } from "@/components/ui";
import { IPaymentHistorySales } from "@/lib/type";
import { formatDate, toAmount } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const columns: (
  toggleModal: (id: string) => void
) => ColumnDef<IPaymentHistorySales>[] = (
  toggleModal: (id: string) => void
) => [
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => (
      <div>{formatDate(row.getValue("date") || "", "dd/MM/yyyy, HH:MMa")}</div>
    ),
  },
  {
    accessorKey: "totalPaid",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => <div>{toAmount(row.getValue("totalPaid") || 0)}</div>,
  },
  {
    accessorKey: "property",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Property" />
    ),
    cell: ({ row }) => {
      const property = (row.getValue("property") || {}) as any;
      return <div>{property?.name}</div>;
    },
  },
  {
    accessorKey: "plotNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Plot No." />
    ),
    cell: ({ row }) => <div>{row.getValue("plotNumber")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <div
        className={`${
          row.getValue("status") == "completed"
            ? "text-[rgba(79,171,21,1)]"
            : ""
        }`}
      >
        {row.getValue("status")}
      </div>
    ),
  },

  {
    id: "actions",
    header: () => null,
    cell: ({ row }) => {
      const id = String(row.original?._id || row.original?.id);

      return (
        <div className="flex justify-center px-4">
          <button
            onClick={() => toggleModal(id)}
            id="button"
            type="button"
            className="flex items-center gap-1"
          >
            <span>View receipt</span>
            <ChevronRight className="size-4" />
          </button>
        </div>
      );
    },
  },
];

export const PaymentHistoryTable = ({
  data = [],
}: {
  data: IPaymentHistorySales[];
}) => {
  const searchParams = useSearchParams();
  const sale = searchParams.get("sale") || "";

  const router = useRouter();

  const viewReceipt = (id: string) => {
    router.replace(`?sale=${id}`);
  };

  return (
    <>
      <DataTable columns={columns(viewReceipt)} data={data || []} />

      {sale && <ReceiptModal saleId={sale} />}
    </>
  );
};
