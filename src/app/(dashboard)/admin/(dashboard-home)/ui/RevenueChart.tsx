"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";

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
    color: "#926667",
  },
} satisfies ChartConfig;

export function RevenueChart() {
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
          tickFormatter={(value) => value + "m"}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
      </BarChart>
    </ChartContainer>
  );
}
