"use client";
import {
  DashboardStatsCard,
  DataTable,
  PageModal,
} from "@/components/dashboard";
import { Button, DataTableColumnHeader, Skeleton } from "@/components/ui";
import { useClientFetch, useModal } from "@/lib/hooks";
import { dashboardService } from "@/lib/services/dashboard.service";
import { toAmount, toAmountWithPrefix } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowRight, Profile2User } from "iconsax-react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

type Client = {
  id?: string;
  clientName: string;
  propertiesBought: string;
  payment: string;
  joined: string;
};

const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "clientName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Client" />
    ),
    cell: ({ row }) => <div>{row.getValue("clientName")}</div>,
  },
  {
    accessorKey: "propertiesBought",
    header: ({ column }) => (
      <DataTableColumnHeader className="whitespace-break-spaces" column={column} title="Property Bought" />
    ),
    cell: ({ row }) => <div>{row.getValue("propertiesBought")}</div>,
  },
  {
    accessorKey: "payment",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment" />
    ),
    cell: ({ row }) => <div>{row.getValue("payment")}</div>,
  },
  {
    accessorKey: "joined",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Joined" />
    ),
    cell: ({ row }) => <div>{row.getValue("joined")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          <button id="button">
            <ChevronRight className="size-4" />
            <span className="sr-only">View details</span>
          </button>
        </div>
      );
    },
  },
];

export const ClientOverview = ({
  stats = 0,
}: {
  stats?: number;
}) => {
  const { isModalOpen, toggleModal, closeModal } = useModal();
  const {
    data: clientsData,
    isLoading: isClientsLoading,
    error: clientsError,
  } = useClientFetch({
    action: async () => {
      const res = await dashboardService.getClientData();
      return res || [];
    },
    isModalOpen,
  });
  return (
    <>
      <DashboardStatsCard
        title="Total Clients"
        icon={<Profile2User size="24" color="#9747FF" />}
        data={toAmountWithPrefix(stats, false)}
        value={"Total clients - " + toAmount(stats, false)}
        theme=""
        onClick={toggleModal}
      />

      {isModalOpen && (
        <PageModal
          handleClose={closeModal}
          heading="Clients Overview"
          className="max-w-[MIN(95%,600px)]"
        >
          <section className="flex flex-1 flex-col w-full gap-4 ">
            {isClientsLoading ? (
              <Skeleton className="h-20 w-full rounded-xl" />
            ) : (
              <div className="flex w-full rounded-xl text-xs py-[10px] flex-wrap bg-primary-50 p-3 text-white">
                <div className="flex flex-col flex-[25] gap-2">
                  <p className="text-grey-400">All Clients</p>
                  <p className="text-grey-600">
                    {toAmount(clientsData?.allClients || 0, false)}
                  </p>
                </div>
                <div className="flex flex-col flex-[25] gap-2">
                  <p className="text-grey-400">Active Buyers</p>
                  <p className="text-grey-600">
                    {toAmount(clientsData?.activeBuyers || 0, false)}
                  </p>
                </div>
                <div className="flex flex-col flex-[25] gap-2">
                  <p className="text-grey-400">Closed sales</p>
                  <p className="text-grey-600">
                    {toAmount(clientsData?.closedSales || 0)}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-baseline justify-between w-full gap-4">
              <h2 className="font-semibold text-grey-600">
                Recently onboarded agents
              </h2>

              <Link
                href="/"
                className="flex items-center gap-1 text-xs font-medium text-primary-400 flex-nowrap whitespace-nowrap"
              >
                View all <ArrowRight size={14} color="currentColor" />
              </Link>
            </div>

            {isClientsLoading ? (
              <>
                <Skeleton className="h-8" />
                <Skeleton className="h-8" />
                <Skeleton className="h-8" />
                <Skeleton className="h-8" />
              </>
            ) : (
              <div className="w-full my-2">
                <DataTable
                  columns={columns}
                  data={clientsData?.recentlyOnboardedClients || []}
                />
              </div>
            )}

            <div className="flex mt-auto justify-end gap-4 items-center">
              <Button size="xs" outline variant="secondary">
                Close
              </Button>

              <Button disabled={isClientsLoading} size="xs">
                Export PDF
              </Button>
            </div>
          </section>
        </PageModal>
      )}
    </>
  );
};
