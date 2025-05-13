"use client";
import { DashboardStatsCard, PageModal } from "@/components/dashboard";
import { useModal } from "@/lib/hooks";
import { Ban } from "lucide-react";
import React from "react";

export const InActiveTitans = () => {
  const { isModalOpen, toggleModal, closeModal } = useModal();
  return (
    <>
      <DashboardStatsCard
        title="Inactive"
        icon={<Ban size="24" color="#7A7F83" className="rotate-90" />}
        data="10"
        theme=""
        className="cursor-auto"
        // onClick={toggleModal}
      />

      {/* {isModalOpen && (
        <PageModal handleClose={closeModal} heading="Revenue Overview">
          <section className="flex flex-col w-full gap-4 "></section>
        </PageModal>
      )} */}
    </>
  );
};
