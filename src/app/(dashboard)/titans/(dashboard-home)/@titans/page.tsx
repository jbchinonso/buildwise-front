import { TitansOverview } from "../ui";
import { getTitanDashboardSummary } from "@/lib/services/dashboard.service";

const Titans = async () => {
  const response = await getTitanDashboardSummary();
  return <TitansOverview stats={(response?.totalTitans as any) || 0} />;
};

export default Titans;
