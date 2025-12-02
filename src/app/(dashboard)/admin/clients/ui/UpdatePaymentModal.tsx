"use client";
import { DashboardModal } from "@/components/dashboard";
import { Button, Input, SelectScrollable, SubmitButton } from "@/components/ui";
import { useModal } from "@/lib/hooks";
import { updatePayment } from "@/lib/services";
import { IClientProperty, IClientProfile, IOption } from "@/lib/type";
import { IUpdatePaymentPayload } from "@/lib/types/titan";
import { getError, toAmount } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

export const UpdatePaymentModal = ({
  properties = [],
  client,
}: {
  properties?: (IClientProperty | IOption)[]; 
  client?: IClientProfile;
}) => {
  const { isModalOpen, toggleModal, closeModal } = useModal();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isConfirmingPayment = searchParams.get("confirm-payment");
  const selectedSaleId = searchParams.get("property");

  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const hasRealProperties = useMemo(() => {
    const firstItem = properties[0];
    return firstItem && 'saleId' in firstItem;
  }, [properties]);



  const actualProperties = useMemo(() => {
    if (hasRealProperties) {
      return properties as IClientProperty[];
    } else {
      console.error("Received options instead of properties. Check parent component.");
      return [];
    }
  }, [properties, hasRealProperties]);

  const propertyOptions = useMemo(() => {
    if (hasRealProperties) {
      return actualProperties.map((property) => ({
        label: `${property.propertyName} - ${property.unitNumber} (Plot ${property.plotNumber})`,
        value: property.saleId,
      }));
    } else {
      return properties as IOption[];
    }
  }, [hasRealProperties, actualProperties, properties]);

  const selectedProperty = useMemo(() => {
    if (!selectedSaleId || !hasRealProperties) return null;
    return actualProperties.find(prop => prop.saleId === selectedSaleId);
  }, [actualProperties, selectedSaleId, hasRealProperties]);

  useEffect(() => {
    if (!isModalOpen) {
      setAmount("");
    }
  }, [isModalOpen]);

  const close = () => {
    router.replace("?");
    closeModal();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConfirmingPayment) return;

    setIsLoading(true);

    try {
      if (!selectedSaleId || !client?.id) {
        toast.error("Missing required information");
        return;
      }

      if (!hasRealProperties) {
        toast.error("Property data not available. Please refresh and try again.");
        return;
      }

      const paymentAmount = parseFloat(amount);
      if (!paymentAmount || paymentAmount <= 0) {
        toast.error("Please enter a valid amount");
        return;
      }

     
      const payload: IUpdatePaymentPayload = {
        clientId: client.id,
        saleId: selectedSaleId,
        amount: paymentAmount,
      };

      const result = await updatePayment(payload);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success("Payment updated successfully!");
      close();
      router.refresh();

    } catch (err) {
      toast.error(getError(err));
    } finally {
      setIsLoading(false);
    }
  };

  const displayData = selectedProperty ? [
    {
      item: "client",
      label: "Client name",
      data: `${client?.fullname}`.toUpperCase(),
    },
    {
      item: "agent",
      data: "Sodik Nwachukwu",
    },
    {
      item: "property",
      data: selectedProperty.propertyName || "N/A",
    },
    {
      item: "plot",
      label: "Plot Number",
      data: `Plot ${selectedProperty.plotNumber}`,
    },
    {
      item: "units",
      data: selectedProperty.unitNumber || "N/A",
    },
    {
      item: "payment_plan",
      label: "Payment Plan",
      data: selectedProperty.paymentPlan || "N/A",
    },
    {
      item: "total_amount",
      label: "Total amount",
      data: toAmount(selectedProperty.price || 0, true),
    },
    {
      item: "amount_due",
      label: "Amount due",
      data: toAmount(Math.abs(selectedProperty.paymentDue || 0), true),
    },
    {
      item: "amount_paid",
      label: "Amount paid",
      data: toAmount(selectedProperty.amountPaid || 0, true),
    },
  ] : [];

  return (
    <>
      <Button size="sm" onClick={toggleModal}>
        Update Payment
      </Button>

      {isModalOpen && (
        <DashboardModal
          heading={"Update Client's Payment"}
          handleClose={close}
          className="sm:max-w-[MIN(90%,520px)]"
        >
          <form onSubmit={handleSubmit} className="flex flex-col flex-1 w-full gap-4 mt-auto">
            {isConfirmingPayment ? (
              <div className="flex flex-col flex-1 w-full gap-4 mt-auto">
                {displayData.length > 0 ? (
                  displayData.map((data, index) => (
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
                  ))
                ) : (
                  <div className="text-center text-grey-500 py-4">
                    {hasRealProperties ? "No payment data available" : "Property data not loaded correctly"}
                  </div>
                )}

                <Input
                  placeholder="₦ Enter amount"
                  containerStyle="mt-4 mb-10"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={isLoading}
                  required
                  type="number"
                  min="0"
                  step="0.01"
                />
              </div>
            ) : (
              propertyOptions.length > 0 ? (
                <SelectScrollable
                  placeholder="Select Property"
                  label="Property"
                  options={propertyOptions}
                  value={selectedSaleId || ""}
                  onValueChange={(value) => {
                    if (value) {
                      const params = new URLSearchParams(searchParams.toString());
                      params.set("property", value);
                      router.replace(`?${params.toString()}`);
                    }
                  }}
                />
              ) : (
                <div className="text-center text-grey-500 py-4">
                  No properties available
                </div>
              )
            )}

            <div className="flex mt-auto gap-4 justify-stretch w-full *:w-full">
              <Button
                type="button"
                onClick={close}
                variant="secondary"
                size="sm"
                className="px-8"
                disabled={isLoading}
              >
                Cancel
              </Button>

              {isConfirmingPayment ? (
                <SubmitButton 
                  size="sm" 
                  disabled={!amount || parseFloat(amount) <= 0 || isLoading || !hasRealProperties}
                  loading={isLoading}
                >
                  Confirm Payment
                </SubmitButton>
              ) : (
                <Button 
                  type="button"
                  onClick={() => {
                    if (!selectedSaleId) {
                      toast.error("Please select a property first");
                      return;
                    }
                    const params = new URLSearchParams(searchParams.toString());
                    params.set("confirm-payment", "true");
                    router.replace(`?${params.toString()}`);
                  }}
                  size="sm"
                  disabled={!selectedSaleId || propertyOptions.length === 0}
                >
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