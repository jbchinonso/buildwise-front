"use client";
import { Input, SubmitButton } from "@/components/ui";
import { addClient } from "@/lib/services";
import { getError } from "@/lib/utils";
import { useFormik } from "formik";
import toast from "react-hot-toast";

export const AddClientForm = () => {
  const {
    handleSubmit,
    touched,
    errors,
    handleBlur,
    handleChange,
    values,
    isValid,
    dirty,
    resetForm,
    handleReset,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      state: "",
      lga: "",
      residentialAddress: "",
      agentId: "68206f473512a94aa6ca0fab",
    },
    // validationSchema: signInValidationSchema,
    onSubmit: async () => {},
  });

  const submitForm = async () => {
    try {
      const result = await addClient(values);
      console.log({result})
      toast.success("Client added successfully");
      resetForm()
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
        label="First name"
        name="firstName"
        id="firstName"
        placeholder="John"
        type="text"
        value={values.firstName}
        onChange={handleChange}
        onBlur={handleBlur}
        labelStyle="text-[#292A2C]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />
      <Input
        label="Last name (surname)"
        name="lastName"
        id="lastName"
        placeholder="Doe"
        type="text"
        value={values.lastName}
        onChange={handleChange}
        onBlur={handleBlur}
        labelStyle="text-[#292A2C]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />

      <Input
        label="Phone number"
        name="phoneNumber"
        id="phoneNumber"
        type="text"
        placeholder="O70 **** ****"
        value={values.phoneNumber}
        onChange={handleChange}
        onBlur={handleBlur}
        labelStyle="text-[#292A2C]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />
      <Input
        label="Email address"
        name="email"
        id="email"
        type="email"
        placeholder="example@gmail.com"
        value={values.email}
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
        placeholder="Select Local Government Area"
        type="text"
        value={values.lga}
        onChange={handleChange}
        onBlur={handleBlur}
        labelStyle="text-[#292A2C]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />

      <Input
        label="Residential Address"
        name="residentialAddress"
        id="residentialAddress"
        type="text"
        placeholder="Enter client residential address"
        value={values.residentialAddress}
        onChange={handleChange}
        onBlur={handleBlur}
        labelStyle="text-[#292A2C]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />
      <Input
        label="Agent"
        name="agentId"
        id="agentId"
        type="text"
        placeholder="Enter agent name"
        labelStyle="text-[#292A2C]"
        value={values.agentId}
        onChange={handleChange}
        onBlur={handleBlur}
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />

      <SubmitButton disabled={!dirty || !isValid} size="sm" className="my-4">
        Save Client
      </SubmitButton>
    </form>
  );
};
