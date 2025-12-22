import { getBankRequests } from "@/lib/services/bank.service";
import { Banner } from "./BankRequestTriggerAndModal";

export const BankRequests = async () => {
  const { data = [] } = await getBankRequests();

  const totalUniqueUsers = Array.from(
    new Set(data?.map((request) => request.userId))
  )?.length;

  if (data?.length <= 0) {
    return null;
  }

  return <Banner requests={data || []} totalUsers={totalUniqueUsers} />;
};
