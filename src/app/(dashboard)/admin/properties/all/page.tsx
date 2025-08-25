import React from "react";
import { PropertyTable } from "../ui";
import { BreadCrumbs, Button, Filters, SearchInput } from "@/components/ui";
import { getAllProperties } from "@/lib/services";
import { propertyTableDTO } from "@/lib/dtos/property.dto";
import { Plus } from "lucide-react";

type SearchParams = Promise<{ page?: string; limit?: string; search?: string, sortBy?: string }>;

const AllProperties = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;
  const { data = [], pagination = {} } = await getAllProperties(searchParams);

  return (
    <section className="flex flex-1 flex-col gap-4">
      <div className="flex w-full justify-between flex-wrap items-center">
        <BreadCrumbs
          paths={[
            { title: "Home", path: "/admin/properties" },
            { title: "All Properties", path: "/admin/properties/all" },
          ]}
        />
        <Button
          size="xs"
          asLink
          href="properties/add-property"
          className="!text-xs"
        >
          <Plus color="currentColor" size={20} />
          Add new property
        </Button>
      </div>

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
