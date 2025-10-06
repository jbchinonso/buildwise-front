"use client";
import { DashboardStatsCard } from "@/components/dashboard";
import { toAmount } from "@/lib/utils";
import { Ban } from "lucide-react";
import { useRouter } from "next/navigation";

export const InActiveTitans = ({ stat = 0 }: { stat?: number }) => {
  const router = useRouter();
  return (
    <DashboardStatsCard
      title="Inactive"
      icon={<Ban size="24" color="#7A7F83" className="rotate-90" />}
      data={toAmount(stat, false)}
      theme=""
      className="cursor-auto"
      onClick={() => router.replace("?stats=true")}
    />
  );
};
