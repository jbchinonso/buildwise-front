import { Button, SearchInput } from "@/components/ui";
import { ArrowRight } from "iconsax-react";
import { Plus } from "lucide-react";
import { ClientOverview, ClientsTable } from "./ui/";
import Link from "next/link";
import {
  getAllClients,
  getClientOverview,
  getClientRecentlyReserved,
  getClientStats,
} from "@/lib/services";
import { ClosedSales, ReservedUnits } from "../properties/ui";

type SearchParams = Promise<{ page?: string; limit?: string; search?: string }>;

const Clients = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;

  const [clients, stats, overview, recentlyReserved] = await Promise.all([
    getAllClients(searchParams),
    getClientStats(),
    getClientOverview(),
    getClientRecentlyReserved(),
  ]);

  return (
    <>
      <div className="flex w-full justify-end items-center">
        <Button asLink href="clients/add-client" size="xs">
          <Plus color="currentColor"  size={20}/>
          Add new client
        </Button>
      </div>
      <section className="w-full justify-start flex flex-wrap gap-4">
        <ClientOverview data={overview} clients={stats?.totalClients || 0} />
        <ReservedUnits
          data={recentlyReserved ?? []}
          reservedUnits={stats?.totalReserved || 0}
        />
        <ClosedSales closedSales={stats?.totalClosed || 0} />
      </section>

      <section className="flex flex-wrap gap-4 flex-1 max-h-[601px]">
        <div className="w-full my-4">
          <div className="w-full flex items-baseline my-2">
            <div className="flex items-center gap-4">
              <p className="font-bold">Clients</p>

              <SearchInput />
            </div>

            <Link
              href="clients/all"
              className="flex ml-auto items-center gap-1 text-xs font-medium text-primary-400 flex-nowrap whitespace-nowrap"
            >
              View all <ArrowRight size={14} color="currentColor" />
            </Link>
          </div>

          <ClientsTable data={clients?.data || []} />
        </div>
      </section>
    </>
  );
};

export default Clients;
