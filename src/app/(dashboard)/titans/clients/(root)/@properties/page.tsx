import { getTitanDashboardSummary } from "@/lib/services/dashboard.service";
import { PropertyOverview } from "../../ui";

const PropertiesSold = async () => {
  // const response = await getTitanDashboardSummary();

  return <PropertyOverview stats={0}/>;
};

export default PropertiesSold;
