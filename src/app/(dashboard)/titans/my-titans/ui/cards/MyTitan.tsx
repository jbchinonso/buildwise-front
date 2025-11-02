"use client";
import {
  DashboardStatsCard,
  DataTable,
  PageModal,
} from "@/components/dashboard";
import { Button, DataTableColumnHeader, TableSkeleton } from "@/components/ui";
import { useClientFetch, useModal } from "@/lib/hooks";
import { Profile2User } from "iconsax-react";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import {
  getTitansOverviewList,
  getTitansOverviewSummary,
} from "@/lib/services";
import { toAmount } from "@/lib/utils";
import { IPagination } from "@/lib/type";

type Titan = {
  id: string;
  titan: string;
  sales: string;
  revenue: string;
  commission: string;
  joined: string;
  status: string;
  // instalment: string;
  // payment_status: string;
};

const columns: ColumnDef<Titan>[] = [
  {
    accessorKey: "titan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Titan" />
    ),
    cell: ({ row }) => <div>{row.getValue("titan")}</div>,
  },
  {
    accessorKey: "sales",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sales" />
    ),
    cell: ({ row }) => <div>{row.getValue("sales")}</div>,
  },
  {
    accessorKey: "revenue",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Revenue" />
    ),
    cell: ({ row }) => <div>{row.getValue("revenue")}</div>,
  },
  {
    accessorKey: "commission",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="My Commission" />
    ),
    cell: ({ row }) => <div>{row.getValue("commission")}</div>,
  },
  {
    accessorKey: "joined",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Joined" />
    ),
    cell: ({ row }) => <div>{row.getValue("joined")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },

  {
    accessorKey: "id",
    header: () => null,
    cell: ({ row }) => {
      const id =
        String(row.getValue("id")) ||
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

export const MyTitan = ({ stats }: { stats: number | string }) => {
  const { isModalOpen, toggleModal, closeModal } = useModal();

  const { data, isLoading } = useClientFetch({
    action: async () => {
      const res = await getTitansOverviewList();

      return res as {
        response: any[];
        meta: IPagination;
      };
    },
    isModalOpen,
  });

  const { data: summary, isLoading: isSummaryLoading } = useClientFetch({
    action: async () => {
      const res = await getTitansOverviewSummary();

      return res as {
        titanCommission: number;
        titanRevenue: number;
        totalTitans: number;
      };
    },
    isModalOpen,
  });

  return (
    <>
      <DashboardStatsCard
        title="My Titans"
        icon={<Profile2User size="24" color="#926667" />}
        data={toAmount(stats || 0, false)}
        onClick={toggleModal}
      />

      {isModalOpen && (
        <PageModal
          handleClose={closeModal}
          heading="My Titans Overview"
          className="max-w-[MIN(95%,880px)]"
        >
          <section className="flex flex-1 flex-col w-full gap-4 ">
            <div
              data-ui={isSummaryLoading ? "loading" : ""}
              className="flex w-full rounded-xl text-xs py-[10px] flex-wrap bg-primary-50 p-3 text-white data-loading:animate-pulse"
            >
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">My Titans</p>
                <p className="text-grey-600 font-medium">
                  {toAmount(summary?.totalTitans || 0, false)}
                </p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Commission from Titans</p>
                <p className="text-grey-600 font-medium">
                  {toAmount(summary?.titanCommission || 0)}
                </p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Titans total revenue</p>
                <p className="text-grey-600 font-medium">
                  {toAmount(summary?.titanRevenue || 0)}
                </p>
              </div>
            </div>

            <div className="w-full my-2">
              {isLoading ? (
                <TableSkeleton />
              ) : (
                <DataTable columns={columns} data={data?.response || []} />
              )}
            </div>

            <div className="flex mt-auto justify-end gap-4 items-center">
              <Button
                onClick={toggleModal}
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
