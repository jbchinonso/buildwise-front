"use client";

import { LabelList, Pie, PieChart as PieChartComponent } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface PieChartProps {
  chartData: any[];
  chartConfig: ChartConfig;
}

// Custom label renderer to ensure labels are visible
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  value,
}: any) => {
  const RADIAN = Math.PI / 180;
  // Position the label further out from the pie
  const radius = outerRadius * 1.1;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="hsl(var(--primary))"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize="12"
    >
      {value}
    </text>
  );
};

export function PieChart({ chartConfig, chartData }: PieChartProps) {
  return (
    <div className="w-full ">
      <ChartContainer
        config={chartConfig}
        // className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
        className="mx-auto border p-4 bg-zinc-100 rounded-full text-black aspect-square max-h-[250px] [&_.recharts-text]:fill-black [&_.recharts-pie-label-text]:fill-black [&_.recharts-pie-label-line]:fill-black"
      >
        <PieChartComponent>
          <ChartTooltip
            content={<ChartTooltipContent nameKey="label" hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="data"
            // label
          >
            {/* <Pie
            data={chartData}
            dataKey="data"
            color="#000"
            fill={"#000"}
            // labelLine
            // cx="50%"
            // cy="50%"
            // labelLine={false}
            // label
            // label={renderCustomizedLabel}
            // label
            // nameKey="label"
            className="[&_.recharts-pie-label-line]:fill-accent"
          > */}
            <LabelList
              dataKey="data"
              className="fill-label text-black"
              stroke="none"
              fontSize={12}
              formatter={(value: keyof typeof chartConfig) =>
                chartConfig[value]?.label
              }
            />
          </Pie>
        </PieChartComponent>
      </ChartContainer>
    </div>
  );
}


