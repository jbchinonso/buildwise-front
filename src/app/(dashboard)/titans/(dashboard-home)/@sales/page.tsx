import { SalesOverview } from "../ui";
import { getTitanDashboardSummary } from "@/lib/services/dashboard.service";

const SalesChart = async () => {
  const response = await getTitanDashboardSummary();
  return (
    <SalesOverview
      data={response.closedSales as any}
      stats={response.closedSales as any}
    />
  );
};

export default SalesChart;
