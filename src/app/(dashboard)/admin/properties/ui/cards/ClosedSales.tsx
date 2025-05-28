"use client";
import { DashboardStatsCard, PageModal } from "@/components/dashboard";
import { useModal } from "@/lib/hooks";
import { KeyRound } from "lucide-react";
import React from "react";

export const ClosedSales = () => {
  const { isModalOpen, toggleModal, closeModal } = useModal();
  return (
    <>
      <DashboardStatsCard
        title="Closed sales"
        icon={<KeyRound size="24" color="#9747FF" />}
        data="90"
        theme=""
        // className="cursor-auto"
        onClick={toggleModal}
      />

      {isModalOpen && (
        <PageModal handleClose={closeModal} heading="Closed Sales">
          <section className="flex flex-col w-full gap-4 "></section>
        </PageModal>
      )}
    </>
  );
};
