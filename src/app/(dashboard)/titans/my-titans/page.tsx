import { getTitanSummary, getTransactions } from "@/lib/services";
import { MyTitan } from "./ui/cards/MyTitan";
import { TitanCommission } from "./ui/cards/TitanCommission";
import { SubTitanCommission } from "./ui/cards/SubTitansCommission";
import DownlineActivity from "./ui/DownlineActivity";
import { TopPerformingTitans } from "./ui/top-performing-titans";

const MyTitans = async () => {
  const data = await getTitanSummary();

  return (
    <>
      <section className="w-full justify-between flex flex-wrap gap-4">
        <MyTitan stats={data?.totalTitans || 0} />
        <TitanCommission stats={data?.titanCommission || 0} />
        <SubTitanCommission stats={data?.subTitanCommission || 0} />
      </section>

      <section className="flex flex-wrap gap-4 flex-1 max-h-[601px] w-full">
        <DownlineActivity />
        <TopPerformingTitans />
      </section>
    </>
  );
};
export default MyTitans;
