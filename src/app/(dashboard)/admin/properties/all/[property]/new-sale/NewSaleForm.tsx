"use client";
import { Button, Input, SelectScrollable, SubmitButton } from "@/components/ui";
import { useModal } from "@/lib/hooks";
import { createSale } from "@/lib/services";
import { getError, toAmount } from "@/lib/utils";
import { useFormik } from "formik";
import { redirect, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { DashboardModal } from "@/components/dashboard";
import { IOption, IPaymentOptions, IProperty } from "@/lib/type";
import { useMemo } from "react";

export const NewSaleForm = ({
  property,
  agents,
  clients,
}: {
  property: Pick<IProperty, "_id" | "name" | "priceOptions" | "price">;
  agents?: IOption[];
  clients?: IOption[];
}) => {
  const router = useRouter()
  const { isModalOpen, closeModal, openModal } = useModal();
  const {
    handleBlur,
    handleChange,
    values,
    isValid,
    dirty,
    resetForm,
    handleReset,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      propertyId: property?._id,
      agentId: "",
      agentName: "",
      clientId: "",
      clientName: "",
      plotNumber: "",
      unitNumber: "",
      plotSize: "",
      amountPaid: "",
      priceOptions: "",
      paymentDate: "",
      instalmentDuration: "",
      paymentPlan: "",

      // totalUnits: "",
      // availableUnits: "",
      // saleCommissionRate: "",
    },
    // validationSchema: signInValidationSchema,
    onSubmit: () => {
      openModal();
    },
  });

  const priceOptions = useMemo(() => {
    const options = property?.priceOptions as IPaymentOptions;
    const plans = options?.plans || [];
    return [
      {
        label: `Full payment (${toAmount(options?.instantPrice)})`,
        value: `Full payment (${toAmount(options?.instantPrice)})`,
        data: {
          price: options?.instantPrice,
          instalmentDuration: "0 months",
          paymentPlan: "Full payment",
        },
      },
      ...plans?.map((plan) => ({
        label: `${plan?.duration} (${toAmount(plan?.price)})`,
        value: `${plan?.duration} (${toAmount(plan?.price)})`,
        data: {
          price: plan?.price,
          instalmentDuration: plan?.duration,
          paymentPlan: plan?.duration,
        },
      })),
    ];
  }, [property?.priceOptions]);

  const payload = useMemo(() => {
    const pricePlan = priceOptions?.find(
      (plan) => plan.value === values?.priceOptions
    )?.data;
    return {
      propertyId: values?.propertyId,
      agentId: values?.agentId,
      clientId: values?.clientId,
      unitNumber: values?.unitNumber,
      amountPaid: Number(values?.amountPaid || 0),
      paymentDate: values?.paymentDate,
      plotNumber: Number(values?.plotNumber || 0),
      plotSize: values?.plotSize || 0,
      ...pricePlan,
    };
  }, [values]);

  const handleSelect = (name: string, value: any) => {
    setFieldValue(name, value);
    if (name === "clientId") {
      const client = clients?.find((v) => v?.value === value);
      setFieldValue("clientName", client?.label);
    }
    if (name === "agentId") {
      const agent = agents?.find((v) => v?.value === value);
      setFieldValue("agentName", agent?.label);
    }
  };

  const submitForm = async () => {
    try {
      await createSale(payload);
      router.replace(`/admin/properties/all/${property?._id||''}`);
      toast.success("Sale recorded successfully");
      resetForm();
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        onReset={handleReset}
        className="w-full flex flex-wrap justify-start gap-4 gap-x-4 lg:gap-x-20"
      >
        <SelectScrollable
          label="Agent"
          name="agentId"
          placeholder="Select agent"
          value={values.agentId}
          onChange={(v) => handleSelect("agentId", v)}
          options={agents ?? []}
          labelStyle="text-[#292A2C]"
          className="flex-[100%] md:flex-[45%] md:max-w-[MIN(100%,470px)]"
        />
        <SelectScrollable
          label="Client"
          name="clientId"
          placeholder="Select client"
          value={values.clientId}
          onChange={(v) => handleSelect("clientId", v)}
          options={clients ?? []}
          labelStyle="text-[#292A2C]"
          className="flex-[100%] md:flex-[45%] md:max-w-[MIN(100%,470px)]"
        />
        <Input
          label="Property units/ plot"
          name="unitNumber"
          id="unitNumber"
          type="text"
          placeholder="e.g 1plot/420sqm"
          value={values.unitNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          labelStyle="text-[#292A2C]"
          containerStyle="flex-[100%] md:flex-[45%] md:max-w-[MIN(100%,470px)]"
        />
        <Input
          label="Plot number"
          name="plotNumber"
          id="plotNumber"
          type="tel"
          placeholder="Enter plot number"
          value={values.plotNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          labelStyle="text-[#292A2C]"
          containerStyle="flex-[100%] md:flex-[45%] md:max-w-[MIN(100%,470px)]"
        />
        <Input
          label="Plot Size"
          name="plotSize"
          id="plotSize"
          type="text"
          placeholder="e.g 420sqm"
          value={values.plotSize}
          onChange={handleChange}
          onBlur={handleBlur}
          labelStyle="text-[#292A2C]"
          containerStyle="flex-[100%] md:flex-[45%] md:max-w-[MIN(100%,470px)]"
        />
        <SelectScrollable
          label="Payment options"
          name="priceOptions"
          placeholder="Select payment options"
          value={values.priceOptions}
          onChange={(v) => handleSelect("priceOptions", v)}
          options={priceOptions ?? []}
          labelStyle="text-[#292A2C]"
          className="flex-[100%] md:flex-[45%] md:max-w-[MIN(100%,470px)]"
        />

        <Input
          label="Amount paid"
          name="amountPaid"
          id="amountPaid"
          placeholder="Enter amount paid"
          type="text"
          value={values.amountPaid}
          onChange={handleChange}
          onBlur={handleBlur}
          labelStyle="text-[#292A2C]"
          containerStyle="flex-[100%] md:flex-[45%] md:max-w-[MIN(100%,470px)]"
        />

        <Input
          label="Payment Date"
          name="paymentDate"
          id="paymentDate"
          type="date"
          // placeholder="Enter number of plots available"
          value={values.paymentDate}
          onChange={handleChange}
          onBlur={handleBlur}
          max={new Date().toISOString().split("T")[0]}
          labelStyle="text-[#292A2C]"
          containerStyle="flex-[100%] md:flex-[45%] md:max-w-[MIN(100%,470px)]"
        />

        <div className="w-full flex">
          <SubmitButton
            disabled={!dirty || !isValid}
            size="sm"
            className="my-4"
          >
            Sell Property
          </SubmitButton>
        </div>
      </form>

      {isModalOpen && (
        <DashboardModal
          heading={"Sales Overview"}
          handleClose={closeModal}
          className="sm:max-w-[MIN(90%,520px)]"
        >
          <form
            action={submitForm}
            onReset={handleReset}
            className="flex flex-col flex-1 w-full gap-4 mt-auto"
          >
            <div className="flex flex-col flex-1 w-full gap-6 my-6 px-6 ">
              <div className="flex items-center justify-between w-full border-b">
                <p className="text-xs capitalize text-grey-400">Client</p>
                <p className="text-sm font-bold text-grey-600">
                  {values.clientName}
                </p>
              </div>
              <div className="flex items-center justify-between w-full border-b">
                <p className="text-xs capitalize text-grey-400">Agent</p>
                <p className="text-sm font-bold text-grey-600">
                  {values.agentName}
                </p>
              </div>
              <div className="flex items-center justify-between w-full border-b">
                <p className="text-xs capitalize text-grey-400">Property</p>
                <p className="text-sm font-bold text-grey-600">
                  {property?.name}
                </p>
              </div>
              <div className="flex items-center justify-between w-full border-b">
                <p className="text-xs capitalize text-grey-400">Plot number</p>
                <p className="text-sm font-bold text-grey-600">
                  {values.plotNumber ? `Plot ${values.plotNumber}` : ""}
                </p>
              </div>
              <div className="flex items-center justify-between w-full border-b">
                <p className="text-xs capitalize text-grey-400">Plot Size</p>
                <p className="text-sm font-bold text-grey-600">
                  {values.plotSize}
                </p>
              </div>
              <div className="flex items-center justify-between w-full border-b">
                <p className="text-xs capitalize text-grey-400">Units</p>
                <p className="text-sm font-bold text-grey-600">
                  {values.unitNumber}
                </p>
              </div>
              <div className="flex items-center justify-between w-full border-b">
                <p className="text-xs capitalize text-grey-400">Price</p>
                <p className="text-sm font-bold text-grey-600">
                  {values.priceOptions}
                </p>
              </div>
              <div className="flex items-center justify-between w-full border-b">
                <p className="text-xs capitalize text-grey-400">
                  Amount deposited
                </p>
                <p className="text-sm font-bold text-grey-600">
                  {toAmount(values.amountPaid)}
                </p>
              </div>
            </div>

            <div className="flex mt-auto px-6 gap-4 justify-stretch w-full  *:w-full">
              <Button
                onClick={closeModal}
                variant="secondary"
                size="sm"
                className="my-4"
              >
                Cancel
              </Button>

              <SubmitButton
                disabled={!dirty || !isValid}
                size="sm"
                className="my-4"
              >
                Confirm sales
              </SubmitButton>
            </div>
          </form>
        </DashboardModal>
      )}
    </>
  );
};
