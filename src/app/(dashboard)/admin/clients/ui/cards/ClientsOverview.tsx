"use client";
import {
  DashboardStatsCard,
  DataTable,
  PageModal,
} from "@/components/dashboard";
import { Button, DataTableColumnHeader, TableSkeleton } from "@/components/ui";
import { SpinLoadingAnimation } from "@/components/ui/SpinLoadingAnimation";
import { useClientFetch, useModal } from "@/lib/hooks";
import { getClientOverview } from "@/lib/services";
import { IClientOverviewRecentCLients } from "@/lib/type";
import { toAmount } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowRight, Profile2User } from "iconsax-react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const columns: ColumnDef<IClientOverviewRecentCLients>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Client" />
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => <div>{row.getValue("location")}</div>,
  },
  {
    accessorKey: "agentName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Agent" />
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("agentName")}</div>
    ),
  },
  {
    // id: "actions",
    accessorKey: "id",
    header: () => null,
    cell: ({ row }) => {
      const id = String(row.getValue("id")) || String(row?.id);

      return (
        <div className="flex justify-center">
          <Link href={`/admin/clients/all/${id}`} id="button">
            <ChevronRight className="size-4" />
            <span className="sr-only">View details</span>
          </Link>
        </div>
      );
    },
  },
];

export const ClientOverview = ({
  clients = 0,
}: {
  clients?: string | number;
}) => {
  const { isModalOpen, toggleModal, closeModal } = useModal();

  const { data, isLoading, error } = useClientFetch({
    action: async () => {
      const res = await getClientOverview();
      return res || [];
    },
    isModalOpen,
  });

  return (
    <>
      <DashboardStatsCard
        title="Clients"
        icon={<Profile2User size="24" color="rgba(112,244,31,1)" />}
        data={clients}
        theme=""
        onClick={toggleModal}
      />

      {isModalOpen && (
        <PageModal
          handleClose={closeModal}
          heading="Clients Overview"
          className="max-w-[MIN(95%,600px)]"
        >
          <section className="flex  flex-1 flex-col w-full gap-4 ">
            <div className="flex w-full rounded-xl text-xs py-[10px] flex-wrap bg-primary-50 p-3 text-white">
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">All Clients</p>
                <p className="text-grey-600">
                  {toAmount(data?.totalClients || 0, false)}
                </p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Active Buyers</p>
                <p className="text-grey-600">
                  {toAmount(data?.activeBuyersCount || 0, false)}
                </p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Properties bought/reserved</p>
                <p className="text-grey-600">
                  {toAmount(data?.totalPropertiesBoughtOrReserved || 0)}
                </p>
              </div>
            </div>

            <div className="flex items-baseline justify-between mt-4 w-full gap-4">
              <h2 className="font-semibold text-grey-600">Recently added</h2>

              <Link
                href="/admin/clients/all"
                className="flex items-center gap-1 text-xs font-medium text-primary-400 flex-nowrap whitespace-nowrap"
              >
                View all <ArrowRight size={14} color="currentColor" />
              </Link>
            </div>

            <div className="w-full my-2 min-h-24 relative flex">
              {isLoading ? (
                <TableSkeleton />
              ) : (
                <DataTable columns={columns} data={data?.recentClients || []} />
              )}
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
