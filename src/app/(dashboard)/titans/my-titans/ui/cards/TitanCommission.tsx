"use client";
import {
  DashboardStatsCard,
  DataTable,
  PageModal,
} from "@/components/dashboard";
import { Button, DataTableColumnHeader } from "@/components/ui";
import { useModal } from "@/lib/hooks";
import { ArrowRight, Profile2User } from "iconsax-react";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight, Network } from "lucide-react";
import { TitanCommissionOverview } from "../TitanCommissionOverview";



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

const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "titan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Titan" />
    ),
    cell: ({ row }) => <div>{row.getValue("titan")}</div>,
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => <div>{row.getValue("type")}</div>,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => <div>{row.getValue("amount")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },

  {
    id: "actions",
    cell: ({ row }) => {
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



export const TitanCommission = ({ data }: { data: Transaction[] }) => {
  const { isModalOpen, toggleModal, closeModal } = useModal();
  return (
    <>
      <DashboardStatsCard
        title="My Titans Commission"
        icon={<Network size="24" color="#1FDBF4" className="rotate-90"/>}
        data="500k"
        theme=""
        onClick={toggleModal}
      />

      {isModalOpen && (
        <PageModal
          handleClose={closeModal}
          heading="My Titans Overview"
          className="max-w-[MIN(95%,620px)]"
        >
           
          <section className="flex flex-col w-full gap-4 ">
          <TitanCommissionOverview/>
           
            <div className="flex w-full rounded-xl text-xs py-[10px] flex-wrap bg-primary-50 p-3 text-white">
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Total Commission</p>
                <p className="text-grey-600 font-medium">100</p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Commission from Titans</p>
                <p className="text-grey-600 font-medium">90</p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Comission from Sub-titans</p>
                <p className="text-grey-600 font-medium">10</p>
              </div>
            </div>

            <div className="flex items-baseline justify-between w-full gap-4">
              <h2 className="font-semibold text-grey-600">
                Recently earned Commissions
              </h2>

              <Link
                  href="/titans/my-titans/commission-breakdown"
                className="flex items-center gap-1 text-xs font-medium text-primary-400 flex-nowrap whitespace-nowrap"
              >
                View all <ArrowRight size={14} color="currentColor" />
              </Link>
            </div>

            <div className="w-full my-2">
              <DataTable columns={columns} data={data} />
            </div>

            <div className="flex justify-end gap-4 items-center">
              <Button size="xs" outline variant="secondary">
                Close
              </Button>

              <Button size="xs">Export PDF</Button>
            </div>
          </section>
        </PageModal>
      )}
    </>
  );
};
