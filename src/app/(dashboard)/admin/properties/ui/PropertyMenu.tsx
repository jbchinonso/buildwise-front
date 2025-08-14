"use client";

import { Button } from "@/components/ui";
import { useModal } from "@/lib/hooks";
import { IProperty } from "@/lib/type";
import { More } from "iconsax-react";
import { useRef } from "react";

export const PropertyMenu = ({ property }: { property: IProperty }) => {
  const targetRef = useRef<HTMLButtonElement | null>(null);
  const { isModalOpen, toggleModal, closeModal } = useModal();

  return (
    <div className="w-full relative h-full">
      <Button
        asLink
        onClick={toggleModal}
        size="sm"
        variant="secondary"
        className="!rounded-full !px-2 !py-2 !p-2 !size-12"
        ref={targetRef}
      >
        <More size="24" color="currentColor" className="rotate-90" />
      </Button>

      {isModalOpen && (
        <>
          <button
            type="button"
            title="Close modal"
            onClick={closeModal}
            className="fixed cursor-auto w-screen h-full min-h-dvh top-0 left-0 z-[10] bg-[#1F1F1F33] backdrop-blur-[.2px]"
          />
          <div className="absolute shadow-sm p-2 place-content-start top-14 z-[20] divide-y right-4 flex flex-col min-w-fit max-w-[MIN(100%,266px)] rounded-xl bg-white">
            <Button
              size="xs"
              asLink
              href={`${property?._id}/transaction-history`}
              variant="ghost"
              className="text-start justify-start !py-3 !text-xs rounded rounded-b-none hover:bg-primary-400 hover:text-white"
            >
              View Transaction History
            </Button>
            <Button
              size="xs"
              asLink
              variant="ghost"
              // href="history"
              className="text-start justify-start !py-3 !text-xs rounded rounded-b-none hover:bg-primary-300 hover:text-white"
            >
              Update property details
            </Button>
            <Button
              size="xs"
              asLink
              variant="ghost"
              href="history"
              className="text-start justify-start !py-3 !text-xs rounded rounded-b-none hover:bg-primary-300 hover:text-white"
            >
              Change availability status
            </Button>
            <Button
              size="xs"
              asLink
              variant="ghost"
              href="history"
              className="text-start justify-start !py-3 !text-xs rounded rounded-b-none hover:bg-primary-300 hover:text-white"
            >
              Upload new property document
            </Button>
            <Button
              size="xs"
              asLink
              variant="ghost"
              href="history"
              className="text-start text-red-600 justify-start !py-3 !text-xs rounded rounded-b-none hover:bg-primary-300 hover:text-white"
            >
              Unlist property
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
