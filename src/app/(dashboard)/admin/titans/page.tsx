import { getTransactions } from "@/lib/services";
import { ArrowRight } from "iconsax-react";
import Link from "next/link";
import { TotalTitans, ActiveTitans, InActiveTitans } from "./cards/";
import { TopPerformingAgents } from "./top-performing-agents";
import CommissionsDue from "./commissions-due";

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
