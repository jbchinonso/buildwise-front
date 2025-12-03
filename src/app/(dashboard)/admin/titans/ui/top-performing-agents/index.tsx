import { getTopTitanPerformannce } from "@/lib/services";
import Table from "./Table";
import Link from "next/link";
import { ArrowRight } from "iconsax-react";

export const TopPerformingAgents = async () => {
  const result = await getTopTitanPerformannce();
  const data = result?.data;

  return (
    <div className="rounded-2xl min-w-[MIN(100%,518px)] bg-white p-4 w.-full flex-[50%] flex flex-col gap-4 border border-grey-50">
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex flex-col">
          <p className="text-lg font-semibold">Top performing agents</p>
        </div>

        <Link
          href="/admin/titans/all"
          className="text-xs text-primary-400 items-center gap-1 font-medium flex flex-nowrap whitespace-nowrap"
        >
          View all Titans <ArrowRight size={14} color="currentColor" />
        </Link>
      </div>

      {data ? (
        <Table data={data} />
      ) : (
        <p>
          There was an error fetching Top Performing Agents. Please try again
        </p>
      )}
    </div>
  );
};
