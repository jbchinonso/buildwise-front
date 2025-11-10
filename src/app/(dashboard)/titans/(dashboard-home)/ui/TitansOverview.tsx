"use client";
import {
  DashboardStatsCard,
  DataTable,
  PageModal,
} from "@/components/dashboard";
import {
  Button,
  DataTableColumnHeader,
  Skeleton,
  TableSkeleton,
} from "@/components/ui";
import { useClientFetch, useModal } from "@/lib/hooks";
import { toAmount } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowRight } from "iconsax-react";
import { ChevronRight, Network } from "lucide-react";
import Link from "next/link";
import React from "react";

type Commissions = {
  id: string;
  _id: string;
  titan: string;
  subTitans: string;
  status: string;
  commission: string | number;
  subTitanCommission: string | number;
};

const columns: ColumnDef<Commissions>[] = [
  {
    accessorKey: "titan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Titan Name" />
    ),
    cell: ({ row }) => <div>{row.getValue("titan")}</div>,
  },
  {
    accessorKey: "subTitans",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sub-titans" />
    ),
    cell: ({ row }) => <div>{toAmount(row.getValue("subTitans"), false)}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "commission",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Commission" />
    ),
    cell: ({ row }) => <div>{toAmount(row.getValue("commission") || 0)}</div>,
  },
  {
    accessorKey: "subTitanCommission",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Commission from sub-titans"
        className="whitespace-normal"
      />
    ),
    cell: ({ row }) => (
      <div>{toAmount(row.getValue("subTitanCommission") || 0)}</div>
    ),
  }
];

export const TitansOverview = ({ stats = 0 }: { stats?: number }) => {
  const { isModalOpen, toggleModal, closeModal } = useModal();

  const { isLoading, data = [] } = useClientFetch({
    action: async () => [],
    isModalOpen,
  });
  return (
    <>
      <DashboardStatsCard
        title="Titans"
        icon={<Network size="24" color="#926667" className="rotate-90" />}
        data={toAmount(stats, false)}
        onClick={toggleModal}
      />

      {isModalOpen && (
        <PageModal
          handleClose={closeModal}
          heading="My Titans"
          className="max-w-[MIN(95%,683px)]"
        >
          <section className="flex flex-col w-full gap-4 flex-1">
            {isLoading ? (
              <Skeleton className="h-8" />
            ) : (
              <div className="flex w-full rounded-xl text-xs py-[10px] flex-wrap bg-primary-50 p-3 text-white">
                <div className="flex flex-col flex-[25] gap-2">
                  <p className="text-grey-400">Titans</p>
                  <p className="text-grey-600">{toAmount(0, false)}</p>
                </div>
                <div className="flex flex-col flex-[25] gap-2">
                  <p className="text-grey-400 whitespace-normal">
                    Commissions from all Titans
                  </p>
                  <p className="text-grey-600">{toAmount(0)}</p>
                </div>
                <div className="flex flex-col flex-[25] gap-2">
                  <p className="text-grey-400 whitespace-normal">
                    Commission from my Titans
                  </p>
                  <p className="text-grey-600">{toAmount(0)}</p>
                </div>
                <div className="flex flex-col flex-[25] gap-2">
                  <p className="text-grey-400 whitespace-normal">
                    Commission from Sub-titans
                  </p>
                  <p className="text-grey-600">{toAmount(0)}</p>
                </div>
              </div>
            )}

            <div className="w-full my-4">
              {isLoading ? (
                <TableSkeleton />
              ) : (
                <DataTable columns={columns} data={data || []} />
              )}
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
