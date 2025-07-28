"use client";
import { Input, SubmitButton } from "@/components/ui";
import { addClient, addProperty } from "@/lib/services";
import { getError } from "@/lib/utils";
import { useFormik } from "formik";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export const AddPropertyForm = () => {
  const {
    handleBlur,
    handleChange,
    values,
    isValid,
    dirty,
    resetForm,
    handleReset,
  } = useFormik({
    initialValues: {
      name: "",
      state: "",
      lga: "",
      address: "",
      priceOptions: "",
      documents: "",
      totalUnits: "",
      availableUnits: "",
      saleCommissionRate: "",
    },
    // validationSchema: signInValidationSchema,
    onSubmit: async () => {},
  });



  const submitForm = async () => {
    try {
      const result = await addProperty(values);
      console.log({ result });
      toast.success("Property added successfully");
      resetForm();
      redirect(`/properties/all/${result?._id}`)
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <form
      action={submitForm}
      onReset={handleReset}
      className="w-full flex flex-wrap justify-between gap-4 gap-x-20"
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
      <Input
        label="State"
        name="state"
        id="state"
        placeholder="Select state"
        type="text"
        value={values.state}
        onChange={handleChange}
        onBlur={handleBlur}
        labelStyle="text-[#292A2C]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />

      <Input
        label="LGA"
        name="lga"
        id="lga"
        type="text"
        placeholder="Select local government"
        value={values.lga}
        onChange={handleChange}
        onBlur={handleBlur}
        labelStyle="text-[#292A2C]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
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
      <Input
        label="Price/Payment options"
        name="priceOptions"
        id="priceOptions"
        placeholder="Select payment options"
        type="text"
        value={values.priceOptions}
        onChange={handleChange}
        onBlur={handleBlur}
        labelStyle="text-[#292A2C]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />
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

      <div className="w-full flex">
        <SubmitButton disabled={!dirty || !isValid} size="sm" className="my-4">
          Save Client
        </SubmitButton>
      </div>
    </form>
  );
};
