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
import { Money } from "iconsax-react";
import {
  getTitanEarningsChart,
  getTitanEarningsOverview,
} from "@/lib/services";
import { toAmount, toAmountWithSuffix } from "@/lib/utils";
import { convertToChartData } from "@/lib/dtos/earnings.dto";
import { EarningsOverviewChart } from "@/components/titans/dashboard";

type Earning = {
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

const columns: ColumnDef<Earning>[] = [
  {
    accessorKey: "client",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Client" />
    ),
    cell: ({ row }) => <div>{row.getValue("client")}</div>,
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
    accessorKey: "last_payment",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last payment" />
    ),
    cell: ({ row }) => <div>{row.getValue("last_payment")}</div>,
  },
  {
    accessorKey: "total_paid",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Paid" />
    ),
    cell: ({ row }) => <div>{row.getValue("total_paid")}</div>,
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

export const Earnings = ({ stats = 0 }: { stats?: number }) => {
  const { isModalOpen, toggleModal, closeModal } = useModal();
  const {} = useClientFetch({
    action: getTitanEarningsOverview,
    isModalOpen,
  });

  const { data: chartData, isLoading } = useClientFetch({
    action: async () => {
      const res = await getTitanEarningsChart();
      const data = convertToChartData(res) || [];
      const totalSalesCommission = data?.reduce((acc, cv) => {
        return (acc += cv?.salesCommission || 0);
      }, 0);
      const totalSubTitanCommission = data?.reduce((acc, cv) => {
        return (acc += cv?.subTitanCommission || 0);
      }, 0);
      return { data, totalSalesCommission, totalSubTitanCommission };
    },
    isModalOpen,
  });
  return (
    <>
      <DashboardStatsCard
        title="Earnings"
        icon={<Money size="24" color="#1FDBF4" />}
        data={toAmountWithSuffix(stats || 0)}
        onClick={toggleModal}
      />

      {isModalOpen && (
        <PageModal handleClose={closeModal} heading="My Earnings">
          <section className="flex flex-col w-full gap-4 ">
            <EarningsOverviewChart chartData={chartData?.data || []} />

            <div className="flex w-full rounded-xl text-xs py-[10px] flex-wrap bg-primary-50 p-3 text-white">
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Total earnings</p>
                <p className="text-grey-600">{toAmount(0)}</p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Sales commission</p>
                <p className="text-grey-600">{toAmount(0)}</p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Titans commission</p>
                <p className="text-grey-600">{toAmount(0)}</p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Total paid-in</p>
                <p className="text-grey-600">{toAmount(0)}</p>
              </div>
            </div>

            <div className="flex items-baseline justify-between w-full gap-4">
              <h2 className="font-semibold text-grey-600 mt-6">
                Earnings breakdown
              </h2>
            </div>

            <div className="w-full my-2">
              <DataTable columns={columns} data={ []} />
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
