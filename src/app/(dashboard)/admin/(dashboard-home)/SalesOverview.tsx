"use client";
import { DashboardStatsCard, PageModal,  } from "@/components/dashboard";
import { useModal } from "@/lib/hooks";
import { House } from "lucide-react";;

export const SalesOverview = () => {
  const { isModalOpen, toggleModal, closeModal } = useModal();
  return (
    <>
      <DashboardStatsCard
        title="Total sales"
        icon={<House size="24" color="#1FDBF4" />}
        data="23.8B"
        theme=""
        onClick={toggleModal}
      />

      {isModalOpen && (
        <PageModal
          handleClose={closeModal}
          heading="Total Sales Overview"
        ></PageModal>
      )}
    </>
  );
};
