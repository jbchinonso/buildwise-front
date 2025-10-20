"use client";
import {
  DashboardStatsCard,
  DataTable,
  PageModal,
} from "@/components/dashboard";
import { Button, DataTableColumnHeader, TableSkeleton } from "@/components/ui";
import { useClientFetch, useModal } from "@/lib/hooks";
import { ArrowRight } from "iconsax-react";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight, Network } from "lucide-react";
import { TitanCommissionOverview } from "../TitanCommissionOverview";
import {
  getTitansCommissionChart,
  getTitansCommissionList,
  getTitansCommissionSummary,
} from "@/lib/services";
import { toAmount, toAmountWithSuffix } from "@/lib/utils";

type Transaction = {
  id: string;
  date: string;
  titan: string;
  type: string;
  amount: string;
  status: string;
};

const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "titan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Titan" />
    ),
    cell: ({ row }) => <div>{row.getValue("titan")}</div>,
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
    accessorKey: "_id",
    header: () => null,
    cell: ({ row }) => {
      const id =
        String(row.getValue("_id")) ||
        String(row?.original?.id) ||
        String(row.getValue("_id"));

      return (
        <div className="flex justify-center px-4">
          <Link href={`/${id}`} id="button">
            <ChevronRight className="size-4" />
            <span className="sr-only">View details</span>
          </Link>
        </div>
      );
    },
  },
];

export const TitanCommission = ({ stats }: { stats?: string | number }) => {
  const { isModalOpen, toggleModal, closeModal } = useModal();

  const { data: summary, isLoading: isSummaryLoading } = useClientFetch({
    action: async () => {
      const res = await getTitansCommissionSummary();

      return res as {
        totalCommission: number;
        titanCommission: number;
        subTitanCommission: number;
        bonusCommission: number;
      };
    },
    isModalOpen,
  });

  const { data: chart, isLoading: isChartLoading } = useClientFetch({
    action: async () => {
      const res = await getTitansCommissionChart();

      return res as any[];
    },
    isModalOpen,
  });

  const { data, isLoading } = useClientFetch({
    action: async () => {
      // const res = await getTitansCommissionList();
      // return res as any[];
    },
    isModalOpen,
  });

  return (
    <>
      <DashboardStatsCard
        title="My Titans Commission"
        icon={<Network size="24" color="#1FDBF4" className="rotate-90" />}
        data={toAmountWithSuffix(stats || 0)}
        onClick={toggleModal}
      />

      {isModalOpen && (
        <PageModal
          handleClose={closeModal}
          heading="My Titans Overview"
          className="max-w-[MIN(95%,620px)]"
        >
          <section className="flex flex-1 flex-col w-full gap-y-4 ">
            {/* <TitanCommissionOverview /> */}

            <div
              data-ui={isSummaryLoading ? "loading" : ""}
              className="flex w-full rounded-xl text-xs py-[10px] flex-wrap bg-primary-50 p-3 text-white data-loading:animate-pulse"
            >
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Total Commission</p>
                <p className="text-grey-600 font-medium">
                  {toAmount(summary?.totalCommission || 0)}
                </p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Commission from Titans</p>
                <p className="text-grey-600 font-medium">
                  {toAmount(summary?.titanCommission || 0)}
                </p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Comission from Sub-titans</p>
                <p className="text-grey-600 font-medium">
                  {toAmount(summary?.subTitanCommission || 0)}
                </p>
              </div>
            </div>

            <div className="flex items-baseline justify-between w-full gap-4">
              <h2 className="font-semibold text-grey-600">
                Recently earned Commissions
              </h2>

              <Link
                href="/titans/my-titans/commission-breakdown"
                className="flex items-center gap-1 text-xs font-medium text-primary-400 flex-nowrap whitespace-nowrap"
              >
                View all <ArrowRight size={14} color="currentColor" />
              </Link>
            </div>

            {/* <div className="w-full my-2">
              {isLoading ? (
                <TableSkeleton />
              ) : (
                <DataTable columns={columns} data={data || []} />
              )}
            </div>

            <div className="flex justify-end gap-4 items-center">
              <Button
                onClick={toggleModal}
                size="xs"
                outline
                variant="secondary"
              >
                Close
              </Button>

              <Button size="xs">Export PDF</Button>
            </div> */}
          </section>
        </PageModal>
      )}
    </>
  );
};
