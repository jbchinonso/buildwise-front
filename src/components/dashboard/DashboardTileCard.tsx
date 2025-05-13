import { ChevronRight } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";

export const DashboardTileCard = ({
  className,
  data,
  dataClassName,
  dataContainerClassName,
  label,
  labelClassName,
  onClick,
}: IDashboardTileCardProps & { onClick?: () => void }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
      }}
      className={twMerge(
        "w-full flex overflow-hidden cursor-pointer border justify-between items-center bg-white rounded-2xl hover:border-grey-600",
        className
      )}
    >
      <div className="flex flex-col w-full gap-2 py-1">
        <span
          className={twMerge(
            `flex capitalize px-4 leading-[100%] items-center text-xs font-medium text-grey-500 labelStyle`,
            labelClassName
          )}
        >
          {label}
        </span>

        <div
          className={twMerge(
            "relative rounded text-base flex-1 w-full justify-start flex items-center",
            dataContainerClassName
          )}
        >
          <p className={twMerge("px-4 text-start", dataClassName)}>{data}</p>
        </div>
      </div>
      <ChevronRight className="mx-2" />
    </button>
  );
};
