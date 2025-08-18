import React, { Suspense } from "react";
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
  getReservedProperties,
  getMostAvaliableUnits,
} from "@/lib/services/";
import { recentlyReservedPropertiesDTO, topSellingPropertiesDTO } from "@/lib/dtos/property.dto";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui";
import { toAmount } from "@/lib/utils";
// import { AvaliableUnitsData } from "./ui/cards/AvaliableUnits.server";

const Properties = async () => {
  const [topSelling, recentlyListed, summary, reserved] =
    await Promise.all([
      getTopSellingProperties(),
      getRecentlyListedProperties(),
      getPropertiesSummary(),
      getReservedProperties(),
    ]);


  const availableUnits = getMostAvaliableUnits();

  return (
    <>
      <div className="flex w-full justify-end items-center">
        <Button asLink href="properties/add-property">
          <Plus color="currentColor" />
          Add new property
        </Button>
      </div>
      <section className="w-full justify-between flex flex-wrap gap-4">
        <TotalListing
          totalListing={toAmount(summary?.totalUnits || 0, false)}
          summary={summary}
        />
        <Suspense fallback={<div>Loading...</div>}>
          <AvailableUnits
            availableUnits={toAmount(
              summary?.totalAvailableUnits || 0,
              false
            )}
            data={availableUnits}
            summary={summary}
          />
        </Suspense>
        <ReservedUnits
          reservedUnits={toAmount(summary?.totalReservedUnits || 0, false)}
          data={recentlyReservedPropertiesDTO(reserved) ?? []}
          summary={summary}
        />
        <ClosedSales
          closedSales={toAmount(summary?.closedSales || 0, false)}
          data={[]}
          summary={summary}
        />
      </section>

      <section className="flex flex-wrap gap-4 flex-1 max-h-[601px]">
        <TopSellingProperties
          data={topSellingPropertiesDTO(topSelling) ?? []}
        />
        <RecentlyListed data={recentlyListed ?? []} />
      </section>
    </>
  );
};

export default Properties;
