"use client";

import { Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "Jan 2024", titanCommission: 120000, subTitanCommission: 60000 },
  { month: "Apr 2024", titanCommission: 70000, subTitanCommission: 80000 },
  { month: "Jul 2024", titanCommission: 100000, subTitanCommission: 50000 },
  { month: "Oct 2024", titanCommission: 85000, subTitanCommission: 65000 },
  { month: "Jan 2025", titanCommission: 65000, subTitanCommission: 40000 },
  { month: "Apr 2025", titanCommission: 60000, subTitanCommission: 30000 },
];

const chartConfig = {
  titanCommission: {
    label: "Commission from my Titans",
    color: "#1FDBF4", 
  },
  subTitanCommission: {
    label: "Commission from Sub-titans",
    color: "#9B51E0", 
  },
} satisfies ChartConfig;

export function TitanCommissionOverview() {
  return (
    <div className="w-full">
      <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
        <LineChart accessibilityLayer data={chartData}>
          {/* Line for Titans */}
          <Line
            dataKey="titanCommission"
            type="linear"
            stroke="var(--color-titanCommission)"
            strokeWidth={1.5}
            dot={false}
          />

          {/* Line for Sub-titans */}
          <Line
            dataKey="subTitanCommission"
            type="linear"
            stroke="var(--color-subTitanCommission)"
            strokeWidth={1.5}
            dot={false}
          />

          <XAxis dataKey="month" tickMargin={10} />
          <YAxis tickMargin={5} tickFormatter={(value) => `${value / 1000}k`} />
          <ChartTooltip content={<ChartTooltipContent />} />
        </LineChart>
      </ChartContainer>

      {/* Custom Legend (Flexed Between) */}
      <div className="flex justify-between my-5 mx-6 text-sm">
        <div className="flex items-center gap-2 ">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: "#1FDBF4" }}
          ></span>
          <div className="flex flex-col leading-tight">
            <p className="text-gray-600 ">Commission from my Titans</p>
            <p className="text-xs text-gray-500">Total: ₦500,050 (60%)</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: "#9B51E0" }}
          ></span>
          <div className="flex flex-col leading-tight">
            <p className="text-gray-600">Commission from Sub-titans</p>
            <p className="text-xs text-gray-500">
              Yearly Total: ₦300,000 (40%)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
