import React from "react";
import {
  AvailableUnits,
  ReservedUnits,
  TotalListing,
  ClosedSales,
  RecentlyListed,
  TopSellingProperties,
} from "./ui";

const Properties = () => {
  return (
    <>
      <section className="w-full justify-between flex flex-wrap gap-4">
        <TotalListing totalListing={90} />
        <AvailableUnits />
        <ReservedUnits />
        <ClosedSales />
      </section>

      <section className="flex flex-wrap gap-4 flex-1 max-h-[601px]">
        <TopSellingProperties />
        <RecentlyListed />
      </section>
    </>
  );
};

export default Properties;
