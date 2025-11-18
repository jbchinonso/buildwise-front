import { SalesOverview } from "../../ui";
import { getTitanClientOverviewSummary } from "@/lib/services";

const SalesChart = async () => {
  const response = await getTitanClientOverviewSummary();
  return <SalesOverview stats={response?.closedSales} />;
};

export default SalesChart;
