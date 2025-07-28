"use client";
import { Input, SubmitButton } from "@/components/ui";
import { createSale } from "@/lib/services";
import { getError } from "@/lib/utils";
import { useFormik } from "formik";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export const NewSaleForm = ({ property }: { property: string }) => {
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
    onSubmit: async () => {},
  });

  const submitForm = async () => {
    try {
      const result = await createSale(values);
      console.log({ result });
      toast.success("Sale recorded successfully");
      resetForm();
      redirect(`/properties/all/${property}`);
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <form
      action={submitForm}
      onReset={handleReset}
      className="w-full flex flex-wrap justify-start gap-4 gap-x-4 lg:gap-x-20"
    >
      <Input
        label="Agent"
        name="agentId"
        id="agentId"
        placeholder="Enter agent name"
        type="text"
        value={values.agentId}
        onChange={handleChange}
        onBlur={handleBlur}
        labelStyle="text-[#292A2C]"
        containerStyle="flex-[100%] md:flex-[45%] md:max-w-[MIN(100%,470px)]"
      />
      <Input
        label="Client"
        name="clientId"
        id="clientId"
        placeholder="Select client"
        type="text"
        value={values.clientId}
        onChange={handleChange}
        onBlur={handleBlur}
        labelStyle="text-[#292A2C]"
        containerStyle="flex-[100%] md:flex-[45%] md:max-w-[MIN(100%,470px)]"
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
        <SubmitButton disabled={!dirty || !isValid} size="sm" className="my-4">
          Sell Property
        </SubmitButton>
      </div>
    </form>
  );
};
