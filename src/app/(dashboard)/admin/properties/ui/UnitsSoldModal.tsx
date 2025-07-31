"use client";

import { PageModal } from "@/components/dashboard";
import { Button } from "@/components/ui";
import { useModal } from "@/lib/hooks";
import { ArrowRight } from "iconsax-react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export const UnitsSoldModal = () => {
  const { isModalOpen, toggleModal, closeModal } = useModal();
  return (
    <PageModal
      handleClose={closeModal}
      heading="Units Sold"
      className="max-w-[MIN(100%,600px)]"
    >
      <section className="flex flex-col w-full gap-4">
        <div className="flex items-baseline justify-between w-full gap-4 my-1">
          <h2 className="font-semibold text-grey-600">Most units available</h2>

          <Link
            href="/"
            className="flex items-center gap-1 text-xs font-medium text-primary-400 flex-nowrap whitespace-nowrap"
          >
            View all 
            <ChevronRight className="size-4" />
          </Link>
        </div>

        <div className="w-full my-1">
          {/* <DataTable columns={columns} data={data} /> */}
        </div>

        <div className="flex justify-end gap-4 items-center">
          <Button size="xs" outline variant="secondary">
            Close
          </Button>

          <Button size="xs">Export PDF</Button>
        </div>
      </section>
    </PageModal>
  );
};
