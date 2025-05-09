"use client";
import { DashboardStatsCard, PageModal } from "@/components/dashboard";
import { useModal } from "@/lib/hooks";
import { Flash } from "iconsax-react";
import React from "react";

export const ActiveTitans = () => {
  const { isModalOpen, toggleModal, closeModal } = useModal();
  return (
    <>
      <DashboardStatsCard
        title="Active"
        icon={<Flash size="24" color="#F4BB1F" />}
        data="90"
        theme=""
        onClick={toggleModal}
      />

      {isModalOpen && (
        <PageModal handleClose={closeModal} heading="Revenue Overview">
          <section className="flex flex-col w-full gap-4 "></section>
        </PageModal>
      )}
    </>
  );
};
