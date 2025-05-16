import { DashboardStatsCard } from "@/components/dashboard";
import { Button, SearchInput } from "@/components/ui";
import { ArrowRight, House2 } from "iconsax-react";
import { Hourglass, KeyRound, Plus, Search } from "lucide-react";
import { ClientOverview, ClientsTable } from "./ui/";
import Link from "next/link";

const Properties = () => {
  return (
    <>
      <div className="flex w-full justify-end items-center">
        <Button asLink href="clients/add-client">
          <Plus color="currentColor" />
          Add new client
        </Button>
      </div>
      <section className="w-full justify-between flex flex-wrap gap-4">
        <ClientOverview data={[]} />
        {[
          {
            title: "Clients",
            icon: <House2 size="24" color="#70F41F" />,
            data: "86",
            theme: "",
          },
          {
            title: "Reserved properties",
            icon: <Hourglass size="24" color="#926667" />,
            data: "2",
            theme: "",
          },
          {
            title: "Closed sales",
            icon: <KeyRound size="24" color="#9747FF" />,
            data: "2",
            theme: "",
          },
        ].map((props, index) => (
          <DashboardStatsCard key={`${index}-${props?.title}`} {...props} />
        ))}
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

          <ClientsTable data={[]} />
        </div>
      </section>
    </>
  );
};

export default Properties;
