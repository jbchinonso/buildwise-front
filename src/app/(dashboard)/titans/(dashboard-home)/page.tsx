import {
  PropertiesSold,
  RecentTransactions,
  RevenueChart
} from "./ui";
import { getTitanDashboardSummary} from "@/lib/services/dashboard.service";

const Dashboard = async () => {
  const data = await getTitanDashboardSummary();

  return (
    <>
      {/* chart */}
      <section className="flex flex-wrap gap-4">
        <div className="rounded-2xl min-w-[MIN(100%,518px)] bg-white w-full flex-1 border border-grey-50">
          <div className="flex items-center justify-between p-4  w-full gap-4">
            <div className="flex flex-col">
              <p className="text-sm font-semibold">Revenue</p>
              <span className="text-xs text-grey-400">Total: ₦1,495,00</span>
            </div>

            <div className="p-2 px-3 rounded-3xl bg-grey-50">
              <p className="text-xs">Last 1 year</p>
            </div>
          </div>
          <div className="flex flex-1 w-full my-4 p-1 overflow-x-auto">
            <RevenueChart />
          </div>
        </div>
        <div className="rounded-2xl min-w-[MIN(100%,518px)] bg-white w-full flex-1 border border-grey-50">
          <div className="flex items-center justify-between w-full p-4  gap-4">
            <div className="flex flex-col">
              <p className="text-sm font-semibold">Properties sold</p>
              <span className="text-xs text-grey-400">Total: 115</span>
            </div>
            <div className="p-2 px-3 rounded-3xl bg-grey-50">
              <p className="text-xs">Last 1 year</p>
            </div>
          </div>

          <div className="flex flex-1 w-full my-4 p-1 overflow-x-auto">
            <PropertiesSold />
          </div>
        </div>
      </section>

      {/* recent transactions */}
      <RecentTransactions data={data as any} />
    </>
  );
};

export default Dashboard;
