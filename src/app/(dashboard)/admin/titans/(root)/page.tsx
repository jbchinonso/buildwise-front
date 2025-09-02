import { getTitans } from "@/lib/services";
import { CommissionsDue, TopPerformingAgents } from "../ui";

type SearchParams = Promise<{ page?: string; limit?: string; search?: string }>;

const TitansPage = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;

  const titans = await getTitans(searchParams);

  return (
    <section className="flex flex-wrap gap-4 flex-1 max-h-[601px]">
      <TopPerformingAgents />
      <CommissionsDue />
    </section>
  );
};

export default TitansPage;
