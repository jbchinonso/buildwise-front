import { getClientStats } from "@/lib/services";
import { ClientOverview } from "../../ui";

const ClientOverviewCard = async () => {
  const stats = await getClientStats();

  return <ClientOverview clients={stats?.totalClients || 0} />;
};

export default ClientOverviewCard;
