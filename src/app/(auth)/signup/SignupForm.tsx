"use client";
import Link from "next/link";
import { Input, SubmitButton, Modal } from "@/components/ui";
import { getError, signInValidationSchema } from "@/lib/utils";
import { useFormik } from "formik";
import { useState } from "react";
import { Check } from "lucide-react";
import { useModal } from "@/lib/hooks";
// import toast from "react-hot-toast";
// import { SignInOptions, signIn } from "next-auth/react";

const SignupForm = () => {
  const { isModalOpen, toggleModal } = useModal();
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<"success" | "error">("success");

  const {
    handleSubmit,
    touched,
    errors,
    handleBlur,
    handleChange,
    values,
    isValid,
    validateForm,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      address: "",
      state: "",
      LGA: "",
    },
    validationSchema: signInValidationSchema,
    onSubmit: async () => {},
  });

  const handleSignupClick = (e: React.FormEvent) => {
    e.preventDefault();
    toggleModal();
  };

  // const loginAction = async () => {
  //   toast.dismiss();

  //   const errors = await validateForm();
  //   if (Object.keys(errors).length > 0) {
  //     toast.error("Fill all required fields!");
  //     return;
  //   }

  //   try {
  //     const credentials: SignInOptions = {
  //       ...values,
  //       redirect: false,
  //     };

  //     const res = await signIn("credentials", credentials);

  //     if (res?.error) {
  //       throw new Error(res.error);
  //     }

  //     setModalType("success");
  //     setModalMessage("Your account has been created successfully.");
  //     setShowModal(true);

  //     toast.success("Login successful, Redirecting...");
  //     // router.replace(res.url); // Optional
  //   } catch (error: any) {
  //     const errMsg = getError(error) || "Login failed! Please try again.";
  //     setModalType("error");
  //     setModalMessage(errMsg);
  //     setShowModal(true);
  //     toast.error(errMsg);
  //   }
  // };

  return (
    <>
      <form className="flex flex-col w-full gap-4" onSubmit={handleSubmit}>
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
        <Input
          type="text"
          name="state"
          id="state"
          label="State of residence"
          placeholder="Select state"
          value={values.state}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          error={touched.state && errors.state ? errors.state : ""}
        />
        <Input
          type="text"
          name="LGA"
          id="LGA"
          label="LGA"
          placeholder="Select local government "
          value={values.LGA}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          error={touched.LGA && errors.LGA ? errors.LGA : ""}
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

        <SubmitButton
          disabled={!isValid}
          className="min-w-full my-2"
          onClick={handleSignupClick}
        >
          Signup
        </SubmitButton>
        <p className="mx-auto">
          Already have an account?
          <Link
            className="text-primary font-bold hover:underline"
            href="/login"
          >
            {" "}
            Login{" "}
          </Link>
        </p>

        <p className="mt-3 ml-auto px-2 text-sm text-center">
          You are invited by Damilola Nkechi
        </p>
      </form>

      {isModalOpen && (
        <Modal handleClose={toggleModal} className="w-[350px]">
          <div className="flex flex-col w-full gap-4 flex-1 justify-between items-center">
            <div className="w-14 h-14 bg-green-100 flex flex-col justify-center items-center rounded-full">
              <Check className="w-8 h-8 text-white bg-[#70F41F] rounded-full p-2 mx-auto" />
            </div>

            <h2 className="text-xl font-bold ">Sign Up Successful</h2>
            <p className="text-gray-600 text-center">
              Use the link sent to {values?.email || "your email"} to complete
              your registration
            </p>
            <button
              onClick={toggleModal}
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
