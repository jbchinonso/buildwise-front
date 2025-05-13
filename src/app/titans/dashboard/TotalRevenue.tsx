"use client";

import { PageModal } from "@/components/dashboard";
import RevenueOverview from "@/components/titans/dashboard/RevenueOverview";
import { TitanDashboardStatsCard } from "@/components/titans/TitanDashboardStatsCard";
import { useModal } from "@/lib/hooks";
import { House } from "lucide-react";

const TotalRevenue = () => {
  const { isModalOpen, toggleModal, closeModal } = useModal();
  return (
    <>
      <TitanDashboardStatsCard
        title="Total revenue"
        icon={<House size="24" color="#1FDBF4" />}
        data="23.8B"
        theme=""
        onClick={toggleModal}
      />
      {isModalOpen && (
        <PageModal handleClose={closeModal} heading="Revenue Overview">
          <RevenueOverview />
        </PageModal>
      )}
    </>
  );
};
export default TotalRevenue;
