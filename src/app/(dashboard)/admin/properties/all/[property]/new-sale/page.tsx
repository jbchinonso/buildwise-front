import { BreadCrumbs } from "@/components/ui";
import { getAllClients, getProperty } from "@/lib/services";
import React from "react";
import { NewSaleForm } from "./NewSaleForm";
import { clientSelectDTO } from "@/lib/dtos";

type Params = Promise<{ property: string }>;
type SearchParams = Promise<{ page?: string; limit?: string, search?: string }>;

const NewSale = async (props: {
  params: Params;
  searchParams: SearchParams;
}) => {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const id = params.property;
  const page = searchParams.page || 1;
  const limit = searchParams.page || 10;
  const search = searchParams.search || '';

  const property = await getProperty(id);
  const [clients] = await Promise.all([getAllClients({page, limit, search})]);
  const clientOptions = clientSelectDTO(clients?.data);

  return (
    <section className="flex flex-1 flex-col gap-4">
      <BreadCrumbs
        paths={[
          { title: "Home", path: "/admin/properties" },
          { title: "All Properties", path: "/admin/properties/all" },
          {
            title: property?.name || "Property",
            path: `/admin/properties/all/${id}`,
          },
          {
            title: "New sales",
          },
        ]}
      />
      <div className="flex flex-wrap justify-between gap-4 gap-x-20 w-full p-2">
        <header className="w-full text-grey-400 font-bold">
          <p>New Sales</p>
        </header>

        <NewSaleForm property={id} clients={clientOptions} />
      </div>
    </section>
  );
};

export default NewSale;
