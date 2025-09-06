"use client";
import {
  DashboardStatsCard,
  DataTable,
  PageModal,
} from "@/components/dashboard";
import { Button, DataTableColumnHeader } from "@/components/ui";
import { useClientFetch, useModal } from "@/lib/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight, House } from "lucide-react";
import { PropertiesSold } from "./PropertiesSold";
import { toAmount, toAmountWithPrefix } from "@/lib/utils";
import { dashboardService } from "@/lib/services/dashboard.service";

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
  {
    accessorKey: "clientName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Client" />
    ),
    cell: ({ row }) => <div>{row.getValue("clientName")}</div>,
  },
  {
    accessorKey: "propertyName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Property" />
    ),
    cell: ({ row }) => <div>{row.getValue("propertyName")}</div>,
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => <div>{row.getValue("location")}</div>,
  },
  {
    accessorKey: "last_payment",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last payment" />
    ),
    cell: ({ row }) => <div>{row.getValue("last_payment")}</div>,
  },
  {
    accessorKey: "paid",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Paid" />
    ),
    cell: ({ row }) => <div>{row.getValue("paid")}</div>,
  },
  {
    accessorKey: "outstanding",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Outstanding" />
    ),
    cell: ({ row }) => <div>{row.getValue("outstanding")}</div>,
  },
  {
    accessorKey: "instalment",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Instalment" />
    ),
    cell: ({ row }) => <div>{row.getValue("instalment")}</div>,
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

export const SalesOverview = ({
  data,
  stats = 0,
}: {
  data: Transaction[];
  stats?: number;
}) => {
  const { isModalOpen, toggleModal, closeModal } = useModal();

  const {
    data: salesData,
    isLoading: isSalesLoading,
    error: salesError,
  } = useClientFetch({
    action: async () => {
      const res = await dashboardService.getSalesData();
      return res || [];
    },
    isModalOpen,
  });

  return (
    <>
      <DashboardStatsCard
        title="Total sales"
        icon={<House size="24" color="#1FDBF4" />}
        data={toAmountWithPrefix(stats, false)}
        value={"Total sales - " + toAmount(stats, false)}
        onClick={toggleModal}
      />

      {isModalOpen && (
        <PageModal handleClose={closeModal} heading="Total Sales Overview">
          <section className="flex flex-col w-full gap-4 ">
            {isSalesLoading ? (
              <span className="loader m-auto my-10" />
            ) : (
              <PropertiesSold chartData={salesData?.monthlySales || []} />
            )}
            <div className="flex w-full rounded-xl text-xs py-[10px] flex-wrap bg-primary-50 p-3 text-white">
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Property sold</p>
                <p className="text-grey-600">
                  {toAmount(salesData?.propertySold || 0, false)}
                </p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Completed purchase</p>
                <p className="text-grey-600">
                  {toAmount(salesData?.completedPurchase || 0, false)}
                </p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Ongoing instalment</p>
                <p className="text-grey-600">
                  {toAmount(salesData?.ongoingInstalment || 0)}
                </p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Total revenue</p>
                <p className="text-grey-600">
                  {toAmount(salesData?.totalRevenue || 0)}
                </p>
              </div>
            </div>

            <div className="flex items-baseline justify-between w-full gap-4">
              <h2 className="font-semibold text-grey-600">Recent Sales</h2>

              {/* <Link
                href="/"
                className="flex items-center gap-1 text-xs font-medium text-primary-400 flex-nowrap whitespace-nowrap"
              >
                View all <ArrowRight size={14} color="currentColor" />
              </Link> */}
            </div>

            <div className="w-full my-2">
              <DataTable
                columns={columns}
                data={salesData?.recentSales || []}
              />
            </div>

            <div className="flex justify-end gap-4 items-center">
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
