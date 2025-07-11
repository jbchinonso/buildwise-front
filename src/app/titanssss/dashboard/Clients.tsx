"use client";

import { PageModal } from "@/components/dashboard";
import ClientOverview from "@/components/titans/dashboard/ClientOverview";
import { TitanDashboardStatsCard } from "@/components/titans/TitanDashboardStatsCard";
import { useModal } from "@/lib/hooks";
import { House } from "lucide-react";

const Clients = () => {
  const { isModalOpen, toggleModal, closeModal } = useModal();
  return (
    <>
      <TitanDashboardStatsCard
        title="Clients"
        icon={<House size="24" color="#1FDBF4" />}
        data="23.8B"
        theme=""
        onClick={toggleModal}
      />
      {isModalOpen && (
        <PageModal handleClose={closeModal} heading="Client Overview">
          <ClientOverview />
        </PageModal>
      )}
    </>
  );
};
export default Clients;
