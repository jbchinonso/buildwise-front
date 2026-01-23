"use client";
import {
  DashboardStatsCard,
  DataTable,
  PageModal,
  PropertiesSold,
} from "@/components/dashboard";
import { useClientFetch, useModal } from "@/lib/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown } from "iconsax-react";
import { ChevronRight } from "lucide-react";

import {
  DataTableColumnHeader,
  Button,
  Skeleton,
  TableSkeleton,
} from "@/components/ui";
import { toAmount, toAmountWithSuffix } from "@/lib/utils";
import Link from "next/link";
import {
  getTitanClientRecentSales,
  getTitanClientRevenueChart,
  getTitanClientRevenueSummary,
} from "@/lib/services";
import { IRecentSale } from "@/lib/type";


const columns: ColumnDef<IRecentSale>[] = [
  {
    accessorKey: "clientName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Client" />
    ),
    cell: ({ row }) => <div>{row.getValue("clientName")}</div>,
  },
  {
    accessorKey: "propertyName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Property" />
    ),
    cell: ({ row }) => <div>{row.getValue("propertyName")}</div>,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sales price" />
    ),
    cell: ({ row }) => <div>{toAmount(row.getValue("price"))}</div>,
  },
  {
    accessorKey: "revenue",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Revenue" />
    ),
    cell: ({ row }) => (
      <div className="text-primary-400">{toAmount(row.getValue("revenue"))}</div>
    ),
  },
  {
    accessorKey: "outstanding",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Outstanding" />
    ),
    cell: ({ row }) => (
      <div className="text-secondary-300">
        {toAmount(row.getValue("outstanding"))}
      </div>
    ),
  },
  {
    accessorKey: "commission",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Commission" />
    ),
    cell: ({ row }) => <div>{toAmount(row.getValue("commission"))}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = String(row.original?._id);

      return (
        <div className="flex justify-center">
          <Link href={`/titan/properties/all/${id}`} id="button">
            <ChevronRight className="size-4" />
            <span className="sr-only">View details</span>
          </Link>
        </div>
      );
    },
  },
];

export const RevenueOverview = ({ stats = 0 }: { stats?: string | number }) => {
  const { isModalOpen, toggleModal, closeModal } = useModal();

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
    data,
    isLoading,
    // error: isClientsError,
  } = useClientFetch({
    action: getTitanClientRecentSales,
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
        <PageModal
          handleClose={closeModal}
          heading="Revenue Overview"
          className="md:max-w-[MIN(95%,880px)]"
        >
          <section className="flex flex-col w-full flex-1 gap-4 ">
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

            <div className="w-full my-2">
              <h2 className="font-semibold my-2 text-grey-600">Recent Sales</h2>

              <DataTable
                isLoading={isLoading}
                columns={columns}
                data={data?.data || []}
                pagination={data?.pagination}
              />
            </div>

            <div className="flex justify-end gap-4 items-center mt-auto">
              <Button
                onClick={toggleModal}
                size="sm"
                outline
                variant="secondary"
              >
                Close
              </Button>
              <Button size="sm">Export PDF</Button>
            </div>
          </section>
        </PageModal>
      )}
    </>
  );
};
