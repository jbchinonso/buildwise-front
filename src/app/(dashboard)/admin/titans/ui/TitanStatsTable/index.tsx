import { DataTable, PageModal } from "@/components/dashboard";
import { Button } from "@/components/ui";
import { ArrowRight } from "iconsax-react";
import Link from "next/link";
import { columns } from "./column";

export const TitanStatsTable = () => {
  const data: any = [];
  return (
    <PageModal
      backHref="?"
      heading="Titans Overview"
      className="max-w-[MIN(95%,620px)]"
    >
      <section className="flex flex-col w-full gap-4 ">
        <div className="flex w-full rounded-xl text-xs py-[10px] flex-wrap bg-primary-50 p-3 text-white">
          <div className="flex flex-col flex-[25] gap-2">
            <p className="text-grey-400">All Titans</p>
            <p className="text-grey-600">100</p>
          </div>
          <div className="flex flex-col flex-[25] gap-2">
            <p className="text-grey-400">Active</p>
            <p className="text-grey-600">90</p>
          </div>
          <div className="flex flex-col flex-[25] gap-2">
            <p className="text-grey-400">Inactive earned</p>
            <p className="text-grey-600">10</p>
          </div>
        </div>

        <div className="flex items-baseline justify-between w-full gap-4">
          <h2 className="font-semibold text-grey-600">
            Recently onboarded agents
          </h2>

          <Link
            href="/"
            className="flex items-center gap-1 text-xs font-medium text-primary-400 flex-nowrap whitespace-nowrap"
          >
            View all <ArrowRight size={14} color="currentColor" />
          </Link>
        </div>

        <div className="w-full my-2">
          <DataTable columns={columns} data={data} />
        </div>

        <div className="flex justify-end gap-4 items-center">
          <Button size="xs" outline variant="secondary">
            Close
          </Button>

          <Button size="xs">Export PDF</Button>
        </div>
      </section>
    </PageModal>
  );
};
