import { getPropertiesSummary } from "@/lib/services";
import { ClosedSales } from "../../ui";
import { toAmount } from "@/lib/utils";

const ClosedProperties = async () => {
  const summary = await getPropertiesSummary();
  return (
    <ClosedSales
      closedSales={toAmount(summary?.closedSales || 0, false)}
      summary={summary}
    />
  );
};

export default ClosedProperties;
