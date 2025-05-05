"use client"
import { DashboardStatsCard, PageModal } from "@/components/dashboard";
import { useModal } from "@/lib/hooks";
import { ArrowDown } from "iconsax-react";

export const RevenueOverview = () => {
  const { isModalOpen, toggleModal, closeModal } = useModal();
  return (
    <>
      <DashboardStatsCard
        title="Total revenue"
        icon={<ArrowDown size="24" color="#70F41F" />}
        data="23.8B"
        theme=""
        onClick={toggleModal}
      />

      {isModalOpen && (
        <PageModal
          handleClose={closeModal}
          heading="Revenue Overview"
        ></PageModal>
      )}
    </>
  );
};
