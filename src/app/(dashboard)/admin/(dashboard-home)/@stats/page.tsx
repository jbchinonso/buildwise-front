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
      <RevenueOverview stats={data?.totalRevenue} />
      <SalesOverview stats={data?.totalSales} />
      <TitansOverview stats={data?.titanCount} />
      <ClientOverview stats={data?.clientCount} />
    </>
  );
};

export default TitanStats;
