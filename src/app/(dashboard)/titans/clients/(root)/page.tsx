import Link from "next/link";
import { ArrowRight } from "iconsax-react";
import { ClientsTable } from "../ui";
import { getRecentClients } from "@/lib/services";

const RecentClients = async () => {
  const recentClients = await getRecentClients();

  return (
    <section className="flex flex-wrap gap-4 flex-1 m.ax-h-[601px]">
      <div className="w-full my-4 flex-1">
        <div className="w-full flex items-baseline my-2">
          <div className="flex items-center gap-4">
            <p className="font-bold">Recent added clients</p>
          </div>

          <Link
            href="clients/all"
            className="flex ml-auto items-center gap-1 text-xs font-medium text-primary-400 flex-nowrap whitespace-nowrap"
          >
            View all <ArrowRight size={14} color="currentColor" />
          </Link>
        </div>

        <ClientsTable data={recentClients} />
      </div>
    </section>
  );
};

export default RecentClients;
