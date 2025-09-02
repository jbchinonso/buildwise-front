"use client";
import { DashboardModal } from "@/components/dashboard";
import { Button, Input, SelectScrollable, SubmitButton } from "@/components/ui";
import { getClientPaymentData } from "@/lib/services";
import { IOption } from "@/lib/type";
import { formatDate, getError, toAmount } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export const UpdatePropertyPaymentModal = ({
  clients = [],
}: {
  clients?: IOption[];
}) => {
  const searchparams = useSearchParams();
  const [clientId, setClientId] = useState("");
  const [step, setStep] = useState<0 | 1>(0);
  const [paymentData, setPaymentData] = useState<any[]>([]);
  const router = useRouter();
  const isUpdating = searchparams.get("update-payment");

  const onSubmit = async () => {
    try {
      switch (step) {
        case 0:
          if (!clientId) {
            throw new Error("Select client");
          }
          console.log({clientId})
          // const queryParams = new URLSearchParams(searchparams);
          const response = await getClientPaymentData({ clientId });
          const data = response
            ? [
                {
                  item: "client",
                  label: "Client  name",
                  data: response?.clientName || "N/A",
                },
                {
                  item: "agent",
                  data: response?.agent || "N/A",
                },
                {
                  item: "property",
                  data: response?.propertyName || "N/A",
                },
                {
                  item: "units",
                  data: response?.units || "N/A",
                },
                {
                  item: "installment_period",
                  label: "Instalment period",
                  data:
                    (response?.installmentPeriod?.start &&
                      response?.installmentPeriod?.end &&
                      `${formatDate(
                        response?.installmentPeriod?.start,
                        "dd MM, yyyy"
                      )} - ${formatDate(
                        response?.installmentPeriod?.end,
                        "dd MM, yyyy"
                      )}`) ||
                    "N/A",
                },
                {
                  item: "total_amount",
                  label: "Total amount",
                  data: toAmount(response?.totalAmount, true),
                },
                {
                  item: "amount_due",
                  label: "Amount due",
                  data: toAmount(response?.amountDue, true),
                },
                {
                  item: "amount_paid",
                  label: "Amount paid",
                  data: toAmount(response?.amountPaid, true),
                },
              ]
            : [];

          setPaymentData(data);
          console.log({ data });
          // queryParams.set("clientId", "");
          // router.replace(`?${queryParams?.toString()}`);
          break;
        case 1:
          break;
        default:
          break;
      }
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <>
      <Button
        asLink
        size="sm"
        variant="secondary"
        onClick={() => router.replace("?update-payment=true")}
      >
        Update Payment
      </Button>

      {isUpdating && (
        <DashboardModal
          heading={"Update Client's Payment"}
          backHref="?"
          className="sm:max-w-[MIN(90%,520px)]"
        >
          <form
            action={onSubmit}
            className="flex flex-col flex-1 w-full gap-4 mt-auto"
          >
            {step ? (
              <div className="flex flex-col flex-1 w-full gap-4 mt-auto">
                {paymentData?.map((data, index) => {
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
                  type="tel"
                />
              </div>
            ) : (
              <SelectScrollable
                placeholder="Select Client"
                label="Client's name"
                options={clients}
                onChange={(value) => setClientId(value)}
              />
            )}

            <div className="flex mt-auto gap-4 justify-stretch w-full  *:w-full">
              <Button
                onClick={() => router.replace("?")}
                variant="secondary"
                size="xs"
                type="button"
                className="px-8"
              >
                Cancel
              </Button>
              <SubmitButton size="xs">
                {step ? "Confirm Payment" : "Next"}
              </SubmitButton>
            </div>
          </form>
        </DashboardModal>
      )}
    </>
  );
};
