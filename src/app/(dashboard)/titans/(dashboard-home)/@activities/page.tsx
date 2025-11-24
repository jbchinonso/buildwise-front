import { ActivityCard } from "../../my-titans/ui/cards/ActivityCard";

const Activities = async () => {
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
    <div className="bg-white w-full flex-1 md:flex-[38%] gap-3 flex flex-col">
      <ActivityCard activities={activities} />
    </div>
  );
};

export default Activities;
