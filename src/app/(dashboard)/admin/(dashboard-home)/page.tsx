import { ArrowRight } from "iconsax-react";
import Link from "next/link";
import { RevenueOverview } from "./RevenueOverview";
import { TitansOverview } from "./TitansOverview";
import { ClientOverview } from "./ClientsOverview";
import { SalesOverview } from "./SalesOverview";
import { getTransactions } from "@/lib/services";
import { RecentTransactions } from "./RecentTransactions";

const Dashboard = async () => {
  const data = await getTransactions();
  return (
    <>
      {/* Cards */}
      <section className="flex flex-wrap justify-between w-full gap-4 py-2">
        <RevenueOverview />
        <SalesOverview />
        <TitansOverview />
        <ClientOverview />
      </section>

      {/* chart */}
      <section className="flex flex-wrap gap-4">
        <div className="rounded-2xl min-w-[MIN(100%,518px)] bg-white p-4 w-full flex-1 border border-grey-50">
          <div className="flex items-center justify-between w-full gap-4">
            <div className="flex flex-col">
              <p className="text-sm font-semibold">Revenue</p>
              <span className="text-xs text-grey-400">Total: ₦1,495,00</span>
            </div>

            <div className="p-2 px-3 rounded-3xl bg-grey-50">
              <p className="text-xs">Last 1 year</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl min-w-[MIN(100%,518px)] bg-white p-4 w-full flex-1 border border-grey-50">
          <div className="flex items-center justify-between w-full gap-4">
            <div className="flex flex-col">
              <p className="text-sm font-semibold">Properties sold</p>
              <span className="text-xs text-grey-400">Total: 115</span>
            </div>
            <div className="p-2 px-3 rounded-3xl bg-grey-50">
              <p className="text-xs">Last 1 year</p>
            </div>
          </div>
        </div>
      </section>

      {/* recent transactions */}
      <section className="flex flex-col w-full">
        <div className="flex items-baseline justify-between w-full gap-4">
          <h2 className="font-semibold text-grey-600">Recent Transactions</h2>

          <Link
            href="/"
            className="flex items-center gap-1 text-xs font-medium text-primary-400 flex-nowrap whitespace-nowrap"
          >
            View all <ArrowRight size={14} color="currentColor" />
          </Link>
        </div>

        <RecentTransactions data={data as any}/>
      </section>
    </>
  );
};

export default Dashboard;
