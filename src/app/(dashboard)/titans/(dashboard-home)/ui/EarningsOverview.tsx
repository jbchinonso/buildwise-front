"use client";
import {
  DashboardStatsCard,
  DataTable,
  PageModal,
} from "@/components/dashboard";
import { Button, DataTableColumnHeader, TableSkeleton } from "@/components/ui";
import { useClientFetch, useModal } from "@/lib/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import { Money } from "iconsax-react";
import { getTitanEarningsChart } from "@/lib/services";
import { toAmount, toAmountWithSuffix } from "@/lib/utils";
import Link from "next/link";
import { convertToChartData } from "@/lib/dtos/earnings.dto";
import { EarningsOverviewChart } from "@/components/titans/dashboard";

type Earnings = {
  _id: string;
  id: string;
  date: string;
  source: string;
  type: string;
  amount: string;
  status: string;
};

const columns: ColumnDef<Earnings>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
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
    cell: ({ row }) => <div>{row.getValue("amount")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    id: "_id",
    header: () => null,
    cell: ({ row }) => {
      const id = String(row.getValue("_id")) || String(row?.original?._id);

      return (
        <div className="flex justify-center px-4">
          <Link href={`/titan/clients/all/${id}`} id="button">
            <ChevronRight className="size-4" />
            <span className="sr-only">View details</span>
          </Link>
        </div>
      );
    },
  },
];

export const EarningsOverview = ({ stats = 0 }: { stats?: number }) => {
  const { isModalOpen, toggleModal, closeModal } = useModal();
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
          className="max-w-[MIN(95%,728px)]"
        >
          <section className="flex flex-1 flex-col w-full gap-4 ">
            <div className="w-full flex flex-col">
              <EarningsOverviewChart chartData={chartData?.data || []} />
              <div className="flex w-full items-center gap-8 justify-center rounded-xl text-sm py-[10px] flex-wrap text-white">
                <div className="flex gap-2 items-center">
                  <span className="size-3 rounded-full bg-[#1FDBF4]" />
                  <div className="flex flex-col">
                    <p className="text-grey-400">Sales Commissions</p>
                    <p className="text-grey-600 text-[10px]">
                      Yearly Total:{" "}
                      {toAmount(chartData?.totalSalesCommission ?? 0)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="size-3 rounded-full bg-[#9747FF]" />
                  <div className="flex flex-col">
                    <p className="text-grey-400">Commissions from Titans</p>
                    <p className="text-grey-600 text-[10px]">
                      Yearly Total:{" "}
                      {toAmount(chartData?.totalSubTitanCommission ?? 0)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex w-full rounded-xl text-xs py-[10px] flex-wrap bg-primary-50 p-3 text-white">
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Total earnings</p>
                <p className="text-grey-600">{toAmount(0)}</p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Sales commission</p>
                <p className="text-grey-600">{toAmount(0)}</p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Titans commission</p>
                <p className="text-grey-600">{toAmount(0)}</p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Total paid-in</p>
                <p className="text-grey-600">{toAmount(0)}</p>
              </div>
            </div>

            <div className="flex flex-col items-baseline justify-between w-full gap-4 my-4">
              <h2 className="font-semibold text-grey-600 mt-6">
                Earnings breakdown
              </h2>

              <div className="w-full">
                {isLoading ? (
                  <TableSkeleton />
                ) : (
                  <DataTable columns={columns} data={[]} />
                )}
              </div>
            </div>

            <div className="flex justify-end gap-4 items-center mt-auto">
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
