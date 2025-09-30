import { getTitanDashboardSummary } from "@/lib/services/dashboard.service";
import { ClientOverview } from "../../ui";

const Clients = async () => {
  const response = await getTitanDashboardSummary();
  return (
    <ClientOverview
      stats={response?.totalClients as any}
      data={response?.totalClients as any}
    />
  );
};

export default Clients;
