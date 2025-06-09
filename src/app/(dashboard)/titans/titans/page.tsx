import { getTransactions } from "@/lib/services";
import {
  TotalTitans,
  ActiveTitans,
  InActiveTitans,
  TopPerformingAgents,
  CommissionsDue,
} from "./ui";

const Titan = async () => {
  const { data = [] } = await getTransactions();
  return (
    <>
      <section className="w-full justify-between flex flex-wrap gap-4">
        <TotalTitans data={data} />
        <ActiveTitans />
        <InActiveTitans />
      </section>

      <section className="flex flex-wrap gap-4 flex-1 max-h-[601px]">
        <TopPerformingAgents />
        <CommissionsDue />
      </section>
    </>
  );
};

export default Titan;
