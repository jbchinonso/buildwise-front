import { ClientsTable } from "../ui";
import { BreadCrumbs, Filters, SearchInput } from "@/components/ui";
import { getAllTitanClients } from "@/lib/services";

const AllClients = async () => {
  const allClients = await getAllTitanClients();
  
  return (
    <>
      <BreadCrumbs
        paths={[
          { title: "Home", path: "/titans/clients" },
          { title: "All Clients", path: "/titans/clients/all" },
        ]}
      />
      <div className="w-full my-2 flex items-baseline justify-between">
        <p className="font-bold flex gap-2">
          All Clients
          <span className="text-grey-400">400</span>
        </p>

        <div className="flex gap-2 items-center">
          <Filters />
          <SearchInput />
        </div>
      </div>
      <ClientsTable data={allClients || []} />
    </>
  );
};

export default AllClients;
