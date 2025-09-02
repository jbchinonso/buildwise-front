"use client";
import { DashboardStatsCard } from "@/components/dashboard";
import { toAmount } from "@/lib/utils";
import { Flash } from "iconsax-react";
import { useRouter } from "next/navigation";

export const ActiveTitans = ({ stat = 0 }: { stat?: number }) => {
  const router = useRouter();
  return (
    <DashboardStatsCard
      title="Active"
      icon={<Flash size="24" color="#F4BB1F" />}
      data={toAmount(stat, false)}
      className="cursor-auto"
      onClick={() => router.replace("?stats=true")}
    />
  );
};
