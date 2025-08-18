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
import { IReservedUnitDTO } from "@/lib/dtos/property.dto";
import { useModal } from "@/lib/hooks";
import { IClientRecentlyReserved, IPropertySummary } from "@/lib/type";
import { cn, formatAddress } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowRight } from "iconsax-react";
import { ChevronRight, Hourglass } from "lucide-react";
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

const columns: ColumnDef<IClientRecentlyReserved>[] = [
  {
    accessorKey: "propertyName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Property" />
    ),
    cell: ({ row }) => <div>{row.getValue("propertyName")}</div>,
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => (
      <div className="capitalize">
        {formatAddress(
          row.original?.location?.lga || "",
          row?.original?.location?.lga || ""
        )}
      </div>
    ),
  },
  {
    accessorKey: "plotNumber",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Reserved plots"
        className="whitespace-normal text-start"
      />
    ),
    cell: ({ row }) => <div>{row.getValue("plotNumber")}</div>,
  },
  {
    accessorKey: "dateReserved",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Date reserved"
        className="whitespace-normal text-left"
      />
    ),
    cell: ({ row }) => (
      <div>
        {format(row.getValue("dateReserved") || "", "dd/MM/yyyy, HH:MMa")}
      </div>
    ),
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

export const ReservedUnits = ({
  data = [],
  reservedUnits = 0,
  summary,
}: {
  data?: IClientRecentlyReserved[];
  summary?: IPropertySummary;
  reservedUnits?: number | string;
}) => {
  const { isModalOpen, toggleModal, closeModal } = useModal();
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
        title="Reserved units"
        icon={<Hourglass size="24" color="#926667" />}
        data={reservedUnits}
        theme=""
        // className="cursor-auto"
        onClick={toggleModal}
      />

      {isModalOpen && (
        <PageModal
          handleClose={closeModal}
          heading="Reserved properties"
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
                {chartData.map(({ label, data, fill }) => {
                  const bg = `bg-[${fill}]`;
                  return (
                    <div
                      key={label}
                      className="flex flex-[20%] gap-2 items-center"
                    >
                      <span
                        style={{ background: fill }}
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
              <h2 className="font-semibold text-grey-600">Recently reserved</h2>

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

            <div className="flex mt-auto justify-end gap-4 items-center">
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
