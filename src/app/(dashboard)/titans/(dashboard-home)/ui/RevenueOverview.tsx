"use client";
import {
  DashboardStatsCard,
  DataTable,
  PageModal,
} from "@/components/dashboard";
import { useClientFetch, useModal } from "@/lib/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown } from "iconsax-react";
import { ChevronRight } from "lucide-react";
import { PropertiesSold } from "./PropertiesSold";

import { DataTableColumnHeader, Button, TableSkeleton } from "@/components/ui";
import { toAmount, toAmountWithSuffix } from "@/lib/utils";
import {
  getTitanClientRevenueChart,
  getTitanClientRevenueSummary,
  getTitanDashboardRecentSalesStats,
  getTitanEarningsOverview,
} from "@/lib/services";
import { ITitanSalesTable } from "@/lib/type";
import Link from "next/link";

const columns: ColumnDef<ITitanSalesTable>[] = [
  {
    accessorKey: "clientName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Client" />
    ),
    cell: ({ row }) => <div>{row.getValue("clientName")}</div>,
  },
  {
    accessorKey: "property",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Property" />
    ),
    cell: ({ row }) => <div>{row.getValue("property")}</div>,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sales price" />
    ),
    cell: ({ row }) => <div>{toAmount(row.getValue("price") || 0)}</div>,
  },
  {
    accessorKey: "paid",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Paid" />
    ),
    cell: ({ row }) => <div>{toAmount(row.getValue("paid") || 0)}</div>,
  },
  {
    accessorKey: "outstanding",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Outstanding" />
    ),
    cell: ({ row }) => <div>{toAmount(row.getValue("outstanding") || 0)}</div>,
  },
  {
    accessorKey: "commission",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Commission" />
    ),
    cell: ({ row }) => <div>{toAmount(row.getValue("commission") || 0)}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = String(row.original?.saleId || row.getValue("saleId"));

      return (
        <div className="flex justify-center px-4">
          <Link href={`/titans/clients/all/${id}`} id="button">
            <ChevronRight className="size-4" />
            <span className="sr-only">View details</span>
          </Link>
        </div>
      );
    },
  },
];

export const RevenueOverview = ({ stats = 0 }: { stats?: number }) => {
  const { isModalOpen, toggleModal, closeModal } = useModal();
  const { isLoading } = useClientFetch({
    action: getTitanEarningsOverview,
    isModalOpen,
  });

  const {
    data: chartData,
    isLoading: isFetchingChartData,
    // error: isClientsError,
  } = useClientFetch({
    action: getTitanClientRevenueChart,
    isModalOpen,
  });

  const {
    data: summary,
    isLoading: isSummaryLoading,
    // error: isClientsError,
  } = useClientFetch({
    action: getTitanClientRevenueSummary,
    isModalOpen,
  });

  const {
    data: sales,
    isLoading: isFetchingSales,
    // error: isClientsError,
  } = useClientFetch({
    action: getTitanDashboardRecentSalesStats,
    isModalOpen,
  });

  return (
    <>
      <DashboardStatsCard
        title="Total revenue"
        icon={<ArrowDown size="24" color="#70F41F" />}
        data={toAmountWithSuffix(stats)}
        onClick={toggleModal}
      />

      {isModalOpen && (
        <PageModal handleClose={closeModal} heading="Revenue Overview">
          <section className="flex flex-col w-full gap-4">
            <PropertiesSold
              chartData={chartData || []}
              isLoading={isFetchingChartData}
            />

            <div
              data-ui={isSummaryLoading ? "loading" : ""}
              className="flex w-full rounded-xl text-xs py-[10px] flex-wrap bg-primary-50 p-3 text-white data-loading:animate-pulse"
            >
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Total revenue</p>
                <p className="text-grey-600">
                  {toAmount(summary?.totalRevenue || 0)}
                </p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Property sold</p>
                <p className="text-grey-600">
                  {toAmount(summary?.propertySold || 0, false)}
                </p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Avg. revenue per sale</p>
                <p className="text-grey-600">
                  {toAmount(summary?.avgRevenuePerSale || 0)}
                </p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Commission earned</p>
                <p className="text-grey-600">
                  {toAmount(summary?.commissionEarned || 0)}
                </p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Pending commission</p>
                <p className="text-grey-600">
                  {toAmount(summary?.pendingCommission || 0)}
                </p>
              </div>
            </div>

            <div className="flex items-baseline justify-between w-full gap-4 mt-4">
              <h2 className="font-semibold text-grey-600">Recent Sales</h2>

              {/* <Link
                href="/"
                className="flex items-center gap-1 text-xs font-medium text-primary-400 flex-nowrap whitespace-nowrap"
              >
                View all <ArrowRight size={14} color="currentColor" />
              </Link> */}
            </div>

            <div className="w-full">
              {isFetchingSales ? (
                <>
                  <TableSkeleton />
                </>
              ) : (
                <DataTable columns={columns} data={sales || []} />
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
