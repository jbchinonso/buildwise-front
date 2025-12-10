import { getTitanActivities } from "@/lib/services";
import { ActivityCard } from "../../my-titans/ui/cards/ActivityCard";

const Activities = async () => {
  const activities = await getTitanActivities();

  return (
    <div className="bg-white w-full flex-1 md:flex-[38%] gap-3 flex flex-col">
      <ActivityCard activities={activities || []} />
    </div>
  );
};

export default Activities;
