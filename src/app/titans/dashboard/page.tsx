"use client";

import RecentActivityList from "@/components/titans/RecentActivityList";
import Clients from "./Clients";
import Earnings from "./Earnings";
import ReferredAgents from "./ReferredAgents";
import TotalRevenue from "./TotalRevenue";
import EarningsOverview from "@/components/titans/EarningOverview";
import { mockActivities } from "../../../components/data/mockActivities";

const Dashboard = async () => {
  return (
    <>
      <section className=" flex flex-col gap-2 w-full">
        <section className="flex flex-wrap justify-between w-full gap-4 py-2">
          <TotalRevenue />
          <Clients />
          <Earnings />
          <ReferredAgents />
        </section>
        {/* chart */}
        <section className="flex flex-wrap gap-4">
          <div className="rounded-2xl min-w-[min(100%,518px)] bg-white w-full flex-1 border border-grey-50 p-4 h-72">
            {/* Header */}
            <div className="flex items-center justify-between w-full mb-3">
              <p className="text-base font-semibold text-black">
                Earning overview
              </p>
              <div className="p-1.5 px-3 rounded-3xl bg-grey-50 text-sm text-black">
                2024 ▼
              </div>
            </div>

            {/* Body: Legend + Chart */}
            <div className="flex w-full flex-col md:flex-row gap-4">
              {/* Legend (left side) */}
              <div className="flex flex-col text-sm text-black gap-3 min-w-[180px]">
                  <div className="mt-16">
                <div className="flex items-center gap-2 mt-16">
                  <div className="w-3 h-3 rounded-full bg-[#1FDBF4]"></div>
                    <p className="font-medium">Sales Commissions</p>
                    <p className="text-xs text-grey-400">
                      Yearly Total: ₦1,495,000
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#9B5BF5]"></div>
                  <div>
                    <p className="font-medium">Commissions from Titans</p>
                    <p className="text-xs text-grey-400">
                      Yearly Total: ₦495,000
                    </p>
                  </div>
                </div>
              </div>

              {/* Chart (right side) */}
              <div className="flex-1 overflow-hidden h-full">
                <div className="w-full h-full">
                  <EarningsOverview />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Recent Activities */}
        <section>
        <RecentActivityList activities={mockActivities} />
        </section>
      </section>
    </>
  );
};
export default Dashboard;
