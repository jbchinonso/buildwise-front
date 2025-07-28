import React from "react";
import {
  AvailableUnits,
  ReservedUnits,
  TotalListing,
  ClosedSales,
  RecentlyListed,
  TopSellingProperties,
} from "./ui";
import {
  getTopSellingProperties,
  getRecentlyListedProperties,
  getPropertiesSummary,
} from "@/lib/services/";
import {
  recentlyListedPropertiesDTO,
  topSellingPropertiesDTO,
} from "@/lib/dtos/property.dto";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui";

const Properties = async () => {
  const [topSelling, recentlyListed, summary] = await Promise.all([
    getTopSellingProperties({}),
    getRecentlyListedProperties({}),
    getPropertiesSummary(),
  ]);

  return (
    <>
      <div className="flex w-full justify-end items-center">
        <Button asLink href="properties/add-property">
          <Plus color="currentColor" />
          Add new property
        </Button>
      </div>
      <section className="w-full justify-between flex flex-wrap gap-4">
        <TotalListing totalListing={summary?.totalProperties || 0} />
        <AvailableUnits availableUnits={summary?.totalAvailableUnits || 0} />
        <ReservedUnits reservedUnits={summary?.totalReservedUnits || 0} />
        <ClosedSales />
      </section>

      <section className="flex flex-wrap gap-4 flex-1 max-h-[601px]">
        <TopSellingProperties
          data={topSellingPropertiesDTO(topSelling) ?? []}
        />
        <RecentlyListed
          data={recentlyListedPropertiesDTO(recentlyListed) ?? []}
        />
      </section>
    </>
  );
};

export default Properties;
