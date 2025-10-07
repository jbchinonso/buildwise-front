"use client";
import { DashboardModal, DataTable } from "@/components/dashboard";
import { Button, DataTableColumnHeader } from "@/components/ui";
import { useModal } from "@/lib/hooks";
import { IPaymentHistoryTransactionDTO } from "@/lib/type";
import { formatDate, toAmount } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { TickCircle } from "iconsax-react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

const columns: (
  toggleModal: () => void
) => ColumnDef<IPaymentHistoryTransactionDTO>[] = (toggleModal: () => void) => [
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
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => <div>{toAmount(row.getValue("amount") || 0)}</div>,
  },
  {
    accessorKey: "property",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Property" />
    ),
    cell: ({ row }) => {
      return <div>{row.getValue("property")}</div>;
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
    // id: "actions",
    accessorKey: "id",
    header: () => null,
    cell: ({ row }) => {
      const id = String(row.getValue("id")) || String(row?.id);

      return (
        <div className="flex justify-center px-4">
          <button
            onClick={toggleModal}
            id="button"
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
  data: IPaymentHistoryTransactionDTO[];
}) => {
  const { isModalOpen, closeModal, toggleModal } = useModal();

  const payment_data = [
    {
      item: "client",
      label: "Client  name",
      data: "Courtney Henry",
    },
    {
      item: "agent",
      data: "Sodik Nwachukwu",
    },
    {
      item: "property",
      data: "Silvercrest vill",
    },
    {
      item: "units",
      data: "1 Plot",
    },
    {
      item: "installment_period",
      label: "Instalment period",
      data: "18 May 2025 - 18 Nov 2026",
    },
    {
      item: "total_amount",
      label: "Total amount",
      data: "₦3,500,000",
    },
    {
      item: "amount_due",
      label: "Amount due",
      data: "₦1,500,000",
    },
    {
      item: "amount_paid",
      label: "Amount paid",
      data: "₦500,500",
    },
  ];

  return (
    <>
      <DataTable columns={columns(toggleModal)} data={data} />

      {isModalOpen && (
        <DashboardModal
          handleClose={closeModal}
          heading="Receipt"
          className="sm:max-w-[MIN(90%,520px)]"
        >
          <div className="flex flex-col mx-auto text-center">
            <h1 className="text-3xl font-bold">₦500,000</h1>
            <p className="flex items-center gap-1 text-sm text-grey-400">
              <TickCircle size="12" color="#37d67a" />
              Successfully deposited
            </p>
          </div>
          <div className="flex flex-col flex-1 w-full gap-4 py-4 mt-auto">
            {payment_data.map((data, index) => {
              return (
                <div
                  key={`${data?.item}-${index}`}
                  className="flex items-center justify-between w-full p-2 border-b"
                >
                  <p className="text-xs capitalize text-grey-400">
                    {data?.label || data?.item}
                  </p>
                  <p className="text-sm font-bold text-grey-600">
                    {data?.data}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="relative flex w-full my-4">
            <Image
              src="/image/sign.png"
              alt=""
              width={100}
              height={100}
              unoptimized
            />
          </div>
          <div className="flex mt-auto py-4 gap-4 justify-stretch w-full  *:w-full">
            <Button
              onClick={closeModal}
              variant="secondary"
              size="sm"
              className="px-8"
            >
              Send to Client Email
            </Button>

            <Button variant="secondary" size="sm">
              Export PDF
            </Button>
          </div>
        </DashboardModal>
      )}
    </>
  );
};
