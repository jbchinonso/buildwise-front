import { DashboardStatsCard } from "@/components/dashboard";
import { ArrowRight, Flash, Profile2User } from "iconsax-react";
import { Ban } from "lucide-react";
import Link from "next/link";
import React from "react";

const Titan = () => {
  return (
    <>
      <section className="w-full justify-between flex flex-wrap gap-4">
        {[
          {
            title: "Titans",
            icon: <Profile2User size="24" color="#1FDBF4" />,
            data: "86",
            theme: "",
          },
          {
            title: "Active",
            icon: <Flash size="24" color="#F4BB1F" />,
            data: "80",
            theme: "",
          },
          {
            title: "Inactive",
            icon: <Ban size="24" color="#7A7F83" className="rotate-90" />,
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
              <p className="text-lg font-semibold">Top performing agents</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl min-w-[MIN(100%,518px)] bg-white p-4 w-full flex-1 border border-grey-50">
          <div className="flex w-full items-center justify-between gap-4">
            <div className="flex flex-col">
              <p className="text-lg font-semibold">Commissions due</p>
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

export default Titan;
