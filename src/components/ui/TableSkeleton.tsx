import React from "react";
import { Skeleton } from "./Skeleton";
import { SpinLoadingAnimation } from "./SpinLoadingAnimation";

export const TableSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-2 relative">
      <Skeleton className="h-8" />
      <Skeleton className="h-8" />
      <Skeleton className="h-8" />
      <Skeleton className="h-8" />
      {/* <SpinLoadingAnimation className="absolute left-1/2 top-1/2 -translate-1/2"/> */}
    </div>
  );
};


