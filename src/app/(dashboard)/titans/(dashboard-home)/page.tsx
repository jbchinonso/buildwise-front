import { getTransactions } from "@/lib/services";
import {
  ClientOverview,
  EarningsOverview,
  PropertiesSold,
  RecentTransactions,
  RevenueChart,
  RevenueOverview,
  SalesOverview,
  TitansOverview,
} from "./ui";

const Dashboard = async () => {
  const { data = [] } = await getTransactions();

  return (
    <>
      {/* Cards */}
      <section className="flex flex-wrap justify-between w-full gap-4 py-2">
        <RevenueOverview data={data as any} />
        <ClientOverview data={data as any} />
        <EarningsOverview data={data as any} />
        <TitansOverview data={data as any} />
      </section>

      {/* chart */}
      <section className="flex flex-wrap gap-4">
       
      </section>

      {/* recent transactions */}
      <RecentTransactions data={data as any} />
    </>
  );
};

export default Dashboard;
