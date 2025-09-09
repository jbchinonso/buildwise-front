"use client";

import { IDashboardStatsCardProps } from "@/lib/type";
import { cn } from "@/lib/utils";
import React from "react";

export const DashboardStatsCard = ({
  title,
  icon,
  data,
  theme,
  onClick,
  className,
  children,
  isLoading,
  value,
}: IDashboardStatsCardProps & {
  className?: string;
  children?: React.ReactNode;
  value?: string;
}) => {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        disabled={isLoading}
        title={value || title + " - " + (data || "")}
        className={cn(
          "bg-white cursor-pointer hover:scale-[1.01] duration-300 transition-all hover:bg-green-50/50 hover:border-primary-500 hover:shadow-sm border-[0.5px] border-grey-50 p-4 flex flex-col flex-[25] max-h-[136px] h-full rounded-2xl relative",
          className,
          isLoading ? "animate-pulse pointer-events-none" : ""
        )}
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
      </button>

      {children}
    </>
  );
};
