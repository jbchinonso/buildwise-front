import { getTransactions } from "@/lib/services";
import { MyTitan } from "./ui/cards/MyTitan";
import { TitanCommission } from "./ui/cards/TitanCommission";
import { SubTitanCommission } from "./ui/cards/SubTitansCommission";
import DownlineActivity from "./ui/DownlineActivity";
import { TopPerformingTitans } from "./ui/top-performing-titans";

const MyTitans = async () =>{
const { data = [] } = await getTransactions();
  return (
    <>
      <section className="w-full justify-between flex flex-wrap gap-4">
        {/* <MyTitans/> */}
        {/* <ActiveTitans />
        <InActiveTitans /> */}
        <MyTitan data={data}/>
        <TitanCommission data={data}/>
        <SubTitanCommission data={data}/>
      </section>

      <section className="flex flex-wrap gap-4 flex-1 max-h-[601px]">
        <DownlineActivity/>
        <TopPerformingTitans />
        {/* <CommissionsDue /> */}
      </section>
    </>
  );
}
export default MyTitans;