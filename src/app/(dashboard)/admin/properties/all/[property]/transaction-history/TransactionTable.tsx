"use client";
import { DashboardModal, DataTable } from "@/components/dashboard";
import { Button, DataTableColumnHeader } from "@/components/ui";
import {
  IPropertyTableDTO,
  IPropertyTransactionDTO,
  propertyTransactionTableDTO,
} from "@/lib/dtos/property.dto";
import { useModal } from "@/lib/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { TickCircle } from "iconsax-react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const columns: ColumnDef<IPropertyTransactionDTO>[] = [
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
      <DataTableColumnHeader column={column} title="Amount Paid" />
    ),
    cell: ({ row }) => <div>{row.getValue("amountPaid")}</div>,
  },
  {
    accessorKey: "client",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Client" />
    ),
    cell: ({ row }) => <div>{row.getValue("client")}</div>,
  },
  {
    accessorKey: "plotNo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Plot No." />
    ),
    cell: ({ row }) => <div>{row.getValue("plotNo")}</div>,
  },

  {
    // id: "actions",
    accessorKey: "id",
    header: () => null,
    cell: ({ row }) => {
      const id = String(row.getValue("id")) || String(row?.id);

      return (
        <Link
          href={`?receipt=${id}`}
          id="button"
          className="flex gap-1 items-center justify-center px-4"
        >
          View reciept
          <ChevronRight className="size-4" />
          <span className="sr-only">View details</span>
        </Link>
      );
    },
  },
];

export const TransactionTable = ({ data = [] }: { data: any[] }) => {
  const transactions = propertyTransactionTableDTO(data);


  const searchParams = useSearchParams();
  const isModalOpen = searchParams.get("receipt");


  const payment_data = [
    {
      item: "client",
      label: "Client name",
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

  const router = useRouter();
  const closeModal = () => router.replace("?");

  return (
    <>
      <DataTable columns={columns} data={transactions} />

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
