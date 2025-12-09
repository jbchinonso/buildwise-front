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
  TableSkeleton,
} from "@/components/ui";
import { useClientFetch, useModal } from "@/lib/hooks";
import { getAllProperties } from "@/lib/services";
import { IPropertySummary } from "@/lib/type";
import { cn, formatAddress, formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowRight } from "iconsax-react";
import { ChevronRight, KeyRound } from "lucide-react";
import Link from "next/link";

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

type Sale = {
  _id: string;
  property: string;
  location: string;
  address: string;
  plots: string;
  date_listed: string;
  lga: string;
  state: string;
};

const columns: ColumnDef<Sale>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Property" />
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    id: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => (
      <div className="whitespace-normal">
        {formatAddress(
          row.original?.address || "",
          row.original?.lga || "",
          row?.original?.state || ""
        )}
      </div>
    ),
  },
  {
    accessorKey: "soldUnits",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Units bought" />
    ),
    cell: ({ row }) => <div>{row.getValue("soldUnits")}</div>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date closed" />
    ),
    cell: ({ row }) => (
      <div className="whitespace-normal">
        {formatDate(row.getValue("createdAt"), "dd/MM/yyyy, HH:MMa")}
      </div>
    ),
  },
  {
    // id: "actions",
    accessorKey: "_id",
    header: () => null,
    cell: ({ row }) => {
      const id = String(row.getValue("_id")) || String(row?.original?._id);

      return (
        <div className="flex justify-center">
          <Link href={`/admin/properties/all/${id}`} id="button">
            <ChevronRight className="size-4" />
            <span className="sr-only">View details</span>
          </Link>
        </div>
      );
    },
  },
];

export const ClosedSales = ({
  closedSales = 0,
  summary,
}: {
  summary?: IPropertySummary;
  closedSales?: number | string;
}) => {
  const { isModalOpen, toggleModal, closeModal } = useModal();

  const {
    data: allProperties,
    isLoading,
    error,
  } = useClientFetch({
    action: async () => await getAllProperties({ limit: 5 }),
    isModalOpen,
  });

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
        title="Closed sales"
        icon={<KeyRound size="24" color="#9747FF" />}
        data={closedSales}
        theme=""
        onClick={toggleModal}
      />

      {isModalOpen && (
        <PageModal
          handleClose={closeModal}
          heading="Closed Sales"
          className="md:max-w-[MIN(100%,600px)]"
        >
          <section className="flex flex-1 flex-col w-full gap-4">
            <div className="w-full flex flex-col">
              <PieChart chartConfig={chartConfig} chartData={chartData} />
              <div className="flex w-full rounded-xl text-sm py-[10px] flex-wrap gap-2 text-white">
                <div className="flex flex-[20%] gap-2 items-center">
                  <span className="size-3 rounded-full bg-[#7A7F83]" />
                  <div className="flex flex-col">
                    <p className="text-grey-400">Total Listing</p>
                    <p className="text-grey-600">{summary?.totalUnits ?? 0}</p>
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

            <div className="flex items-baseline justify-between w-full gap-4 mt-4">
              <h2 className="font-semibold text-grey-600">Recently closed</h2>

              <Link
                href="/admin/properties/all?sortBy=closed"
                className="flex items-center gap-1 text-xs font-medium text-primary-400 flex-nowrap whitespace-nowrap"
              >
                View all <ArrowRight size={14} color="currentColor" />
              </Link>
            </div>

            <div className="w-full min-h-24 relative flex">
              {isLoading ? (
                <TableSkeleton />
              ) : (
                <DataTable columns={columns} data={allProperties?.data || []} />
              )}
            </div>

            <div className="flex mt-auto md:justify-end gap-4 items-center">
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
