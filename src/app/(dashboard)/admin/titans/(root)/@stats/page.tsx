import {
  getTitanStats,
} from "@/lib/services";
import { ActiveTitans, InActiveTitans, TotalTitans } from "../../ui";

const TitanStats = async () => {
  const stats = await getTitanStats();

  return (
    <>
      <TotalTitans stat={stats.totalTitans} />
      <ActiveTitans stat={stats.activeTitans} />
      <InActiveTitans stat={stats.inactiveTitans} />
    </>
  );
};

export default TitanStats;
