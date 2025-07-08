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
} from "@/lib/services/";
import {
  recentlyListedPropertiesDTO,
  topSellingPropertiesDTO,
} from "@/lib/dtos/property.dto";

const Properties = async () => {
  const [topSelling, recentlyListed] = await Promise.all([
    getTopSellingProperties({}),
    getRecentlyListedProperties({}),
  ]);

  return (
    <>
      <section className="w-full justify-between flex flex-wrap gap-4">
        <TotalListing totalListing={90} />
        <AvailableUnits />
        <ReservedUnits />
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
