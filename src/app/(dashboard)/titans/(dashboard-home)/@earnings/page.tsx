import { EarningsOverview } from "../ui";
import { getTitanDashboardSummary } from "@/lib/services/dashboard.service";

const Earnings = async () => {
  const response = await getTitanDashboardSummary();
  return <EarningsOverview stats={response.closedSales as any} />;
};

export default Earnings;
