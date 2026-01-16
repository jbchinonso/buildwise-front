"use client";
import { DataTable } from "@/components/dashboard";
import { ReceiptModal } from "@/components/dashboard/ReceiptModal";
import { DataTableColumnHeader } from "@/components/ui";
import { IPaymentHistorySales } from "@/lib/type";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

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
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "amountPaid",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => <div>{row.getValue("amountPaid")}</div>,
  },
  {
    accessorKey: "property",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Property" />
    ),
    cell: ({ row }) => {
      const property = row.getValue("property") as any;

      return <div>{property?.name}</div>;
    },
  },
  {
    accessorKey: "plot_no",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Plot No." />
    ),
    cell: ({ row }) => <div>{row.getValue("plot_no")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <div
        className={`${
          row.getValue("status") == "Active" ? "text-[#09A4B9]" : ""
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
      const id = String(row?.original?._id || row?.original?.id) || "";

      return (
        <div className="flex justify-center px-4">
          <button
            onClick={() => toggleModal(id)}
            type="button"
            id="button"
            className="flex items-center gap-1"
          >
            View receipt <ChevronRight className="size-4" />
          </button>
        </div>
      );
    },
  },
];

const RECEIPT_KEY = "receipt";
export const PaymentHistoryTable = ({
  data = [],
}: {
  data: IPaymentHistorySales[];
}) => {
  const searchParams = useSearchParams();
  const receipt = searchParams.get(RECEIPT_KEY) || "";
  const router = useRouter();

  const toggleModal = useCallback(
    (saleId: string) => {
      const url = new URLSearchParams(searchParams);

      if (receipt) {
        url.delete(RECEIPT_KEY);
      } else {
        url.set(RECEIPT_KEY, saleId);
      }

      router.replace(`?${url.toString()}`);
    },
    [searchParams, receipt]
  );

  return (
    <>
      <DataTable columns={columns(toggleModal)} data={data} />

      {Boolean(receipt) && <ReceiptModal saleId={receipt} />}

      {/* {isModalOpen && (
        <DashboardModal
          handleClose={closeModal}
          heading="Receipt"
          className="lg:max-w-[MIN(90%,520px)]"
        >
          <div className="flex flex-col mx-auto text-center">
            <h1 className="text-3xl font-bold"></h1>
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
      )} */}
    </>
  );
};
