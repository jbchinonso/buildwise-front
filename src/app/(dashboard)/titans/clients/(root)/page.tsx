import Link from "next/link";
import { ArrowRight } from "iconsax-react";
import { ClientsTable } from "../ui";
import { getTitanClientRecentTransactions } from "@/lib/services";

const Properties = async () => {
  const transactions = await getTitanClientRecentTransactions();
  return (
    <section className="flex flex-wrap gap-4 flex-1 max-h-[601px]">
      <div className="w-full my-4">
        <div className="w-full flex items-baseline my-2">
          <div className="flex items-center gap-4">
            <p className="font-bold">Recent transactions</p>
          </div>

          <Link
            href="clients/all"
            className="flex ml-auto items-center gap-1 text-xs font-medium text-primary-400 flex-nowrap whitespace-nowrap"
          >
            View all <ArrowRight size={14} color="currentColor" />
          </Link>
        </div>

        <ClientsTable data={transactions} />
      </div>
    </section>
  );
};

export default Properties;
