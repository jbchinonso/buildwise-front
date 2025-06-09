import React from "react";
import { ClientsTable } from "../ui";
import { BreadCrumbs, Filters, SearchInput } from "@/components/ui";

const AllClients = () => {
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
          <span className="text-grey-400">400</span>
        </p>

        <div className="flex gap-2 items-center">

          <Filters />
          <SearchInput />
        </div>
      </div>
      <ClientsTable data={[]} />
    </section>
  );
};

export default AllClients;
