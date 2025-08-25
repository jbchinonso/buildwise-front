import { getMostAvaliableUnits, getPropertiesSummary } from "@/lib/services";
import { AvailableUnits } from "../../ui";
import { toAmount } from "@/lib/utils";

const AvailableProperties = async () => {
  const [summary, availableUnits] = await Promise.all([
    getPropertiesSummary(),
    getMostAvaliableUnits(),
  ]);

  return (
    <AvailableUnits
      availableUnits={toAmount(summary?.totalAvailableUnits || 0, false)}
      data={availableUnits}
      summary={summary}
    />
  );
};

export default AvailableProperties;
