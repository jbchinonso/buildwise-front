"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  // Legend,
  ResponsiveContainer,
} from "recharts";

interface PieData {
  name: string;
  value: number;
}

interface PieChartCardProps {
  title?: string;
  data: PieData[];
  colors?: string[];
  width?: number | string;
  height?: number | string;
}

const defaultColors = ["#4CAF50", "#6B1E1E"];

export const PieChartCard: React.FC<PieChartCardProps> = ({
  data,
  colors = defaultColors,
  height = 300,
}) => {
  const total = data.reduce((acc, item) => acc + item.value, 0);
  const isDataEmpty = total === 0;

  const formatLabel = (value: number) =>
    `${Math.round((value / total) * 100)} %`;

  return (
    <>
     <div className="w-full" style={{ height: height }}>
  {isDataEmpty ? (
    <div className="text-center text-gray-500 mt-8">
      No sales data available
    </div>
  ) : (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
              const RADIAN = Math.PI / 180;
              const radius = innerRadius + (outerRadius - innerRadius) / 2;
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);

              return (
                <text
                  x={x}
                  y={y}
                  fill="white"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={12}
                >
                  {`${(percent * 100).toFixed(0)}%`}
                </text>
              );
            }}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-8 mt-4 text-sm">
        {data.map((entry, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{
                  backgroundColor: colors[index % colors.length],
                }}
              ></span>
              <span className="text-gray-700 font-medium">
                {entry.name}
              </span>
            </div>
            <span className="text-xs text-gray-500">
              {entry.value} properties
            </span>
          </div>
        ))}
      </div>
    </>
  )}
</div>

    </>
  );
};
// </div>
// <div className="flex justify-center gap-4 text-sm mt-4">
//   {data.map((entry, index) => (
//     <div key={index} className="flex items-center gap-1">
//       <span
//         className="inline-block w-3 h-3 rounded-full"
//         style={{ backgroundColor: colors[index % colors.length] }}
//       ></span>
//       {entry.name} — {entry.value} properties
//     </div>
//   ))}
// </div>
