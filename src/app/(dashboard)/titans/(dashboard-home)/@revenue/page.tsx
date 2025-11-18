import { RevenueOverview } from "../ui";
import { getTitanDashboardSummary } from "@/lib/services/dashboard.service";

const TotalRevenue = async () => {
  const response = await getTitanDashboardSummary();
  return <RevenueOverview stats={response?.totalRevenue as any} />;
};

export default TotalRevenue;
