"use client";

import { PageModal } from "@/components/dashboard";
import TitansOverview from "@/components/titans/dashboard/TitansOverview";
import { TitanDashboardStatsCard } from "@/components/titans/TitanDashboardStatsCard";
import { useModal } from "@/lib/hooks";
import { House } from "lucide-react";

const ReferredAgents = () =>{
    const { isModalOpen, toggleModal, closeModal } = useModal();
  return (
    <>
      <TitanDashboardStatsCard
        title="Titans"
        icon={<House size="24" color="#1FDBF4" />}
        data="23.8B"
        theme=""
        onClick={toggleModal}
      />
      {isModalOpen && (
        <PageModal handleClose={closeModal} heading="My Titans">
          <TitansOverview/>
        </PageModal>
      )}
    </>
  );
}
export default ReferredAgents;