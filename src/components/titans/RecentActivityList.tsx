
import React from "react";
import { Activity } from "../../lib/types/global/activity";
import RecentActivityItem from "./RecentActivityItem";

interface ActivityListProps {
  activities: Activity[];
  title?: string;
}

const RecentActivityList: React.FC<ActivityListProps> = ({ 
  activities, 
  title = "Recent activities" 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="mb-4 ">
        <h2 className="text-lg font-medium text-gray-900">{title}</h2>
      </div>
      <div className="space-y-1 ">
        {activities.map((activity) => (
          <RecentActivityItem key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
};

export default RecentActivityList;