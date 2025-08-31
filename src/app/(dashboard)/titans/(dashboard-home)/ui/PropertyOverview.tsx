"use client";
import {
  DashboardStatsCard,
  DataTable,
  PageModal,
} from "@/components/dashboard";
import { useModal } from "@/lib/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown } from "iconsax-react";
import { ChevronRight, House } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

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
//   {
//     accessorKey: "client",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="Client" />
//     ),
//     cell: ({ row }) => <div>{row.getValue("client")}</div>,
//   },
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
    accessorKey: "buyer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Buyer" />
    ),
    cell: ({ row }) => <div>{row.getValue("buyer")}</div>,
  },
  {
    accessorKey: "unit",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Unit" />
    ),
    cell: ({ row }) => <div>{row.getValue("unit")}</div>,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => <div>{row.getValue("price")}</div>,
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

export const PropertyOverview = ({ data }: { data: Transaction[] }) => {
  const { isModalOpen, toggleModal, closeModal } = useModal();
  return (
    <>
      <DashboardStatsCard
       title="Propeties sold"
       icon={<House size="24" color="#926667" />}
       data="2"
        theme=""
        onClick={toggleModal}
      />

      {isModalOpen && (
        <PageModal handleClose={closeModal} heading="Propeties sold">
          <section className="flex flex-col w-full gap-4 ">
         
            <div className="flex w-full rounded-xl text-xs py-[10px] flex-wrap bg-primary-50 p-3 text-white">
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Property Sold</p>
                <p className="text-grey-600">15</p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Paid</p>
                <p className="text-grey-600">₦12,050,000</p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Outstanding</p>
                <p className="text-grey-600">₦14,000</p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Closed Sales</p>
                <p className="text-grey-600">2</p>
              </div>
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


