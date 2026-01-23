"use client";
import {
  DashboardStatsCard,
  DataTable,
  PageModal,
} from "@/components/dashboard";
import { Button, DataTableColumnHeader, TableSkeleton } from "@/components/ui";
import { useClientFetch, useModal } from "@/lib/hooks";
import { getActiveTitanClient, getTitanClientOverview } from "@/lib/services";
import { IActiveTitanClient } from "@/lib/type";
import { toAmount, toAmountWithSuffix } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowRight, Profile2User } from "iconsax-react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const columns: ColumnDef<IActiveTitanClient>[] = [
  {
    accessorKey: "clientName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Client" />
    ),
    cell: ({ row }) => <div className="capitalize">{row.getValue("clientName")}</div>,
  },
  {
    accessorKey: "properties",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Properties" />
    ),
    cell: ({ row }) => <div>{row.getValue("properties")}</div>,
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
    accessorKey: "payment",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment" />
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("payment")}</div>
    ),
  },
  {
    accessorKey: "joined",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Joined" />
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("joined")}</div>
    ),
  },
  {
    accessorKey: "_id",
    header: () => null,
    cell: ({ row }) => {
      const id = String(row.getValue("_id")) || String(row?.original?._id);

      return (
        <div className="flex justify-center px-4">
          <Link href={`clients/all/${id}`} id="button">
            <ChevronRight className="size-4" />
            <span className="sr-only">View details</span>
          </Link>
        </div>
      );
    },
  },
];

export const ClientOverview = ({ stats = 0 }: { stats?: string | number }) => {
  const { isModalOpen, toggleModal, closeModal } = useModal();

  const { data, isLoading } = useClientFetch({
    action: getTitanClientOverview,
    isModalOpen,
  });

  const {
    data: clientsTable,
    isLoading: isFetchingClients,
    // error: isClientsError,
  } = useClientFetch({
    action: getActiveTitanClient,
    isModalOpen,
  });

  return (
    <>
      <DashboardStatsCard
        title="Total Clients"
        icon={<Profile2User size="24" color="#9747FF" />}
        data={toAmountWithSuffix(stats, false)}
        onClick={toggleModal}
      />

      {isModalOpen && (
        <PageModal
          handleClose={closeModal}
          heading="Clients Overview"
          className="md:max-w-[MIN(95%,750px)]"
        >
          <section className="flex flex-1 flex-col w-full gap-4 ">
            <div
              data-ui={isLoading ? "loading" : ""}
              className="flex w-full rounded-xl text-xs py-[10px] flex-wrap bg-primary-50 p-3 text-white data-loading:animate-pulse"
            >
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Total Clients</p>
                <p className="text-grey-600">
                  {toAmount(data?.totalClients || 0, false)}
                </p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Active buyers</p>
                <p className="text-grey-600">
                  {toAmount(data?.activeBuyers || 0, false)}
                </p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Properties</p>
                <p className="text-grey-600">
                  {toAmount(data?.properties || 0, false)}
                </p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Closed sales</p>
                <p className="text-grey-600">
                  {toAmount(data?.closedSales || 0, false)}
                </p>
              </div>
            </div>

            <div className="flex items-baseline justify-between mt-6 w-full gap-4">
              <h2 className="font-semibold text-grey-600">
                Active clients added
              </h2>

              <Link
                href="/titans/clients/all"
                className="flex items-center gap-1 text-xs font-medium text-primary-400 flex-nowrap whitespace-nowrap"
              >
                View all <ArrowRight size={14} color="currentColor" />
              </Link>
            </div>

            <div className="w-full my-2">
              {isFetchingClients ? (
                <TableSkeleton />
              ) : (
                <DataTable
                  columns={columns}
                  data={clientsTable?.clients || []}
                />
              )}
            </div>

            <div className="flex mt-auto md:justify-end gap-4 items-center">
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
