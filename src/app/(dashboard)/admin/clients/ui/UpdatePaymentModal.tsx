"use client";
import { DashboardModal } from "@/components/dashboard";
import { Button, Input, SelectScrollable, SubmitButton } from "@/components/ui";
import { useModal } from "@/lib/hooks";
import { IClientProfile, IOption } from "@/lib/type";
import { useRouter, useSearchParams } from "next/navigation";


export const UpdatePaymentModal = ({
  properties = [],
  client,
}: {
  properties?: IOption[];
  client?: IClientProfile;
}) => {
  const { isModalOpen, toggleModal, closeModal } = useModal();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isConfirmingPayment = searchParams.get("confirm-payment") || "";

  const data = [
    {
      item: "client",
      label: "Client  name",
      data: `${client?.fullname}`.toUpperCase(),
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

  const close = () => {
    router.replace("?");
    closeModal();
  };

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
          <form className="flex flex-col flex-1 w-full gap-4 mt-auto">
            {isConfirmingPayment ? (
              <div className="flex flex-col flex-1 w-full gap-4 mt-auto">
                {data.map((data, index) => {
                  return (
                    <div
                      key={`${data?.item}-${index}`}
                      className="flex items-center justify-between w-full border-b"
                    >
                      <p className="text-xs capitalize text-grey-400">
                        {data?.label || data?.item}
                      </p>
                      <p className="text-sm font-bold text-grey-600">
                        {data?.data}
                      </p>
                    </div>
                  );
                })}

                <Input
                  placeholder="₦ Enter amount"
                  containerStyle="mt-4 mb-10"
                />
              </div>
            ) : (
              <SelectScrollable
                placeholder="Select Property"
                label="Property"
                options={properties}
              />
            )}

            <div className="flex mt-auto gap-4 justify-stretch w-full  *:w-full">
              <Button
                type="button"
                onClick={close}
                variant="secondary"
                size="sm"
                className="px-8"
              >
                Cancel
              </Button>

              {isConfirmingPayment ? (
                <SubmitButton size="sm">Confirm Payment</SubmitButton>
              ) : (
                <Button asLink replace href={`?confirm-payment=true`} size="sm">
                  Next
                </Button>
              )}
            </div>
          </form>
        </DashboardModal>
      )}
    </>
  );
};
