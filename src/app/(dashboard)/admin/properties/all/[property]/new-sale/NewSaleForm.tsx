"use client";
import { Button, Input, SelectScrollable, SubmitButton } from "@/components/ui";
import { useModal } from "@/lib/hooks";
import { createSale } from "@/lib/services";
import { getError } from "@/lib/utils";
import { useFormik } from "formik";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { DashboardModal } from "@/components/dashboard";
import { IOption } from "@/lib/type";

export const NewSaleForm = ({
  property,
  agents,
  clients,
}: {
  property: string;
  agents?: IOption[];
  clients?: IOption[];
}) => {
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
      propertyId: property,
      agentId: "",
      clientId: "",
      plotNumber: "",
      unitNumber: "",
      plotSize: "",
      amountPaid: "",
      price: "",
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

  const handleSelect = (name: string, value: any) => {
    setFieldValue(name, value);
  };

  const submitForm = async () => {
    try {
      const result = await createSale(values);
      toast.success("Sale recorded successfully");
      resetForm();
      redirect(`/properties/all/${property}`);
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
          name="plotSize"
          id="plotSize"
          type="text"
          placeholder="1plot/ 420sqm"
          value={values.plotSize}
          onChange={handleChange}
          onBlur={handleBlur}
          labelStyle="text-[#292A2C]"
          containerStyle="flex-[100%] md:flex-[45%] md:max-w-[MIN(100%,470px)]"
        />
        <Input
          label="Plot number"
          name="plotNumber"
          id="plotNumber"
          type="text"
          placeholder="Enter plot number"
          value={values.plotNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          labelStyle="text-[#292A2C]"
          containerStyle="flex-[100%] md:flex-[45%] md:max-w-[MIN(100%,470px)]"
        />
        <Input
          label="Payment options"
          name="price"
          id="price"
          placeholder="Select payment options"
          type="text"
          value={values.price}
          onChange={handleChange}
          onBlur={handleBlur}
          labelStyle="text-[#292A2C]"
          containerStyle="flex-[100%] md:flex-[45%] md:max-w-[MIN(100%,470px)]"
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
                  {values.clientId}
                </p>
              </div>
              <div className="flex items-center justify-between w-full border-b">
                <p className="text-xs capitalize text-grey-400">Agent</p>
                <p className="text-sm font-bold text-grey-600">
                  {values.agentId}
                </p>
              </div>
              <div className="flex items-center justify-between w-full border-b">
                <p className="text-xs capitalize text-grey-400">Property</p>
                <p className="text-sm font-bold text-grey-600">
                  {values.propertyId}
                </p>
              </div>
              <div className="flex items-center justify-between w-full border-b">
                <p className="text-xs capitalize text-grey-400">Plot number</p>
                <p className="text-sm font-bold text-grey-600">
                  Plot {values.plotNumber}
                </p>
              </div>
              <div className="flex items-center justify-between w-full border-b">
                <p className="text-xs capitalize text-grey-400">Units</p>
                <p className="text-sm font-bold text-grey-600">
                  {values.unitNumber} plot(s)
                </p>
              </div>
              <div className="flex items-center justify-between w-full border-b">
                <p className="text-xs capitalize text-grey-400">Price</p>
                <p className="text-sm font-bold text-grey-600">
                  {values.unitNumber}
                </p>
              </div>
              <div className="flex items-center justify-between w-full border-b">
                <p className="text-xs capitalize text-grey-400">
                  Amount deposited
                </p>
                <p className="text-sm font-bold text-grey-600">
                  ₦{values.amountPaid}
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
                Sell Property
              </SubmitButton>
            </div>
          </form>
        </DashboardModal>
      )}
    </>
  );
};
