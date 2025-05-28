import { ArrowRight } from "iconsax-react";
import Link from "next/link";
import Table from "./Table";
import { getTransactions } from "@/lib/services";

export const CommissionsDue = async () => {
  const { data = [] } = await getTransactions();
  return (
    <div className="rounded-2xl m.in-w-[MIN(100%,518px)] bg-white p-4 w/-full flex flex-col gap-4 flex-[30%] border border-grey-50">
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex flex-col">
          <p className="text-lg font-semibold">Commissions due</p>
        </div>

        <Link
          href="/admin/titans/all"
          className="text-xs text-primary-400 items-center gap-1 font-medium flex flex-nowrap whitespace-nowrap"
        >
          View all <ArrowRight size={14} color="currentColor" />
        </Link>
      </div>

      <Table data={data} />
    </div>
  );
};