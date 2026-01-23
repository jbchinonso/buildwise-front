import { getTitanClientSummary } from "@/lib/services/dashboard.service";
import { SalesOverview } from "../../ui";

const SalesChart = async () => {
  const response = await getTitanClientSummary();
  return <SalesOverview stats={response?.closedSales} />;
};

export default SalesChart;
