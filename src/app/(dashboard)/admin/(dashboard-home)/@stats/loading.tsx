import { DashboardStatsCard } from "@/components/dashboard";
import { ArrowDown, Flash, House, Profile2User } from "iconsax-react";
import { Ban, Network } from "lucide-react";

const CardLoading = () => {
  return (
    <>
      <DashboardStatsCard
        title="Total revenue"
        icon={<ArrowDown size="24" color="#70F41F" />}
        data="0"
        isLoading
      />
      <DashboardStatsCard
        title="Total sales"
        icon={<House size="24" color="#1FDBF4" />}
        data="0"
        isLoading
      />
      <DashboardStatsCard
        title="Total titans"
        icon={<Network size="24" color="#926667" className="rotate-90" />}
        data="0"
        isLoading
      />
      <DashboardStatsCard
        title="Total Clients"
        icon={<Profile2User size="24" color="#9747FF" />}
        data="0"
        isLoading
      />
    </>
  );
};

export default CardLoading;
