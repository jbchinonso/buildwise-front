import { getClientStats } from "@/lib/services";
import { ReservedUnits } from "../../ui";

const ReservedProperties = async () => {
  const stats = await getClientStats();

  return <ReservedUnits reservedUnits={stats?.totalReserved || 0} />;
};

export default ReservedProperties;
