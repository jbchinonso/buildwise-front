"use client";

import React from "react";
import { ArrowDown, ChevronRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

export interface Activity {
  _id?: string;
  type: string;
  message: string;
  icon?: React.ReactNode;
  title?: string;
  userId?: string;
  createdAt?: string | Date;
}

interface ActivityCardProps {
  title?: string;
  activities: Activity[];
  className?: string;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  activities,
  // className,
}) => {
  return (
    <div className="flex flex-1 flex-col gap-2 min-h-full">
      {activities?.length ? (
        activities.map((activity, index) => (
          <ActivityTile key={activity?._id} activity={activity} />
        ))
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <p className="m-auto text-sm opacity-70">
            No activities at the moment...
          </p>
        </div>
      )}
    </div>
  );
};

const ActivityTile = ({ activity }: { activity: Activity }) => (
  <div className="flex items-start py-2 gap-1 cursor-pointer hover:bg-gray-50 rounded-xl px-2 border-1">
    <div className="w-8 h-8 flex justify-center items-center text-green-600  text-sm">
      <ArrowDown className="size-4" />
    </div>
    <div className="flex flex-col flex-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-base capitalize font-medium text-gray-800">
            {activity?.title ?? activity?.type}
          </p>
          {activity?.createdAt && (
            <p className="text-xs text-gray-400 whitespace-nowrap">
              {formatDate(activity.createdAt)}
            </p>
          )}
        </div>
        <ChevronRight className="size-4 shrink-0" />
      </div>

      <p className="text-sm text-gray-500 font-normal break-normal mt-1">
        {activity.message}
      </p>
    </div>
  </div>
);
