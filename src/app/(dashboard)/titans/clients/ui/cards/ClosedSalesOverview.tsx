"use client";
import {
  DashboardStatsCard,
  DataTable,
  PageModal,
  PieChartCard,
} from "@/components/dashboard";
import {
  Button,
  DataTableColumnHeader,
  Skeleton,
  TableSkeleton,
} from "@/components/ui";
import { useClientFetch, useModal } from "@/lib/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { Key } from "lucide-react";
import { toAmount, toAmountWithSuffix } from "@/lib/utils";
import {
  getTitanClosedSales,
  getTitanClosedSalesChart,
  getTitanClosedSalesSummary,
} from "@/lib/services";
import { ITitanClosedSales, ITitanClosedSalesPiechart } from "@/lib/type";

const columns: ColumnDef<ITitanClosedSales>[] = [
  {
    accessorKey: "clientName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Client" />
    ),
    cell: ({ row }) => <div>{row.getValue("clientName")}</div>,
  },
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
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sales Price" />
    ),
    cell: ({ row }) => <div>{row.getValue("price")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sales Price" />
    ),
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const id = String(row.getValue("_id")) || String(row?.id);

  //     return (
  //       <div className="flex justify-center">
  //         <Link href={`/titan/properties/all/${id}`} id="button">
  //           <ChevronRight className="size-4" />
  //           <span className="sr-only">View details</span>
  //         </Link>
  //       </div>
  //     );
  //   },
  // },
];

const generateChartData = (data: ITitanClosedSalesPiechart | null) => {
  return [
    { name: "Closed sales", value: data?.percentage?.closed || 0 },
    { name: "Ongoing sales", value: data?.percentage?.ongoing || 0 },
  ];
};

export const SalesOverview = ({ stats = 0 }: { stats?: string | number }) => {
  const { isModalOpen, toggleModal, closeModal } = useModal();

  const {
    data,
    isLoading,
    // error: isClientsError,
  } = useClientFetch({
    action: getTitanClosedSales,
    isModalOpen,
  });

  const { data: pieChart, isLoading: isChartLoading } = useClientFetch({
    action: getTitanClosedSalesChart,
    isModalOpen,
  });

  const { data: summary, isLoading: isSummaryLoading } = useClientFetch({
    action: getTitanClosedSalesSummary,
    isModalOpen,
  });

  const chartData = generateChartData(pieChart);

  return (
    <>
      <DashboardStatsCard
        title="Closed sales"
        icon={<Key size="24" color="rgba(151, 71, 255, 1)" />}
        data={toAmountWithSuffix(stats, false)}
        onClick={toggleModal}
      />

      {isModalOpen && (
        <PageModal
          handleClose={closeModal}
          heading="Closed Sales"
          className="md:max-w-[MIN(95%,728px)]"
        >
          <section className="flex flex-col flex-1 w-full gap-4">
            {isChartLoading ? (
              <span className="aspect-square m-auto animate-pulse size-40 rounded-full bg-zinc-200" />
            ) : (
              <PieChartCard data={chartData} colors={["#4FAB15", "#6E3334"]} />
            )}

            {isSummaryLoading ? (
              <Skeleton className="h-8" />
            ) : (
              <div className="flex w-full rounded-xl text-xs py-[10px] flex-wrap bg-primary-50 p-3 text-white">
                <div className="flex flex-col flex-[25] gap-2">
                  <p className="text-grey-400">Properties sold</p>
                  <p className="text-grey-600">
                    {toAmount(summary?.totalProperties || 0, false)}
                  </p>
                </div>
                <div className="flex flex-col flex-[25] gap-2">
                  <p className="text-grey-400">Completed purchase</p>
                  <p className="text-grey-600">
                    {toAmount(summary?.completedPurchases || 0, false)}
                  </p>
                </div>
                <div className="flex flex-col flex-[25] gap-2">
                  <p className="text-grey-400">Closed sales revenue</p>
                  <p className="text-grey-600">
                    {toAmount(summary?.closedRevenue || 0)}
                  </p>
                </div>
              </div>
            )}

            <div className="w-full ">
              <h2 className="font-semibold my-2 text-grey-600">Closed Sales</h2>
              {isLoading ? (
                <TableSkeleton />
              ) : (
                <DataTable columns={columns} data={data?.data || []} />
              )}
            </div>

            <div className="flex justify-end mt-auto gap-4 items-center">
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
