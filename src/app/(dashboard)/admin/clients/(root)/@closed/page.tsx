import { getAllProperties, getPropertiesSummary } from "@/lib/services";
import { ClosedSales } from "../../ui";
import { toAmount } from "@/lib/utils";

const ClosedProperties = async () => {
  const [summary, properties] = await Promise.all([
    getPropertiesSummary(),
    getAllProperties({ limit: 5 }),
  ]);

  return (
    <ClosedSales
      closedSales={toAmount(summary?.closedSales || 0, false)}
      data={properties?.data || []}
      summary={summary}
    />
  );
};

export default ClosedProperties;
