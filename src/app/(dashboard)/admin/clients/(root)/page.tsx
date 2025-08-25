import { SearchInput } from "@/components/ui";
import { ArrowRight } from "iconsax-react";
import Link from "next/link";
import { getAllClients } from "@/lib/services";
import { ClientsTable } from "../ui";

type SearchParams = Promise<{ page?: string; limit?: string; search?: string }>;

const Clients = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;

  const clients = await getAllClients(searchParams);

  return (
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
  );
};

export default Clients;
