import React from "react";
import {
  RecentlyListed,
  TopSellingProperties,
} from "../ui";
import {
  getTopSellingProperties,
  getRecentlyListedProperties
} from "@/lib/services/";
import { topSellingPropertiesDTO } from "@/lib/dtos/property.dto";


const Properties = async () => {
  const [topSelling, recentlyListed] = await Promise.all([
    getTopSellingProperties(),
    getRecentlyListedProperties(),
  ]);

  console.log({ topSelling, recentlyListed });

  return (
    <section className="flex flex-wrap gap-4 flex-1 max-h-[601px]">
      <TopSellingProperties data={topSellingPropertiesDTO(topSelling) ?? []} />
      <RecentlyListed data={recentlyListed ?? []} />
    </section>
  );
};

export default Properties;
