/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { DashboardModal } from "@/components/dashboard";
import { Button, Input, SelectScrollable, SubmitButton } from "@/components/ui";
import { useClientFetch, useModal } from "@/lib/hooks";
import { getAllProperties, getTitans } from "@/lib/services";
import { IProperty } from "@/lib/type";
import { cn } from "@/lib/utils";
import { useFormik } from "formik";
import { Plus } from "lucide-react";

export const AddPropertyModal = ({ isMini }: { isMini?: boolean }) => {
  const { isModalOpen, toggleModal, closeModal } = useModal();

  const { data: properties, isLoading: isFetchingProperties } = useClientFetch({
    action: async () => {
      const { data } = await getAllProperties();

      return (data || [])?.map((property: IProperty) => ({
        label: property?.name,
        value: property?._id,
      }));
    },
    isModalOpen,
  });

  const { data: titans, isLoading: isFetchingTitans } = useClientFetch({
    action: async () => {
      const { data } = await getTitans();

      return (data || [])?.map((titan) => ({
        label: `${titan?.titan}`.toUpperCase(),
        value: titan?.id,
      }));
    },
    isModalOpen,
  });

  const { touched, errors, handleBlur, handleChange, values, isValid, dirty } =
    useFormik({
      initialValues: {
        // phone: session?.user?.phone || "",
        // email: session?.user?.email || "",
        // state: session?.user?.state || "",
        // lga: session?.user?.lga || "",
        // address: session?.user?.address || "",
      },
      // validationSchema: profileValidationSchema,
      onSubmit: async () => {},
    });

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
          <form className="flex flex-col flex-1 gap-16 w-full">
            <div className="flex flex-col flex-1 gap-4 w-full">
              <SelectScrollable
                label="Property"
                placeholder="Select Property"
                options={properties || []}
                disabled={isFetchingProperties}
              />
              <SelectScrollable
                label="Agent"
                placeholder="Select Agent"
                options={titans || []}
                disabled={isFetchingTitans}
              />
              <SelectScrollable
                label="Property units/ plot"
                placeholder="1plot/ 420sqm"
                options={[]}
              />
              <Input
                label="Property units/ plot"
                placeholder="Enter plot number"
              />

              <Input label="Plot number" placeholder="Enter plot number" />

              <SelectScrollable
                label="Payment options"
                placeholder="Select payment plan"
                options={[]}
              />
              <Input label="Amount paid" placeholder="Enter amount paid" />
            </div>

            <div className="flex gap-4 mt-auto justify-stretch w-full *:w-full">
              <Button
                onClick={closeModal}
                variant="secondary"
                size="sm"
                className="px-8"
              >
                Cancel
              </Button>
              <SubmitButton size="sm">Add property</SubmitButton>
            </div>
          </form>
        </DashboardModal>
      )}
    </>
  );
};
