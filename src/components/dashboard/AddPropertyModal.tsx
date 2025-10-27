/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { DashboardModal } from "@/components/dashboard";
import { Button, Input, SelectScrollable } from "@/components/ui";
import { useModal } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

export const AddPropertyModal = ({ isMini }: { isMini?: boolean }) => {
  const { isModalOpen, toggleModal, closeModal } = useModal();
  return (
    <>
      <Button
        size="sm"
        onClick={toggleModal}
        variant="secondary"
        className={cn("ml-auto", isMini ? "rounded-full p-4" : "")}
      >
        <Plus size={18} /> {!isMini && <span>Add property</span>}
      </Button>

      {isModalOpen && (
        <DashboardModal
          heading={"Add property"}
          handleClose={closeModal}
          className="sm:max-w-[MIN(90%,520px)]"
        >
          <div className="flex flex-col flex-1 gap-16 w-full">
            <div className="flex flex-col flex-1 gap-4 w-full">
              <SelectScrollable
                label="Property"
                placeholder="Select Property"
                options={[]}
              />
              <SelectScrollable
                label="Agent"
                placeholder="Select Agent"
                options={[]}
              />
              <SelectScrollable
                label="Property units/ plot"
                placeholder="1plot/ 420sqm"
                options={[]}
              />
              <Input label="Plot number" placeholder="Enter plot number" />

              <SelectScrollable
                label="Payment options"
                placeholder="Select payment plan"
                options={[]}
              />
              <Input label="Amount paid" placeholder="Enter amount paid" />
            </div>

            <div className="flex gap-4 mt-auto justify-stretch w-full  *:w-full">
              <Button
                onClick={closeModal}
                variant="secondary"
                size="sm"
                className="px-8"
              >
                Cancel
              </Button>
              <Button size="sm">Add property</Button>
            </div>
          </div>
        </DashboardModal>
      )}
    </>
  );
};
