import { getClientRecentlyReserved, getClientStats } from "@/lib/services";
import { ReservedUnits } from "../../ui";

const ReservedProperties = async () => {
  const [stats, reserved] = await Promise.all([
    getClientStats(),
    getClientRecentlyReserved(),
  ]);

  return (
    <ReservedUnits
      data={reserved ?? []}
      reservedUnits={stats?.totalReserved || 0}
    />
  );
};

export default ReservedProperties;
