
import { ArrowDown } from "iconsax-react";
import { ActivityCard } from "./cards/ActivityCard";

export default function DownlineActivity() {
  const activities = [
    {
      type: "Instalment deposit",
      message: "Sandra Ibe confirmed payment for plot 613 Boulevard estate",
      date: "Tue 5 Mar",
      time: "3:15pm",

    },
    {
      type: "Agent onboarded",
      message: "Sodik Nwachukwu added Bukayo Saka to their downline",
      date: "Tue 5 Mar",
      time: "3:15pm",
    },
    {
      type: "Agent onboarded",
      message: "Sodik Nwachukwu added Bukayo Saka to their downline",
      date: "Tue 5 Mar",
      time: "3:15pm",
    },
  ];

  return (
    <div className="rounded-2xl bg-white p-2 w-full sm:w-[38%] gap-3 flex flex-col border border-grey-50">
      <ActivityCard activities={activities} />
      </div>
    
  );
}
