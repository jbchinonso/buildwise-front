import { TitansOverview } from "../ui";
import { getTitanDashboardSummary } from "@/lib/services/dashboard.service";

const Titans = async () => {
  const response = await getTitanDashboardSummary();
  return <TitansOverview data={response?.totalClients as any} />;
};

export default Titans;
