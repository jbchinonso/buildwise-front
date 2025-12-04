import {  RecentTransactions, } from "./ui";
import { getDashboardTransactions } from "@/lib/services/dashboard.service";

const Dashboard = async () => {
  const { data: transactions = {}, error } =
    await getDashboardTransactions();
  return <RecentTransactions data={transactions as any} error={error} />;
};

export default Dashboard;
