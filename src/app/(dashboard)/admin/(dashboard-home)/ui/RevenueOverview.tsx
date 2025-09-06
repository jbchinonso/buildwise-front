"use client";
import {
  DashboardStatsCard,
  DataTable,
  PageModal,
} from "@/components/dashboard";
import { useClientFetch, useModal } from "@/lib/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown } from "iconsax-react";
import { ChevronRight } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  DataTableColumnHeader,
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  Button,
} from "@/components/ui";
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
    accessorKey: "lastPayment",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last payment" />
    ),
    cell: ({ row }) => <div>{row.getValue("lastPayment")}</div>,
  },
  {
    accessorKey: "salesPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Paid" />
    ),
    cell: ({ row }) => <div>{row.getValue("salesPrice")}</div>,
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

interface IChartData {
  month: string;
  sales: number;
  revenue: number;
}

export const RevenueOverview = ({
  data,
  stats = 0,
}: {
  data: Transaction[];
  stats?: number;
}) => {
  const { isModalOpen, toggleModal, closeModal } = useModal();

  const {
    data: revenueData,
    isLoading: isRevenueLoading,
    error: revenueError,
  } = useClientFetch({
    action: async () => {
      const res = await dashboardService.getRevenueData();
      console.log({ res });
      return res || [];
    },
    isModalOpen,
  });

  return (
    <>
      <DashboardStatsCard
        title="Total revenue"
        icon={<ArrowDown size="24" color="#70F41F" />}
        data={toAmountWithPrefix(stats)}
        value={"Total revenue - " + toAmount(stats)}
        theme=""
        onClick={toggleModal}
      />

      {isModalOpen && (
        <PageModal
          handleClose={closeModal}
          heading="Revenue Overview"
          className={isRevenueLoading ? "animate-pulse" : ""}
        >
          <section className="flex flex-col w-full gap-4 ">
            {isRevenueLoading ? (
              <span className="loader m-auto my-10" />
            ) : (
              <RevenueChart
                chartData={revenueData?.monthlyRevenue || []}
                total={revenueData?.totalRevenue || 0}
              />
            )}
            <div className="flex w-full rounded-xl text-xs py-[10px] flex-wrap bg-primary-50 p-3 text-white">
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Total revenue</p>
                <p className="text-grey-600">
                  {toAmount(revenueData?.totalRevenue || 0)}
                </p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Property sold</p>
                <p className="text-grey-600">
                  {toAmount(revenueData?.propertySold || 0, false)}
                </p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Avg Revenue per sale</p>
                <p className="text-grey-600">
                  {toAmount(revenueData?.avgRevenuePerSale || 0)}
                </p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Pending payment</p>
                <p className="text-grey-600">
                  {toAmount(revenueData?.pendingPayment || 0)}
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
                data={revenueData?.recentSales || []}
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

const chartConfig = {
  revenue: {
    label: "revenue",
    color: "#926667",
  },
} satisfies ChartConfig;

const RevenueChart = ({
  chartData,
  total,
}: {
  chartData?: IChartData[];
  total?: string | number;
}) => {
  return (
    <div className="w-full max-h-[762px] flex flex-col">
      <div className="flex items-center justify-between p-4  w-full gap-4">
        <div className="flex flex-col">
          <p className="text-sm font-semibold">Revenue</p>
          <span className="text-xs text-grey-400">
            Total: {toAmount(total || 0)}
          </span>
        </div>

        <div className="p-2 px-3 rounded-3xl bg-grey-50">
          <p className="text-xs">Last 1 year</p>
        </div>
      </div>

      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <Bar
            dataKey="revenue"
            fill="var(--color-revenue)"
            radius={4}
            widths={50}
            width={50}
          />
          <XAxis
            dataKey="month"
            tickMargin={10}
            tickFormatter={(value) => value.slice(0, 3)}
            width={50}
            widths={50}
          />
          <YAxis
            dataKey="revenue"
            tickMargin={0}
            tickFormatter={(value) => toAmountWithPrefix(value || 0)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};
