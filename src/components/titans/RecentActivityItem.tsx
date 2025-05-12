
import React from "react";
import { Activity } from "../types/activity";
import { ArrowDown, ArrowRight, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityItemProps {
  activity: Activity;
}

const RecentActivityItem: React.FC<ActivityItemProps> = ({ activity }) => {
  const getIcon = () => {
    switch (activity.type) {
      case "payment":
        return (
          <div className="w-8 h-8 rounded-full  flex items-center justify-center">
            <ArrowDown className="w-4 h-4 text-blue-400" />
          </div>
        );
      case "onboarding":
        return (
          <div className="w-8 h-8 rounded-full  flex items-center justify-center">
            <User className="w-4 h-4 text-blue-400" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="py-4 px-4 my-2 rounded-2xl bg-white hover:bg-gray-50 cursor-pointer transition-colors duration-150 border-2 border-gray-100">
      <div className="flex items-center">
        <div className="flex-shrink-0 mr-3">{getIcon()}</div>
        <div className="flex-grow">
          <div className="flex items-center">
            <h3 className="text-sm font-medium text-gray-900 mr-2">{activity.title}</h3>
            <span className="text-xs text-gray-500">{`${activity.date}, ${activity.time}`}</span>
          </div>
          <p className="text-sm text-gray-500">{activity.description}</p>
        </div>
        <div className="flex-shrink-0 ml-4">
          <ArrowRight className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default RecentActivityItem;