import { getTitanSummary, getTransactions } from "@/lib/services";
import { MyTitan } from "./ui/cards/MyTitan";
import { TitanCommission } from "./ui/cards/TitanCommission";
import { SubTitanCommission } from "./ui/cards/SubTitansCommission";
import DownlineActivity from "./ui/DownlineActivity";
import { TopPerformingTitans } from "./ui/top-performing-titans";
import { Button } from "@/components/ui";
import { Plus } from "lucide-react";

const MyTitans = async () => {
  const data = await getTitanSummary();

  return (
    <>
      <div className="flex w-full justify-between flex-wrap items-center">
        <Button
          size="xs"
          asLink
          href="#"
          className="!text-xs ml-auto"
        >
          <Plus color="currentColor" size={20} />
          Invite Titan
        </Button>
      </div>
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
