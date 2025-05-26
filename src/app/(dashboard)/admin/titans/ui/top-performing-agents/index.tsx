import { getTransactions } from "@/lib/services";
import Table from "./Table";

export const TopPerformingAgents = async () => {
  const { data = [] } = await getTransactions();
  return (
    <div className="rounded-2xl min-w-[MIN(100%,518px)] bg-white p-4 w.-full flex-[50%] flex flex-col gap-4 border border-grey-50">
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex flex-col">
          <p className="text-lg font-semibold">Top performing agents</p>
        </div>
      </div>

      <Table data={data} />
    </div>
  );
};
