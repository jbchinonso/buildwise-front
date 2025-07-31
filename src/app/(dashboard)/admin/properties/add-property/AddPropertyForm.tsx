"use client";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { useMemo } from "react";
import { useFormik } from "formik";
import { Input, SelectScrollable, SubmitButton } from "@/components/ui";
import { useModal } from "@/lib/hooks";
import { addProperty } from "@/lib/services";
import { IState } from "@/lib/type";
import { getError } from "@/lib/utils";
import { PaymentOptionsModal } from "../ui";

export const AddPropertyForm = ({ states = [] }: { states: IState[] }) => {
  const {
    handleBlur,
    handleChange,
    values,
    isValid,
    dirty,
    resetForm,
    handleReset,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: "",
      state: "",
      lga: "",
      address: "",
      priceOptions: {
        instantPrice: "",
        plans: [],
      },
      documents: "",
      totalUnits: "",
      availableUnits: "",
      saleCommissionRate: "",
    },
    // validationSchema: signInValidationSchema,
    onSubmit: async () => {},
  });

  const handleSelect = (name: string, value: any) => {
    setFieldValue(name, value);
  };

  const {
    openModal: openPaymentOptions,
    closeModal: closePaymentOptions,
    isModalOpen: isPaymentOptionsModalOpen,
  } = useModal();

  const lgas = useMemo(() => {
    const selectedState = states.find((state) => state.name === values.state);

    return (
      selectedState?.lgas.map((lga) => ({
        label: lga,
        value: lga,
      })) ?? []
    );
  }, [values.state]);
  const submitForm = async () => {
    try {
      const result = await addProperty(values);
      toast.success("New property successfully added");
      resetForm();
      redirect(`/properties/all/${result?._id}`);
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <form
      action={submitForm}
      onReset={handleReset}
      className="w-full flex flex-wrap supports-[grid]:grid sm:grid-cols-2 justify-between gap-4 gap-x-20"
    >
      <Input
        label="Property name"
        name="name"
        id="name"
        placeholder="Enter property name"
        type="text"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        labelStyle="text-[#292A2C]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />

      <SelectScrollable
        label="State"
        name="state"
        // id="state"
        placeholder="Select state"
        value={values.state}
        onChange={(value) => handleSelect("state", value)}
        options={states.map((state) => ({
          label: state.name,
          value: state.name,
        }))}
        labelStyle="text-[#292A2C]"
        className="flex-[45%] max-w-[MIN(100%,470px)]"
      />
      <SelectScrollable
        label="LGA"
        name="lga"
        options={lgas}
        value={values.lga}
        onChange={(value) => handleSelect("lga", value)}
        disabled={!values.state}
        placeholder="Select local government"
        labelStyle="text-[#292A2C]"
        className="flex-[45%] max-w-[MIN(100%,470px)]"
      />
      <Input
        label="Address"
        name="address"
        id="address"
        type="text"
        placeholder="Enter property address"
        value={values.address}
        onChange={handleChange}
        onBlur={handleBlur}
        labelStyle="text-[#292A2C]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />
      <div>
        <Input
          label="Price/Payment options"
          name="priceOptions"
          id="priceOptions"
          placeholder="Select payment options"
          type="text"
          autoComplete="off"
          value={values.priceOptions?.instantPrice + " " + ""}
          onClick={openPaymentOptions}
          onChange={handleChange}
          onBlur={handleBlur}
          labelStyle="text-[#292A2C]"
          containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
        />

        {isPaymentOptionsModalOpen && (
          <PaymentOptionsModal
            onClose={closePaymentOptions}
            options={values.priceOptions}
            onSelect={(value) => setFieldValue("priceOptions", value)}
          />
        )}
      </div>
      <Input
        label="Documents"
        name="documents"
        id="documents"
        placeholder="Select available documents"
        type="text"
        value={values.documents}
        onChange={handleChange}
        onBlur={handleBlur}
        labelStyle="text-[#292A2C]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />
      <Input
        label="Total Units"
        name="totalUnits"
        id="totalUnits"
        type="text"
        placeholder="Enter number of plots available"
        value={values.totalUnits}
        onChange={handleChange}
        onBlur={handleBlur}
        labelStyle="text-[#292A2C]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />
      <Input
        label="Available Units"
        name="availableUnits"
        id="availableUnits"
        type="text"
        placeholder="Enter number of plots available"
        value={values.availableUnits}
        onChange={handleChange}
        onBlur={handleBlur}
        labelStyle="text-[#292A2C]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />
      <Input
        label="Sales commission rate"
        name="saleCommissionRate"
        id="saleCommissionRate"
        type="text"
        placeholder="10% of property value"
        value={values.saleCommissionRate}
        onChange={handleChange}
        onBlur={handleBlur}
        labelStyle="text-[#292A2C]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />

      <div className="w-full flex col-span-2">
        <SubmitButton disabled={!dirty || !isValid} size="sm" className="my-4">
          Save Property
        </SubmitButton>
      </div>
    </form>
  );
};
