import { dashboardService } from "@/lib/services/dashboard.service";
import {
  ClientOverview,
  RevenueOverview,
  SalesOverview,
  TitansOverview,
} from "../ui";

const TitanStats = async () => {
  const { data = {} } = await dashboardService.getDashboardData();

  return (
    <>
      <RevenueOverview data={data} stats={data?.totalRevenue} />
      <SalesOverview data={data as any} stats={data?.totalSales} />
      <TitansOverview data={data as any} stats={data?.titanCount} />
      <ClientOverview data={data as any} stats={data?.clientCount} />
    </>
  );
};

export default TitanStats;
