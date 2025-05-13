"use client";

import { PageModal } from "@/components/dashboard";
import EarningOverview from "@/components/titans/dashboard/EarningOverview";
import { TitanDashboardStatsCard } from "@/components/titans/TitanDashboardStatsCard";
import { useModal } from "@/lib/hooks";
import { House } from "lucide-react";

const Earnings = () => {
  const { isModalOpen, toggleModal, closeModal } = useModal();
  return (
    <>
      <TitanDashboardStatsCard
        title="Earnings"
        icon={<House size="24" color="#1FDBF4" />}
        data="23.8B"
        theme=""
        onClick={toggleModal}
      />
      {isModalOpen && (
        <PageModal handleClose={closeModal} heading="My Earnings">
          <EarningOverview />
        </PageModal>
      )}
    </>
  );
};
export default Earnings;
