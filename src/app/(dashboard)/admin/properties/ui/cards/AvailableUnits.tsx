"use client";
import {
  DashboardStatsCard,
  DataTable,
  PageModal,
} from "@/components/dashboard";
import {
  Button,
  ChartConfig,
  DataTableColumnHeader,
  PieChart,
} from "@/components/ui";
import { useModal } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowRight, ChevronRight, House } from "lucide-react";
import Link from "next/link";

const chartData = [
  { label: "available", data: 10, fill: "#9747FF" },
  { label: "reserved", data: 200, fill: "#926667" },
  { label: "closed", data: 300, fill: "#1FDBF4" },
];

const chartConfig = {
  available: {
    label: "Available",
  },
  reserved: {
    label: "Reserved",
  },
  closed: {
    label: "Closed",
  },
  other: {
    label: "Other",
  },
} satisfies ChartConfig;

type Transaction = {
  id: string;
  property: string;
  location: string;
  plots: string;
  date_listed: string;
};

const columns: ColumnDef<Transaction>[] = [
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
    accessorKey: "available_plots",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Available plots"
        className="whitespace-normal text-start"
      />
    ),
    cell: ({ row }) => <div>{row.getValue("available_plots")}</div>,
  },
  {
    accessorKey: "reserved_plots",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Reserved/sold plots"
        className="whitespace-normal text-left"
      />
    ),
    cell: ({ row }) => <div>{row.getValue("reserved_plots")}</div>,
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

export const AvailableUnits = ({
  data = [],
  availableUnits = 0,
}: {
  data?: any[];
  availableUnits?: number | string;
}) => {
  const { isModalOpen, toggleModal, closeModal } = useModal();
  return (
    <>
      <DashboardStatsCard
        title="Available Properties"
        icon={<House size="24" color="#1FDBF4" />}
        data={availableUnits}
        theme=""
        // className="cursor-auto"
        onClick={toggleModal}
      />

      {isModalOpen && (
        <PageModal
          handleClose={closeModal}
          heading="Available Units"
          className="max-w-[MIN(100%,600px)]"
        >
          <section className="flex flex-col w-full gap-4">
            <div className="w-full flex flex-col">
              <PieChart chartConfig={chartConfig} chartData={chartData} />
              <div className="flex w-full rounded-xl text-sm py-[10px] flex-wrap gap-2 text-white">
                <div className="flex flex-[20%] gap-2 items-center">
                  <span className="size-3 rounded-full bg-[#7A7F83]" />
                  <div className="flex flex-col">
                    <p className="text-grey-400">Total Listing</p>
                    <p className="text-grey-600">100</p>
                  </div>
                </div>
                {chartData.map(({ label, data, fill }) => {
                  const bg = `bg-[${fill}]`;
                  return (
                    <div
                      key={label}
                      className="flex flex-[20%] gap-2 items-center"
                    >
                      <span className={cn("size-3 rounded-full", bg)} />
                      <div className="flex flex-col">
                        <p className="text-grey-400 capitalize">{label}</p>
                        <p className="text-grey-600">{data}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-baseline justify-between w-full gap-4 my-1">
              <h2 className="font-semibold text-grey-600">
                Most units available
              </h2>

              <Link
                href="/"
                className="flex items-center gap-1 text-xs font-medium text-primary-400 flex-nowrap whitespace-nowrap"
              >
                View all <ArrowRight size={14} color="currentColor" />
              </Link>
            </div>

            <div className="w-full my-1">
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
