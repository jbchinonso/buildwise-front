import { DashboardStatsCard } from "@/components/dashboards";
import { ArrowDown, ArrowRight, Profile2User } from "iconsax-react";
import { House, Network } from "lucide-react";
import Link from "next/link";

const Dashboard = () => {
  return (
    <>
      {/* Cards */}
      <section className="w-full justify-between flex flex-wrap gap-4">
        {[
          {
            title: "Total revenue",
            icon: <ArrowDown size="24" color="#70F41F" />,
            data: "23.8B",
            theme: "",
          },
          {
            title: "Total sales",
            icon: <House size="24" color="#1FDBF4" />,
            data: "23.8B",
            theme: "",
          },
          {
            title: "Titans",
            icon: <Network size="24" color="#926667" className="rotate-90" />,
            data: "23.8B",
            theme: "",
          },
          {
            title: "Clients",
            icon: <Profile2User size="24" color="#9747FF" />,
            data: "23.8B",
            theme: "",
          },
        ].map((props, index) => (
          <DashboardStatsCard key={`${index}-${props?.title}`} {...props} />
        ))}
      </section>

      {/* chart */}
      <section className="flex flex-wrap gap-4">
        <div className="rounded-2xl min-w-[MIN(100%,518px)] bg-white p-4 w-full flex-1 border border-grey-50">
          <div className="flex w-full items-center justify-between gap-4">
            <div className="flex flex-col">
              <p className="text-sm font-semibold">Revenue</p>
              <span className="text-xs text-grey-400">Total: ₦1,495,00</span>
            </div>

            <div className="rounded-3xl bg-grey-50 p-2 px-3">
              <p className="text-xs">Last 1 year</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl min-w-[MIN(100%,518px)] bg-white p-4 w-full flex-1 border border-grey-50">
          <div className="flex w-full items-center justify-between gap-4">
            <div className="flex flex-col">
              <p className="text-sm font-semibold">Properties sold</p>
              <span className="text-xs text-grey-400">Total: 115</span>
            </div>
            <div className="rounded-3xl bg-grey-50 p-2 px-3">
              <p className="text-xs">Last 1 year</p>
            </div>
          </div>
        </div>
      </section>

      {/* recent transactions */}
      <section className="w-full flex flex-col">
        <div className="flex w-full items-baseline justify-between gap-4">
          <h2 className="font-semibold text-grey-600">Recent Transactions</h2>

          <Link
            href="/"
            className="text-xs text-primary-400 items-center gap-1 font-medium flex flex-nowrap whitespace-nowrap"
          >
            View all <ArrowRight size={14} color="currentColor" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
