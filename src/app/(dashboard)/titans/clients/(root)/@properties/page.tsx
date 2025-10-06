import { getTitanDashboardSummary } from "@/lib/services/dashboard.service";
import { PropertyOverview } from "../../ui";

const PropertiesSold = async () => {
  const response = await getTitanDashboardSummary();
  return <PropertyOverview stats={response?.totalPlotsSold} data={[]} />;
};

export default PropertiesSold;
