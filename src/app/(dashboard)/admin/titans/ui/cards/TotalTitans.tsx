"use client";
import { DashboardStatsCard } from "@/components/dashboard";
import { Profile2User } from "iconsax-react";
import { toAmount } from "@/lib/utils";
import { useRouter } from "next/navigation";

export const TotalTitans = ({ stat = 0 }: { stat?: number }) => {
  const router = useRouter();
  return (
    <DashboardStatsCard
      title="Titans"
      icon={<Profile2User size="24" color="#1FDBF4" />}
      data={toAmount(stat, false)}
      onClick={() => router.replace("?stats=true")}
    />
  );
};
