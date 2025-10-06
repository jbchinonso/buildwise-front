import { RevenueOverview } from "../ui";
import { getTitanDashboardSummary } from "@/lib/services/dashboard.service";

const TotalRevenue = async () => {
  const response = await getTitanDashboardSummary();
  return (
    <RevenueOverview data={[]} stats={response?.totalSalesRevenue as any} />
  );
};

export default TotalRevenue;
