import { getTitanClientSummary } from "@/lib/services/dashboard.service";
import { RevenueOverview } from "../../ui";

const TotalRevenue = async () => {
  const response = await getTitanClientSummary();
  return <RevenueOverview stats={response?.totalSalesRevenue} />;
};

export default TotalRevenue;
