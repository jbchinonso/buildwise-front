"use client";
import { DashboardStatsCard, PageModal } from "@/components/dashboard";
import { useModal } from "@/lib/hooks";
import { Network } from "lucide-react";
import React from "react";

export const TitansOverview = () => {
  const { isModalOpen, toggleModal, closeModal } = useModal();
  return (
    <>
      <DashboardStatsCard
        title="Total titans"
        icon={<Network size="24" color="#926667" className="rotate-90" />}
        data="23.8B"
        theme=""
        onClick={toggleModal}
      />

      {isModalOpen && (
        <PageModal
          handleClose={closeModal}
          heading="Titans Overview"
        ></PageModal>
      )}
    </>
  );
};
