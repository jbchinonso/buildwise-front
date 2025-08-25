"use client";
import {
  DashboardStatsCard,
  DataTable,
  PageModal,
} from "@/components/dashboard";
import { useModal } from "@/lib/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown } from "iconsax-react";
import { ChevronRight } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { PropertiesSold } from "./PropertiesSold";

import {
  DataTableColumnHeader,
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  Button,
} from "@/components/ui";

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
    accessorKey: "client",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Client" />
    ),
    cell: ({ row }) => <div>{row.getValue("client")}</div>,
  },
  {
    accessorKey: "property",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Property" />
    ),
    cell: ({ row }) => <div>{row.getValue("property")}</div>,
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => <div>{row.getValue("location")}</div>,
  },
  {
    accessorKey: "last_payment",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last payment" />
    ),
    cell: ({ row }) => <div>{row.getValue("last_payment")}</div>,
  },
  {
    accessorKey: "total_paid",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Paid" />
    ),
    cell: ({ row }) => <div>{row.getValue("total_paid")}</div>,
  },
  {
    accessorKey: "outstanding",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Outstanding" />
    ),
    cell: ({ row }) => <div>{row.getValue("outstanding")}</div>,
  },
  {
    accessorKey: "instalment",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Instalment" />
    ),
    cell: ({ row }) => <div>{row.getValue("instalment")}</div>,
  },
  {
    accessorKey: "payment_status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment status" />
    ),
    cell: ({ row }) => <div>{row.getValue("payment_status")}</div>,
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

export const RevenueOverview = ({ data }: { data: Transaction[] }) => {
  const { isModalOpen, toggleModal, closeModal } = useModal();
  return (
    <>
      <DashboardStatsCard
        title="Total revenue"
        icon={<ArrowDown size="24" color="#70F41F" />}
        data="23.8B"
        theme=""
        onClick={toggleModal}
      />

      {isModalOpen && (
        <PageModal handleClose={closeModal} heading="Revenue Overview">
          <section className="flex flex-col w-full gap-4 ">
            
             <PropertiesSold />

            <div className="flex w-full rounded-xl text-xs py-[10px] flex-wrap bg-primary-50 p-3 text-white">
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Total revenue</p>
                <p className="text-grey-600">₦51,208,009</p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Total revenue</p>
                <p className="text-grey-600">₦51,208,009</p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Total revenue</p>
                <p className="text-grey-600">₦51,208,009</p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Total revenue</p>
                <p className="text-grey-600">₦51,208,009</p>
              </div>
            </div>
            
            <div className="flex items-baseline justify-between w-full gap-4">
              <h2 className="font-semibold text-grey-600">Recent Sales</h2>

              {/* <Link
                href="/"
                className="flex items-center gap-1 text-xs font-medium text-primary-400 flex-nowrap whitespace-nowrap"
              >
                View all <ArrowRight size={14} color="currentColor" />
              </Link> */}
            </div>

            <div className="w-full my-2">
              <DataTable columns={columns} data={data} />
            </div>

            <div className="flex justify-end gap-4 items-center">
              <Button size="xs" outline variant="secondary">Close</Button>
              <Button size="xs">Export PDF</Button>
            </div>
          </section>
        </PageModal>
      )}
    </>
  );
};

