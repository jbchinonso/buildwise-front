"use client";

import { Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useClientFetch } from "@/lib/hooks";
import { EmptyChartData } from "@/components/ui";
import { getTitansCommissionChart } from "@/lib/services";
import { toAmount } from "@/lib/utils";

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
  const { data: chart, isLoading: isChartLoading } = useClientFetch({
    action: async () => {
      const res = await getTitansCommissionChart();

      return res as any[];
    },
  });

  return (
    <div
      className="w-full data-loading:animate-pulse"
      data-ui={isChartLoading ? "loading" : ""}
    >
      {chart?.length && !isChartLoading ? (
        <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
          <LineChart accessibilityLayer data={[]}>
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
            <YAxis
              tickMargin={5}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
          </LineChart>
        </ChartContainer>
      ) : (
        <div className="flex min-h-[250px] w-full">
          <EmptyChartData />
        </div>
      )}

      {/* Custom Legend (Flexed Between) */}
      <div className="flex justify-between my-5 mx-6 text-sm">
        <div className="flex items-center gap-2 ">
          <span
            className="size-3 rounded-full"
            style={{ backgroundColor: "#1FDBF4" }}
          />
          <div className="flex flex-col leading-tight">
            <p className="text-gray-600 ">Commission from my Titans</p>
            <p className="text-xs text-gray-500">Total: {toAmount(0)} (0%)</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className="size-3 rounded-full"
            style={{ backgroundColor: "#9B51E0" }}
          ></span>
          <div className="flex flex-col leading-tight">
            <p className="text-gray-600">Commission from Sub-titans</p>
            <p className="text-xs text-gray-500">
              Yearly Total: {toAmount(0)} (0%)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
