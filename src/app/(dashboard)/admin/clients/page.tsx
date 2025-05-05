import { DashboardStatsCard } from "@/components/dashboard";
import { Button } from "@/components/ui";
import { ArrowRight, House2 } from "iconsax-react";
import { Hourglass, KeyRound } from "lucide-react";
import Link from "next/link";
import React from "react";

const Properties = () => {
  return (
    <>
      <div className="flex-w-full items-center">
        <Button>Add new client</Button>
      </div>
      <section className="w-full justify-between flex flex-wrap gap-4">
        {[
          {
            title: "Clients",
            icon: <House2 size="24" color="#70F41F" />,
            data: "86",
            theme: "",
          },
          {
            title: "Reserved properties",
            icon: <Hourglass size="24" color="#926667" />,
            data: "2",
            theme: "",
          },
          {
            title: "Closed sales",
            icon: <KeyRound size="24" color="#9747FF" />,
            data: "2",
            theme: "",
          },
        ].map((props, index) => (
          <DashboardStatsCard key={`${index}-${props?.title}`} {...props} />
        ))}
      </section>

      <section className="flex flex-wrap gap-4 flex-1 max-h-[601px]">
        <div className="rounded-2xl min-w-[MIN(100%,518px)] bg-white p-4 w-full flex-1 border border-grey-50">
          <div className="flex w-full items-center justify-between gap-4">
            <div className="flex flex-col">
              <p className="text-lg font-semibold">Top selling properties</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl min-w-[MIN(100%,518px)] bg-white p-4 w-full flex-1 border border-grey-50">
          <div className="flex w-full items-center justify-between gap-4">
            <div className="flex flex-col">
              <p className="text-lg font-semibold">Recently listed </p>
            </div>

            <Link
              href="/"
              className="text-xs text-primary-400 items-center gap-1 font-medium flex flex-nowrap whitespace-nowrap"
            >
              View all <ArrowRight size={14} color="currentColor" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Properties;
