"use client";

import { Line, LineChart, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { IEarningsChartData } from "@/lib/type";
import { SpinLoadingAnimation } from "@/components/ui/SpinLoadingAnimation";
import { toAmountWithSuffix } from "@/lib/utils";

const chartConfig = {
  salesCommission: {
    label: "Sales Commissions ",
    color: "#1FDBF4",
  },
  subTitanCommission: {
    label: "Commissions from Titans",
    color: "#9747FF",
  },
} satisfies ChartConfig;

export function EarningsOverviewChart({
  chartData,
  isLoading,
}: {
  chartData?: IEarningsChartData[];
  isLoading?: boolean;
}) {
  return (
    <div className="flex flex-col w-full">
      {chartData?.length ? (
        <ChartContainer
          config={chartConfig}
          className="min-h-[200px] w-full max-w-full text-[rgba(151,71,255,1)]"
        >
          <LineChart accessibilityLayer data={chartData}>
            <Line
              dataKey="salesCommission"
              type="linear"
              stroke="var(--color-salesCommission)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="subTitanCommission"
              type="linear"
              stroke="var(--color-subTitanCommission)"
              strokeWidth={2}
              dot={false}
            />
            <XAxis
              dataKey="month"
              tickMargin={10}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              dataKey="amount"
              tickMargin={0}
              tickFormatter={(value) => toAmountWithSuffix(value)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
          </LineChart>
        </ChartContainer>
      ) : (
        <div className="min-h-[200px] text-center w-full max-w-full">
          {isLoading ? (
            <div className="flex gap-4 text-center items-center justify-center relative w-full">
              Fetching data
              <SpinLoadingAnimation className="m-auto" />
            </div>
          ) : (
            "No chart data."
          )}
        </div>
      )}
    </div>
  );
}
