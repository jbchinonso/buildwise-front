"use client";
import { DashboardModal } from "@/components/dashboard";
import { Button, Input, SelectScrollable } from "@/components/ui";
import { useModal } from "@/lib/hooks";
import { useState } from "react";

export const UpdatePaymentModal = () => {
  const { isModalOpen, toggleModal, closeModal } = useModal();
  const [step, setStep] = useState(0);

  const data = [
    {
      item: "client",
      label: "Client  name",
      data: "Courtney Henry",
    },
    {
      item: "agent",
      data: "Sodik Nwachukwu",
    },
    {
      item: "property",
      data: "Silvercrest vill",
    },
    {
      item: "units",
      data: "1 Plot",
    },
    {
      item: "installment_period",
      label: "Instalment period",
      data: "18 May 2025 - 18 Nov 2026",
    },
    {
      item: "total_amount",
      label: "Total amount",
      data: "₦3,500,000",
    },
    {
      item: "amount_due",
      label: "Amount due",
      data: "₦1,500,000",
    },
    {
      item: "amount_paid",
      label: "Amount paid",
      data: "₦500,500",
    },
  ];

  return (
    <>
      <Button size="sm" onClick={toggleModal}>
        Update Payment
      </Button>

      {isModalOpen && (
        <DashboardModal
          heading={"Update Client's Payment"}
          handleClose={closeModal}
          className="sm:max-w-[MIN(90%,520px)]"
        >
          <div className="flex flex-col mt-auto flex-1 gap-4 w-full">
            {step ? (
              <div className="flex flex-col mt-auto flex-1 gap-4 w-full">
                {data.map((data, index) => {
                  return (
                    <div
                      key={`${data?.item}-${index}`}
                      className="flex items-center border-b w-full justify-between"
                    >
                      <p className="text-sm capitalize text-grey-400">
                        {data?.label || data?.item}
                      </p>
                      <p className="font-bold text-grey-600">{data?.data}</p>
                    </div>
                  );
                })}

                <Input placeholder="₦ Enter amount"  containerStyle="mt-4 mb-10"/>
              </div>
            ) : (
              <SelectScrollable
                placeholder="Select Property"
                label="Property"
                options={[]}
              />
            )}

            <div className="flex mt-auto gap-4 justify-stretch w-full  *:w-full">
              <Button
                onClick={closeModal}
                variant="secondary"
                size="sm"
                className="px-8"
              >
                Cancel
              </Button>
              {step ? (
                <Button size="sm">Confirm Payment</Button>
              ) : (
                <Button onClick={() => setStep(1)} size="sm">
                  Next
                </Button>
              )}
            </div>
          </div>
        </DashboardModal>
      )}
    </>
  );
};
