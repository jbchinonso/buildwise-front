"use client";

import { cn } from "@/lib/utils";

export const DashboardStatsCard = ({
  title,
  icon,
  data,
  theme,
  onClick,
  className
}: IDashboardStatsCardProps & {className?: string}) => {
  return (
    <div
      tabIndex={0}
      onClick={onClick}
      className={cn("bg-white cursor-pointer hover:scale-[1.01] duration-300 transition-all hover:bg-green-50/50 hover:border-primary-500 hover:shadow-sm border-[0.5px] border-grey-50 p-4 flex flex-col flex-[25] max-h-[136px] h-full rounded-2xl", className)}
    >
      <div className="flex items-center gap-2">
        <span>{icon}</span>
        <span className="font-medium text-capitalize whitespace-nowrap text-grey-400">
          {title}
        </span>
      </div>

      <h2 className="flex py-8 mx-auto my-auto text-2xl font-medium text-grey-600">
        {data}
      </h2>
    </div>
  );
};
