"use client";

import { Line, LineChart, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { toAmountWithPrefix } from "@/lib/utils";

const chartConfig = {
  sales: {
    label: "sales",
    color: "#1FDBF4",
  },
} satisfies ChartConfig;

export function PropertiesSold({
  chartData,
}: {
  chartData?: { month: string; sales: number }[];
}) {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] min-w-full">
      <LineChart accessibilityLayer data={chartData}>
        <Line
          dataKey="sales"
          type="linear"
          stroke="var(--color-sales)"
          strokeWidth={2}
          dot={false}
        />
        <XAxis
          dataKey="month"
          tickMargin={10}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          dataKey="sales"
          tickMargin={0}
          tickFormatter={(value) => toAmountWithPrefix(value || 0, false)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
      </LineChart>
    </ChartContainer>
  );
}
