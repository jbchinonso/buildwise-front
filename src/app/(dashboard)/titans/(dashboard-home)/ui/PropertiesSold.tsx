"use client";

import { Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { toAmountWithSuffix } from "@/lib/utils";

const chartConfig = {
  revenue: {
    label: "revenue",
    color: "#1FDBF4",
  },
} satisfies ChartConfig;

export function PropertiesSold({
  chartData,
  isLoading,
}: {
  isLoading?: boolean;
  chartData: {
    month: string;
    revenue: number;
  }[];
}) {
  return (
    <ChartContainer
      data-ui={isLoading ? "loading" : ""}
      config={chartConfig}
      className="min-h-[200px] min-w-full data-loading:animate-pulse"
    >
      <LineChart accessibilityLayer data={chartData}>
        <Line
          dataKey="revenue"
          type="linear"
          stroke="var(--color-revenue)"
          strokeWidth={2}
          dot={false}
        />
        <XAxis
          dataKey="month"
          tickMargin={10}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          dataKey="revenue"
          tickMargin={0}
          tickFormatter={(value) => toAmountWithSuffix(value||0)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
      </LineChart>
    </ChartContainer>
  );
}
