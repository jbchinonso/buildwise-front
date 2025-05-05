import { DashboardStatsCard } from "@/components/dashboards";
import { ArrowRight, Flash, House2, Profile2User } from "iconsax-react";
import { Hourglass, House, KeyRound } from "lucide-react";
import Link from "next/link";
import React from "react";

const Properties = () => {
  return (
    <>
      <section className="w-full justify-between flex flex-wrap gap-4">
        {[
          {
            title: "Total listing",
            icon: <House2 size="24" color="#70F41F" />,
            data: "86",
            theme: "",
          },
          {
            title: "Available units",
            icon: <House size="24" color="#1FDBF4" />,
            data: "80",
            theme: "",
          },
          {
            title: "Reserved units",
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
