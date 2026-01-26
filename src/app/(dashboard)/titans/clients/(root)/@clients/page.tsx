import { getTitanClientSummary } from "@/lib/services/dashboard.service";
import { ClientOverview } from "../../ui";

const Clients = async () => {
  const response = await getTitanClientSummary();
  return <ClientOverview stats={response?.totalClients as any} />;
};

export default Clients;
