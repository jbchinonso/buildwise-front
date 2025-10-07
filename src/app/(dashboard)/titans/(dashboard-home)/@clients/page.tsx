import { ClientOverview } from "../ui";
import { getTitanDashboardSummary } from "@/lib/services/dashboard.service";

const Clients = async () => {
  const response = await getTitanDashboardSummary();
  return <ClientOverview stats={response?.totalClients as any} />;
};

export default Clients;
