"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { toAmountWithPrefix } from "@/lib/utils";

interface IChartData {
  month: string;
  revenue: number;
}

const chartConfig = {
  revenue: {
    label: "revenue",
    color: "#926667",
  },
} satisfies ChartConfig;

export function RevenueChart({
  chartData,
}: {
  chartData?: IChartData[];
}) {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
        <XAxis
          dataKey="month"
          tickMargin={10}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          dataKey="revenue"
          tickMargin={0}
          tickFormatter={(value) => toAmountWithPrefix(value||0)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
      </BarChart>
    </ChartContainer>
  );
}
