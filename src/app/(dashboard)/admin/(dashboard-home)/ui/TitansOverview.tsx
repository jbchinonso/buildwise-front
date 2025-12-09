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
import { getAgentData } from "@/lib/services/dashboard.service";
import { toAmount, toAmountWithSuffix } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowRight } from "iconsax-react";
import { ChevronRight, Network } from "lucide-react";
import Link from "next/link";

type Agent = {
  titan: string;
  upline: string;
  joined: string;
};

const columns: ColumnDef<Agent>[] = [
  {
    accessorKey: "titan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Titan" />
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("titan")}</div>
    ),
  },
  {
    accessorKey: "upline",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Upline" />
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("upline")}</div>
    ),
  },
  {
    accessorKey: "joined",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Joined" />
    ),
    cell: ({ row }) => <div>{row.getValue("joined")}</div>,
  },
  {
    accessorKey: "_id",
    header: () => null,
    cell: ({ row }) => {
      const id = String(row.getValue("_id")) || String(row.getValue("id")); ;

      return (
        <div className="flex justify-center px-4">
          <Link href={`/admin/titans/all/${id}`} id="button">
            <ChevronRight className="size-4" />
            <span className="sr-only">View details</span>
          </Link>
        </div>
      );
    },
  },
];

export const TitansOverview = ({ stats = 0 }: { stats?: number }) => {
  const { isModalOpen, toggleModal, closeModal } = useModal();

  const {
    data: agentData,
    isLoading: isAgentLoading,
    // error: agentError,
  } = useClientFetch({
    action: getAgentData,
    isModalOpen,
  });
  return (
    <>
      <DashboardStatsCard
        title="Total titans"
        icon={<Network size="24" color="#926667" className="rotate-90" />}
        data={toAmountWithSuffix(stats, false)}
        value={"Total titans - " + toAmount(stats, false)}
        onClick={toggleModal}
      />

      {isModalOpen && (
        <PageModal
          handleClose={closeModal}
          heading="Titans Overview"
          className="md:max-w-[MIN(95%,620px)]"
        >
          <section className="flex flex-1 flex-col w-full gap-4 ">
            {isAgentLoading ? (
              <Skeleton className="h-20 w-full rounded-xl" />
            ) : (
              <div
                className={
                  "flex w-full rounded-xl text-xs py-[10px] flex-wrap bg-primary-50 p-3 text-white"
                }
              >
                <div className="flex flex-col flex-[25] gap-2">
                  <p className="text-grey-400">All Titans</p>
                  <p className="text-grey-600">
                    {toAmount(agentData?.totalTitans || 0, false)}
                  </p>
                </div>
                <div className="flex flex-col flex-[25] gap-2">
                  <p className="text-grey-400">Active Titan</p>
                  <p className="text-grey-600">
                    {toAmount(agentData?.activeTitans || 0, false)}
                  </p>
                </div>
                <div className="flex flex-col flex-[25] gap-2">
                  <p className="text-grey-400">Commissions earned</p>
                  <p className="text-grey-600">
                    {toAmount(agentData?.commissionsEarned || 0)}
                  </p>
                </div>
                <div className="flex flex-col flex-[25] gap-2">
                  <p className="text-grey-400">Commissions paid-out</p>
                  <p className="text-grey-600">
                    {toAmount(agentData?.commissionsPaidOut || 0)}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-baseline justify-between w-full gap-4 mt-6">
              <h2 className="font-semibold text-grey-600">
                Recently onboarded agents
              </h2>

              <Link
                href="/admin/titans"
                className="flex items-center gap-1 text-xs font-medium text-primary-400 flex-nowrap whitespace-nowrap"
              >
                View all <ArrowRight size={14} color="currentColor" />
              </Link>
            </div>

            {isAgentLoading ? (
              <TableSkeleton />
            ) : (
              <div className="w-full">
                <DataTable
                  columns={columns}
                  data={agentData?.recentlyOnboardedAgents || []}
                />
              </div>
            )}

            <div className="flex mt-auto md:justify-end gap-4 items-center">
              <Button
                onClick={closeModal}
                size="xs"
                outline
                variant="secondary"
              >
                Close
              </Button>

              <Button disabled={isAgentLoading} size="xs">
                Export PDF
              </Button>
            </div>
          </section>
        </PageModal>
      )}
    </>
  );
};
