import {
  getPropertiesSummary,
  getRecentlyListedProperties,
} from "@/lib/services";

import { TotalListing } from "../../ui";
import { toAmount } from "@/lib/utils";

const ListedProperties = async () => {
  
  const [summary, recentListing] = await Promise.all([
    getPropertiesSummary(),
    getRecentlyListedProperties({
      limit: 5
    }),
  ]);


  return (
    <TotalListing
      totalListing={toAmount(summary?.totalUnits || 0, false)}
      summary={summary}
      data={recentListing || []}
    />
  );
};

export default ListedProperties;
