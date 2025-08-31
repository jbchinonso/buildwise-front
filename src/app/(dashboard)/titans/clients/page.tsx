import { DashboardStatsCard } from "@/components/dashboard";
import { Button, SearchInput } from "@/components/ui";
import { ArrowRight, House2 } from "iconsax-react";
import { Hourglass, House, KeyRound, Plus, Search } from "lucide-react";
import { ClientOverview, ClientsTable } from "./ui/";
import Link from "next/link";
import { PropertiesSold, RevenueOverview, SalesOverview } from "../(dashboard-home)/ui";
import { PropertyOverview } from "../(dashboard-home)/ui/PropertyOverview";

const Properties = () => {
  return (
    <>
      <section className="w-full justify-between flex flex-wrap gap-4">
        <ClientOverview data={[]} />
        {/* <DashboardStatsCard
          title="Propeties sold"
          icon={<House size="24" color="#926667" />}
          data="2"
        /> */}
       <PropertyOverview data={[]}/>
        <RevenueOverview data={[]} />
        <SalesOverview data={[]} />
      </section>

      <section className="flex flex-wrap gap-4 flex-1 max-h-[601px]">
        <div className="w-full my-4">
          <div className="w-full flex items-baseline my-2">
            <div className="flex items-center gap-4">
              <p className="font-bold">Recent transactions</p>
            </div>

            <Link
              href="clients/all"
              className="flex ml-auto items-center gap-1 text-xs font-medium text-primary-400 flex-nowrap whitespace-nowrap"
            >
              View all <ArrowRight size={14} color="currentColor" />
            </Link>
          </div>

          <ClientsTable data={[]} />
        </div>
      </section>
    </>
  );
};

export default Properties;
