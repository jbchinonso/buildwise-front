import {
  getClientRecentlyReserved,
  getPropertiesSummary,
} from "@/lib/services";
import { ReservedUnits } from "../../ui";
import { toAmount } from "@/lib/utils";

const ReservedProperties = async () => {
  const [summary, reserved] = await Promise.all([
    getPropertiesSummary(),
    getClientRecentlyReserved(),
  ]);

  return (
    <ReservedUnits
      reservedUnits={toAmount(summary?.totalReservedUnits || 0, false)}
      data={reserved ?? []}
      summary={summary}
    />
  );
};

export default ReservedProperties;
