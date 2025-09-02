import { DashboardStatsCard } from "@/components/dashboard";
import { Flash, Profile2User } from "iconsax-react";
import { Ban } from "lucide-react";

const CardLoading = () => {
  return (
    <>
      <DashboardStatsCard
        title="Titans"
        icon={<Profile2User size="24" color="#1FDBF4" />}
        data="0"
        isLoading
      />
      <DashboardStatsCard
        title="Active"
        icon={<Flash size="24" color="#F4BB1F" />}
        data="0"
        isLoading
      />
      <DashboardStatsCard
        title="Inactive"
        icon={<Ban size="24" color="#7A7F83" className="rotate-90" />}
        data="0"
        isLoading
      >
        <span className="loader  absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 " />
      </DashboardStatsCard>
    </>
  );
};

export default CardLoading;
