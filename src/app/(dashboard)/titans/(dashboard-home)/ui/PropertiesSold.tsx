"use client";

import { Bar, BarChart, Line, LineChart, XAxis, YAxis } from "recharts";

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { month: "January", revenue: 186 },
  { month: "February", revenue: 305 },
  { month: "March", revenue: 237 },
  { month: "April", revenue: 73 },
  { month: "May", revenue: 209 },
  { month: "June", revenue: 214 },
];

const chartConfig = {
  revenue: {
    label: "revenue",
    color: "#1FDBF4",
  },
} satisfies ChartConfig;

export function PropertiesSold() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] min-w-full">
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
          tickFormatter={(value) => value + "m"}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
      </LineChart>
    </ChartContainer>
  );
}
