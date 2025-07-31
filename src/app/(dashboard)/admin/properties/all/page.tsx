import React from "react";
import { PropertyTable } from "../ui";
import { BreadCrumbs, Filters, SearchInput } from "@/components/ui";
import { getAllProperties } from "@/lib/services";
import { propertyTableDTO } from "@/lib/dtos/property.dto";

const AllProperties = async () => {
  const { data = [], pagination = {} } = await getAllProperties({});

  return (
    <section className="flex flex-1 flex-col gap-4">
      <BreadCrumbs
        paths={[
          { title: "Home", path: "/admin/properties" },
          { title: "All Properties", path: "/admin/properties/all" },
        ]}
      />

      <div className="w-full my-2 flex items-baseline justify-between">
        <p className="font-bold flex gap-2">
          All Properties
          <span className="text-grey-400">{pagination?.total ?? 0}</span>
        </p>

        <div className="flex gap-2 items-center">
          <Filters />
          <SearchInput />
        </div>
      </div>
      <PropertyTable data={propertyTableDTO(data)} />
    </section>
  );
};

export default AllProperties;
