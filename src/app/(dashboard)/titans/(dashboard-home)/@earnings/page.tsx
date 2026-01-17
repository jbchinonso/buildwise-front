import { Earnings } from "../ui";
import { getTitanDashboardSummary } from "@/lib/services/dashboard.service";

const EarningsCard = async () => {
  const response = await getTitanDashboardSummary();
  return <Earnings stats={response?.totalEarnings as any} />;
};

export default EarningsCard;
