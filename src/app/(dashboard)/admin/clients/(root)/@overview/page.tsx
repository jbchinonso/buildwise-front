import { getClientOverview, getClientStats } from "@/lib/services";
import { ClientOverview } from "../../ui";

const ListedProperties = async () => {
  const [stats, overview] = await Promise.all([
    getClientStats(),
    getClientOverview(),
  ]);

  return <ClientOverview data={overview} clients={stats?.totalClients || 0} />;
};

export default ListedProperties;
