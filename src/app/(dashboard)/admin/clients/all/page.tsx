import { ClientsTable } from "../ui";
import { BreadCrumbs, Filters, SearchInput } from "@/components/ui";
import { getAllClients } from "@/lib/services/client.service";


type SearchParams = Promise<{ page?: string; limit?: string; search?: string }>;


const AllClients = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;

  const { data = [], pagination = {} } = await getAllClients(searchParams);

  return (
    <section className="flex flex-1 flex-col gap-4">
      <BreadCrumbs
        paths={[
          { title: "Home", path: "/admin/clients" },
          { title: "All Clients", path: "/admin/clients/all" },
        ]}
      />

      <div className="w-full my-2 flex items-baseline justify-between">
        <p className="font-bold flex gap-2">
          All Clients
          <span className="text-grey-400">{pagination?.total ?? 0}</span>
        </p>

        <div className="flex gap-2 items-center">
          <Filters />
          <SearchInput />
        </div>
      </div>
      <ClientsTable data={data} />
    </section>
  );
};

export default AllClients;
