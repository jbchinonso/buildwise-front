"use client";
import Link from "next/link";
import { Input, SubmitButton, Modal, SelectScrollable } from "@/components/ui";
import { getError, getFormikError, signUpValidationSchema } from "@/lib/utils";
import { useFormik } from "formik";
import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { useModal } from "@/lib/hooks";
import toast from "react-hot-toast";
import { signUp } from "@/lib/services";
import { IState } from "@/lib/type";

const SignupForm = ({ states }: { states: IState[] }) => {
  const { isModalOpen, toggleModal } = useModal();
  const [email, setEmail] = useState("");

  const {
    touched,
    errors,
    handleBlur,
    handleChange,
    values,
    isValid,
    resetForm,
    handleReset,
    setFieldValue,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      address: "",
      state: "",
      lga: "",
      password: "",
      referralCode: "",
    },
    validationSchema: signUpValidationSchema,
    onSubmit: async () => {},
  });

  const onSignup = async () => {
    toast.dismiss();
    try {
      await signUp(values);

      toggleModal();
      setEmail(values.email);
      resetForm();
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const lgas = useMemo(() => {
    const selectedState = states.find((state) => state.name === values.state);

    return (
      selectedState?.lgas.map((lga) => ({
        label: lga,
        value: lga,
      })) ?? []
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.state]);

  const handleSelect = (name: string, value: any) => {
    setFieldValue(name, value);
  };

  return (
    <>
      <form
        onReset={handleReset}
        className="flex flex-col w-full gap-4"
        action={onSignup}
      >
        <Input
          type="text"
          name="firstName"
          id="firstName"
          label="First name"
          placeholder="John"
          value={values.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.firstName && errors.firstName ? errors.firstName : ""}
        />
        <Input
          type="text"
          name="lastName"
          id="lastName"
          label="Lastname (surname)"
          placeholder="Doe"
          value={values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.lastName && errors.lastName ? errors.lastName : ""}
        />
        <Input
          type="tel"
          name="phone"
          id="phone"
          label="Phone number"
          placeholder="090 **** ****"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.phone && errors.phone ? errors.phone : ""}
        />
        <Input
          type="email"
          name="email"
          id="email"
          label="Email address"
          placeholder="Example@gmail.com"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          error={touched.email && errors.email ? errors.email : ""}
        />
        <Input
          type="text"
          name="address"
          id="address"
          label="Residential address"
          placeholder="Enter your address"
          value={values.address}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          error={touched.address && errors.address ? errors.address : ""}
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
         
        />

        <Input
          type="password"
          name="password"
          id="password"
          label="Password"
          placeholder="Enter Password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password && errors.password ? errors.password : ""}
        />
        <Input
          type="text"
          name="referralCode"
          id="referralCode"
          label="Referral Code"
          placeholder="Enter referral Code"
          value={values.referralCode}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          error={getFormikError(touched?.referralCode, errors?.referralCode)}
        />

        <SubmitButton disabled={!isValid} className="min-w-full my-2">
          Signup
        </SubmitButton>
        <p className="mx-auto">
          Already have an account?
          <Link
            className="font-bold text-primary hover:underline"
            href="/login"
          >
            {" "}
            Login{" "}
          </Link>
        </p>

        {/* <p className="px-2 mt-3 ml-auto text-sm text-center">
          You are invited by Damilola Nkechi
        </p> */}
      </form>

      {isModalOpen && (
        <Modal
          handleClose={() => {
            toggleModal();
            setEmail("");
          }}
          className="w-[350px]"
        >
          <div className="flex flex-col items-center justify-between flex-1 w-full gap-4">
            <div className="flex flex-col items-center justify-center bg-green-100 rounded-full w-14 h-14">
              <Check className="w-8 h-8 text-white bg-[#70F41F] rounded-full p-2 mx-auto" />
            </div>

            <h2 className="text-xl font-bold ">Sign Up Successful</h2>
            <p className="text-center text-gray-600">
              Use the link sent to {email || "your email"} to complete your
              registration
            </p>
            <button
              onClick={() => {
                toggleModal();
                setEmail("");
              }}
              className="mt-6 px-4 py-2 w-full  bg-[#024533] text-white rounded-4xl"
            >
              Done
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default SignupForm;
