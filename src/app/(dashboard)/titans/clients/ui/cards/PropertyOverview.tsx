"use client";
import {
  DashboardStatsCard,
  DataTable,
  PageModal,
} from "@/components/dashboard";
import { useClientFetch, useModal } from "@/lib/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight, House } from "lucide-react";

import { DataTableColumnHeader, Button, TableSkeleton } from "@/components/ui";
import { toAmount, toAmountWithSuffix } from "@/lib/utils";
import Link from "next/link";
import { getPropertiesSold, getTitanPropertiesSummary } from "@/lib/services";

type Transaction = {
  id: string;
  client: string;
  property: string;
  location: string;
  last_payment: string;
  totalPaid: string;
  outstanding: string;
  instalment: string;
  payment_status: string;
};

const columns: ColumnDef<Transaction>[] = [
  //   {
  //     accessorKey: "client",
  //     header: ({ column }) => (
  //       <DataTableColumnHeader column={column} title="Client" />
  //     ),
  //     cell: ({ row }) => <div>{row.getValue("client")}</div>,
  //   },
  {
    accessorKey: "property",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Property" />
    ),
    cell: ({ row }) => <div>{row.getValue("property")}</div>,
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => <div>{row.getValue("location")}</div>,
  },
  {
    accessorKey: "buyer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Buyer" />
    ),
    cell: ({ row }) => <div>{row.getValue("buyer")}</div>,
  },
  {
    accessorKey: "unit",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Unit" />
    ),
    cell: ({ row }) => <div>{row.getValue("unit")}</div>,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => <div>{row.getValue("price")}</div>,
  },

  {
    accessorKey: "payment_status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment status" />
    ),
    cell: ({ row }) => <div>{row.getValue("payment_status")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = String(row.getValue("_id")) || String(row?.id);

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

export const PropertyOverview = ({
  stats = 0,
}: {
  stats?: string | number;
}) => {
  const { isModalOpen, toggleModal, closeModal } = useModal();

  const { data: summary, isLoading: isFetchingSummary } = useClientFetch({
    action: getTitanPropertiesSummary,
    isModalOpen,
  });

  const { data, isLoading: isFetchingProperties } = useClientFetch({
    action: getPropertiesSold,
    isModalOpen,
  });

  return (
    <>
      <DashboardStatsCard
        title="Properties sold"
        icon={<House size="24" color="#926667" />}
        data={toAmountWithSuffix(stats, false)}
        onClick={toggleModal}
      />

      {isModalOpen && (
        <PageModal handleClose={closeModal} heading="Properties sold">
          <section className="flex flex-col flex-1 w-full gap-4 ">
            <div
              data-ui={isFetchingSummary ? "loading" : ""}
              className="flex w-full rounded-xl text-xs py-[10px] flex-wrap bg-primary-50 p-3 text-white data-loading:animate-pulse"
            >
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Property Sold</p>
                <p className="text-grey-600">
                  {toAmount(summary?.totalUnits || 0, false)}
                </p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Paid</p>
                <p className="text-grey-600">
                  {toAmount(summary?.totalSoldUnits || 0)}
                </p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Outstanding</p>
                <p className="text-grey-600">
                  {toAmount(summary?.totalReservedUnits || 0)}
                </p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Closed Sales</p>
                <p className="text-grey-600">
                  {toAmount(summary?.closedSales || 0, false)}
                </p>
              </div>
            </div>

            <div className="w-full my-2">
              {isFetchingProperties ? (
                <TableSkeleton />
              ) : (
                <DataTable columns={columns} data={data?.properties || []} />
              )}
            </div>

            <div className="flex w-full mt-auto justify-between gap-4 flex-wrap">
              <div></div>
              <div className="flex  justify-end gap-4 items-center mt-auto">
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
            </div>
          </section>
        </PageModal>
      )}
    </>
  );
};
