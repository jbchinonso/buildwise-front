"use client";
import { Input, SelectScrollable, SubmitButton } from "@/components/ui";
import { addClient } from "@/lib/services";
import { IOption, IState } from "@/lib/type";
import { getError, getFormikError } from "@/lib/utils";
import { useFormik } from "formik";
import { useMemo } from "react";
import toast from "react-hot-toast";

export const AddClientForm = ({
  agents = [],
  states = [],
}: {
  states: IState[];
  agents: IOption[];
}) => {
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
    setFieldValue,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      state: "",
      lga: "",
      residentialAddress: "",
      agentId: '',
    },
    // validationSchema: signInValidationSchema,
    onSubmit: async () => {},
  });

  const lgas = useMemo(() => {
    const selectedState = states.find((state) => state.name === values.state);

    return (
      selectedState?.lgas.map((lga) => ({
        label: lga,
        value: lga,
      })) ?? []
    );
  }, [values.state]);

  const handleSelect = (name: string, value: any) => {
    setFieldValue(name, value);
  };

  const submitForm = async () => {
    try {
      await addClient(values);
      toast.success("Client added successfully");
      resetForm();
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
        error={getFormikError(touched?.state, errors?.state)}
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
        error={getFormikError(touched?.lga, errors?.lga)}
        className="flex-[45%] max-w-[MIN(100%,470px)]"
      />
      <Input
        label="Residential Address"
        name="residentialAddress"
        id="residentialAddress"
        type="text"
        placeholder="Enter property address"
        error={getFormikError(
          touched?.residentialAddress,
          errors?.residentialAddress
        )}
        value={values.residentialAddress}
        onChange={handleChange}
        onBlur={handleBlur}
        labelStyle="text-[#292A2C]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />

      <SelectScrollable
        label="Agent"
        name="agentId"
        placeholder="Select agent"
        value={values.agentId}
        onChange={(v) => handleSelect("agentId", v)}
        options={agents ?? []}
        labelStyle="text-[#292A2C]"
        className="flex-[45%] max-w-[MIN(100%,470px)]"
      />

      <SubmitButton disabled={!dirty || !isValid} size="sm" className="my-4">
        Save Client
      </SubmitButton>
    </form>
  );
};
