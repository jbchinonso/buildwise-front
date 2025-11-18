"use client";

import { Line, LineChart, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { IEarningsChartData } from "@/lib/type";

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

export function EarningsChart({
  chartData,
}: {
  chartData?: IEarningsChartData[];
}) {
  return (
    <ChartContainer
      config={chartConfig}
      className="min-h-[200px] min-w-full text-[rgba(151, 71, 255, 1)"
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
          tickFormatter={(value) => value + "m"}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
      </LineChart>
    </ChartContainer>
  );
}
