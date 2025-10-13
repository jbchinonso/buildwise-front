import { getTitanDashboardSummary } from "@/lib/services/dashboard.service";
import { SalesOverview } from "../../ui";

const SalesChart = async () => {
  const response = await getTitanDashboardSummary();
  return <SalesOverview stats={response?.closedSales} />;
};

export default SalesChart;
