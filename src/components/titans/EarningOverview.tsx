"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
    ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "Jan", sales: 20000, titans: 39900 },
  { month: "Feb", sales: 40000, titans: 49500 },
  { month: "Mar", sales: 60000, titans: 52000 },
  { month: "Apr", sales: 80000, titans: 46000 },
  {month: "May", sales: 100000, titans: 46000 },
  {month: "Jun", sales: 120000, titans: 46000 },
  {month: "Jul", sales: 140000, titans: 46000 },
  {month: "Aug", sales: 160000, titans: 46000 },
  {month: "Sep", sales: 180000, titans: 46000 },
  {month: "Oct", sales: 200000, titans: 46000 },
  {month: "Nov", sales: 220000, titans: 46000 },
  {month: "Dec", sales: 240000, titans: 46000 }

];

const chartConfig = {
  sales: {
    label: "Sales Commissions",
    color: "#1FDBF4", // cyan
  },
  titans: {
    label: "Commissions from Titans",
    color: "#9B5BF5", // purple
  },
} satisfies ChartConfig;

export default function EarningsOverview() {
  return (
    <ChartContainer config={chartConfig} className="w-full h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <XAxis dataKey="month" />
        <YAxis tickFormatter={(value) => `₦${(value / 1000).toFixed(0)}k`} />
        <Tooltip content={<ChartTooltipContent />} />
        <Line
          type="monotone"
          dataKey="sales"
          stroke="var(--color-sales)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="titans"
          stroke="var(--color-titans)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
