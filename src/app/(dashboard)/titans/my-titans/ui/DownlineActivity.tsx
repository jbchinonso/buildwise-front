import { ActivityCard } from "./cards/ActivityCard";

export default function DownlineActivity() {
  const activities = [
    {
      type: "Instalment deposit",
      message: "Sandra Ibe confirmed payment for plot 613 Boulevard estate",
      date: "Tue 5 Mar",
      createdAt: "3:15pm",
    },
    {
      type: "Agent onboarded",
      message: "Sodik Nwachukwu added Bukayo Saka to their downline",
      date: "Tue 5 Mar",
      createdAt: "3:15pm",
    },
    {
      type: "Agent onboarded",
      message: "Sodik Nwachukwu added Bukayo Saka to their downline",
      date: "Tue 5 Mar",
      createdAt: "3:15pm",
    },
  ];

  return (
    <div className="rounded-2xl bg-white p-2 w-full flex-1 md:flex-[38%] gap-3 flex flex-col border border-grey-50">
      <h2 className="font-semibold text-gray-900">Downline activities</h2>
      <ActivityCard activities={activities} />
    </div>
  );
}
