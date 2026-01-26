import { getTitanClientSummary } from "@/lib/services/dashboard.service";
import { PropertyOverview } from "../../ui";

const PropertiesSold = async () => {
  const response = await getTitanClientSummary();

  return <PropertyOverview stats={response?.totalPlotsSold} />;
};

export default PropertiesSold;
