import { DashboardStatsCard } from "@/components/dashboard";
import { Button, SearchInput } from "@/components/ui";
import { ArrowRight, House2 } from "iconsax-react";
import { Hourglass, KeyRound, Plus } from "lucide-react";
import { ClientOverview, ClientsTable } from "./ui/";
import Link from "next/link";
import { getAllClients, getClientSummary } from "@/lib/services/client.service";
import { clientTableDTO } from "@/lib/dtos/client.dto";
import { ClosedSales, ReservedUnits } from "../properties/ui";

const Clients = async () => {
  const { data } = await getAllClients({});
  const [summary] = await Promise.all([getClientSummary()]);

  return (
    <>
      <div className="flex w-full justify-end items-center">
        <Button asLink href="clients/add-client">
          <Plus color="currentColor" />
          Add new client
        </Button>
      </div>
      <section className="w-full justify-between flex flex-wrap gap-4">
        <ClientOverview data={[]} clients={summary?.totalClients || 0} />
        <ReservedUnits reservedUnits={summary?.totalReservedProperties || 0} />
        <ClosedSales closedSales={summary?.totalCompletedSales || 0} />
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

          <ClientsTable data={clientTableDTO(data)} />
        </div>
      </section>
    </>
  );
};

export default Clients;
