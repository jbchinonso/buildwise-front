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
import { getMostAvaliableUnits } from "@/lib/services";
import { IMostAvailableUnits, IPropertySummary } from "@/lib/type";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowRight, ChevronRight, House } from "lucide-react";
import Link from "next/link";
import { use } from "react";

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

const columns: ColumnDef<IMostAvailableUnits>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Property" />
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("location")}</div>
    ),
  },
  {
    accessorKey: "availablePlots",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Available plots"
        className="whitespace-normal text-start"
      />
    ),
    cell: ({ row }) => <div>{row.getValue("availablePlots")}</div>,
  },
  // {
  //   accessorKey: "reserved_plots",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader
  //       column={column}
  //       title="Reserved/sold plots"
  //       className="whitespace-normal text-left"
  //     />
  //   ),
  //   cell: ({ row }) => <div>{row.getValue("reserved_plots")}</div>,
  // },

  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     return (
  //       <div className="flex justify-end">
  //         <button id="button">
  //           <ChevronRight className="size-4" />
  //           <span className="sr-only">View details</span>
  //         </button>
  //       </div>
  //     );
  //   },
  // },
];

export const AvailableUnits = ({
  data,
  availableUnits = 0,
  summary,
  children,
}: {
  data: Promise<IMostAvailableUnits[]>;
  summary?: IPropertySummary;
  availableUnits?: number | string;
  children?: React.ReactNode;
}) => {
  const { isModalOpen, toggleModal, closeModal } = useModal();

  const tableData = use(data);

  const chartData = [
    {
      label: "available",
      data: summary?.totalAvailableUnits ?? 0,
      fill: "#9747FF",
    },
    {
      label: "reserved",
      data: summary?.totalReservedUnits ?? 0,
      fill: "#926667",
    },
    { label: "closed", data: summary?.closedSales ?? 0, fill: "#1FDBF4" },
  ];

  return (
    <>
      <DashboardStatsCard
        title="Available units"
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
          <section className="flex flex-1 flex-col w-full gap-4">
            <div className="w-full flex flex-col">
              <PieChart chartConfig={chartConfig} chartData={chartData} />
              <div className="flex w-full rounded-xl text-sm py-[10px] flex-wrap gap-2 text-white">
                <div className="flex flex-[20%] gap-2 items-center">
                  <span className="size-3 rounded-full bg-[#7A7F83]" />
                  <div className="flex flex-col">
                    <p className="text-grey-400">Total Listing</p>
                    <p className="text-grey-600">
                      {summary?.totalAvailableUnits ?? 0}
                    </p>
                  </div>
                </div>
                {chartData.map(({ label, data, fill: background }) => {
                  const bg = `bg-[${background}]`;
                  return (
                    <div
                      key={label}
                      className="flex flex-[20%] gap-2 items-center"
                    >
                      <span
                        style={{ background }}
                        className={cn("size-3 rounded-full", bg)}
                      />
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
              <DataTable columns={columns} data={[tableData] as any[]} />
            </div>

            <div className="flex mt-auto justify-end gap-4 items-center">
              <Button
                onClick={closeModal}
                size="xs"
                outline
                variant="secondary"
              >
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
