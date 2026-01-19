"use client";
import {
  DashboardStatsCard,
  DataTable,
  PageModal,
} from "@/components/dashboard";
import { Button, DataTableColumnHeader, TableSkeleton } from "@/components/ui";
import { useClientFetch, useModal } from "@/lib/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { Money } from "iconsax-react";
import {
  getTitanCommissionEarnings,
  getTitanEarningsChart,
  getTitansCommissionSummary,
} from "@/lib/services";
import { formatDate, toAmount, toAmountWithSuffix } from "@/lib/utils";
import { convertToChartData } from "@/lib/dtos/earnings.dto";
import { EarningsOverviewChart } from "@/components/titans/dashboard";

type Earning = {
  date: string;
  source: string;
  type: string;
  amount: string | number;
  status: string;
};

const columns: ColumnDef<Earning>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => <div>{formatDate(row.getValue("date"))}</div>,
  },
  {
    accessorKey: "source",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Source" />
    ),
    cell: ({ row }) => <div>{row.getValue("source")}</div>,
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
    cell: ({ row }) => <div>{toAmount(row.getValue("amount") || 0)}</div>,
  },
];

export const Earnings = ({ stats = 0 }: { stats?: number }) => {
  const { isModalOpen, toggleModal, closeModal } = useModal();
  const { data: tableData, isLoading: isFetchingTableData } = useClientFetch({
    action: getTitanCommissionEarnings,
    isModalOpen,
  });

  const { data: summary, isLoading: isFetchingSummary } = useClientFetch({
    action: getTitansCommissionSummary,
    isModalOpen,
  });

  const { data: chartData, isLoading } = useClientFetch({
    action: async () => {
      const res = await getTitanEarningsChart();
      const data = convertToChartData(res) || [];
      const totalSalesCommission = data?.reduce((acc, cv) => {
        return (acc += cv?.salesCommission || 0);
      }, 0);
      const totalSubTitanCommission = data?.reduce((acc, cv) => {
        return (acc += cv?.subTitanCommission || 0);
      }, 0);
      return { data, totalSalesCommission, totalSubTitanCommission };
    },
    isModalOpen,
  });

  return (
    <>
      <DashboardStatsCard
        title="Earnings"
        icon={<Money size="24" color="#1FDBF4" />}
        data={toAmountWithSuffix(stats || 0)}
        onClick={toggleModal}
      />

      {isModalOpen && (
        <PageModal
          handleClose={closeModal}
          heading="My Earnings"
          className="md:max-w-[MIN(95%,728px)]"
        >
          <section className="flex flex-col w-full gap-4 ">
            <EarningsOverviewChart
              isLoading={isLoading}
              chartData={chartData?.data || []}
            />

            <div
              data-ui={isFetchingSummary ? "loading" : ""}
              className="flex w-full rounded-xl text-xs py-[10px] flex-wrap bg-primary-50 p-3 text-white data-loading:animate-pulse"
            >
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Total earnings</p>
                <p className="text-grey-600">
                  {toAmount(summary?.totalEarnings || 0)}
                </p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Sales commission</p>
                <p className="text-grey-600">
                  {toAmount(summary?.salesCommission || 0)}
                </p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Titans commission</p>
                <p className="text-grey-600">
                  {toAmount(summary?.titansCommission || 0)}
                </p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Total paid-in</p>
                <p className="text-grey-600">
                  {toAmount(summary?.totalPaidIn || 0)}
                </p>
              </div>
            </div>

            <div className="flex items-baseline justify-between w-full gap-4">
              <h2 className="font-semibold text-grey-600 mt-6">
                Earnings breakdown
              </h2>
            </div>

            <div className="w-full my-2">
              <DataTable
                isLoadingInner={isFetchingTableData}
                columns={columns}
                data={tableData || []}
              />
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
