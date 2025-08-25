"use client";
import {
  DashboardStatsCard,
  DataTable,
  PageModal,
} from "@/components/dashboard";
import { Button, DataTableColumnHeader } from "@/components/ui";
import { useModal } from "@/lib/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight, House } from "lucide-react";
import { PropertiesSold } from "./PropertiesSold";
import { PieChartCard } from "./PieChartCard";

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
    accessorKey: "payment_status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
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
const generateChartData = (data: Transaction[]) => {
  const closed = data.filter((tx) => tx.payment_status === 'Closed').length;
  const ongoing = data.filter((tx) => tx.payment_status === 'Ongoing').length;

  if (closed + ongoing === 0) {
    return [
      { name: 'Closed sales', value: 3 },
      { name: 'Ongoing sales', value: 17 },
    ];
  }

  return [
    { name: 'Closed sales', value: closed },
    { name: 'Ongoing sales', value: ongoing },
  ];
};
export const SalesOverview = ({ data }: { data: Transaction[] }) => {
  const chartData = generateChartData(data);
  const { isModalOpen, toggleModal, closeModal } = useModal();
  return (
    <>
      <DashboardStatsCard
        title="Total sales"
        icon={<House size="24" color="#1FDBF4" />}
        data="23.8B"
        theme=""
        onClick={toggleModal}
      />

      {isModalOpen && (
        <PageModal handleClose={closeModal} heading="Closed Sales">
          <section className="flex flex-col w-full gap-4 ">

            <PieChartCard data={chartData} colors={['#4FAB15', '#6E3334']} />

            <div className="flex w-full rounded-xl text-xs py-[10px] flex-wrap bg-primary-50 p-3 text-white">
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Properties sold</p>
                <p className="text-grey-600">15</p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Completed purchase</p>
                <p className="text-grey-600">2</p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Closed salesrevenue</p>
                <p className="text-grey-600">₦7,000,000</p>
              </div>
             
            </div>

            <div className="flex items-baseline justify-between w-full gap-4">
              <h2 className="font-semibold text-grey-600">Closed Sales</h2>

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
