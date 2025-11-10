import { RevenueOverview } from "../ui";
import { getTitanDashboardSummary } from "@/lib/services/dashboard.service";

const TotalRevenue = async () => {
  const response = await getTitanDashboardSummary();
  return <RevenueOverview stats={(response?.totalSubtitans as any) || 0} />;
};

export default TotalRevenue;
