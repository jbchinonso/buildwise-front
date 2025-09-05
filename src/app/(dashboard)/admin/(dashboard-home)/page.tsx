import { PropertiesSold, RecentTransactions, RevenueChart } from "./ui";
import { dashboardService } from "@/lib/services/dashboard.service";

const Dashboard = async () => {
  const { data: transactions = {}, error } =
    await dashboardService.getDashboardTransactions();

  return <RecentTransactions data={transactions as any} error={error} />;
};

export default Dashboard;
