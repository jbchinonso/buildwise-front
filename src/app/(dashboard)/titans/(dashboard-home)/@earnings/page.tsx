import { EarningsOverview } from "../ui";
import { getTitanDashboardSummary } from "@/lib/services/dashboard.service";

const Earnings = async () => {
  const response = await getTitanDashboardSummary();
  // console.log({response})
  return <EarningsOverview stats={response?.totalEarnings as any} />;
};

export default Earnings;
