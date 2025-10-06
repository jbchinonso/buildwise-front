import { cn } from "@/lib/utils";
import React from "react";

export const EmptyChartData = ({
  message = "No data available!",
  className = "",
}: {
  message?: string;
  className?: string;
}) => {
  return <p className={cn("m-auto p-4", className)}>{message}</p>;
};
