"use client";

import React from "react";
import { ArrowDown, ChevronRight } from "lucide-react";

export interface Activity {
  type: string;
  message: string;
  date: string;
  time: string;
  icon?: React.ReactNode;
}

interface ActivityCardProps {
  title?: string;
  activities: Activity[];
  className?: string;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  title = "Downline activities",
  activities,
  className,
}) => {
  return (
    <>
      <h2 className="font-semibold text-gray-900">{title}</h2>

      <div className="flex flex-col gap-2">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-start py-2 gap-1 cursor-pointer hover:bg-gray-50 rounded-xl px-2 border-1"
          >
            
            <div className="w-8 h-8 flex justify-center items-center text-green-600  text-sm">
              <ArrowDown className="size-4" />
            </div>

            <div className="flex flex-col flex-1">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <p className="text-[16px] font-medium text-gray-800">
                    {activity.type}
                  </p>
                  <p className="text-xs text-gray-400 whitespace-nowrap">
                    {activity.date}, {activity.time}
                  </p>
                </div>
                <ChevronRight className="size-4 shrink-0" />
              </div>

              <p className="text-[14px] text-gray-500 font-normal break-normal mt-1 max-w-xs">
                {activity.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
