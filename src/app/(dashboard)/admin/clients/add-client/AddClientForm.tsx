"use client";
import { Input, SubmitButton } from "@/components/ui";
import { useFormik } from "formik";

export const AddClientForm = () => {
  const {
    handleSubmit,
    touched,
    errors,
    handleBlur,
    handleChange,
    values,
    isValid,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      state: "",
      lga: "",
      address: "",
    },
    // validationSchema: signInValidationSchema,
    onSubmit: async () => {},
  });

  return (
    <form className="w-full flex flex-wrap justify-between gap-4 gap-x-20">
      <Input
        label="First name"
        name="firstName"
        id="firstName"
        placeholder="John"
        type="text"
        readOnly
        labelStyle="text-[#292A2C]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />
      <Input
        label="Last name (surname)"
        name="lastName"
        id="lastName"
        placeholder="Doe"
        type="text"
        readOnly
        labelStyle="text-[#292A2C]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />

      <Input
        label="Phone number"
        name="phone_number"
        id="phone_number"
        type="text"
        placeholder="O70 **** ****"
        readOnly
        labelStyle="text-[#292A2C]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />
      <Input
        label="Email address"
        name="email"
        id="email"
        type="email"
        placeholder="Example@gmail.com"
        readOnly
        labelStyle="text-[#292A2C]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />
      <Input
        label="State"
        name="state"
        id="state"
        placeholder="Select state"
        type="text"
        readOnly
        labelStyle="text-[#292A2C]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />
      <Input
        label="LGA"
        name="lga"
        id="lga"
        placeholder="Select Local Government Area"
        type="text"
        readOnly
        labelStyle="text-[#292A2C]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />

      <Input
        label="Residential Address"
        name="upline"
        id="upline"
        type="text"
        placeholder="Enter client residential address"
        readOnly
        labelStyle="text-[#292A2C]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />
      <Input
        label="Agent"
        name="agent"
        id="agent"
        type="text"
        placeholder="Enter agent name"
        readOnly
        labelStyle="text-[#292A2C]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />

      <SubmitButton size="sm" disabled className="my-4">Save Client</SubmitButton>
    </form>
  );
};
