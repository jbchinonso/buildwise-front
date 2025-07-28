import { BreadCrumbs } from "@/components/ui";
import { getProperty } from "@/lib/services";
import React from "react";
import { NewSaleForm } from "./NewSaleForm";

type Params = Promise<{ property: string }>;

const NewSale = async (props: { params: Params }) => {
  const params = await props.params;
  const id = params.property;

  const property = await getProperty(id);

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

        <NewSaleForm  property={id}/>
      </div>
    </section>
  );
};

export default NewSale;
