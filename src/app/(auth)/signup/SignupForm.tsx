"use client";
import Link from "next/link";
import { Input, SubmitButton } from "@/components/ui";
import { getError, signInValidationSchema } from "@/lib/utils";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { SignInOptions, signIn } from "next-auth/react";

const SignupForm = () => {
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

  const loginAction = async () => {
    toast.dismiss();
    try {
      if (!isValid) {
        handleSubmit();
        throw new Error("Fill all required fields!");
      }
      const credentials: SignInOptions = {
        ...values,
        //  callbackUrl,
        redirect: false,
      };

      const res = await signIn("credentials", credentials);

      if (res?.error) {
        throw new Error(res.error);
      }

      toast.success("Login successful, Redirecting...");
      //  return res?.url && router.replace(res.url);
    } catch (error: any) {
      toast.error(getError(error) || "Login failed! Please try again.");
    }
  };
  return (
    <form
      // action={loginAction}
      className="flex flex-col w-full gap-4"
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
      <div className="my-1 ml-auto">
        <p className="px-2 text-sm text-center">
          You are Invited by Damilola Nkechi
        </p>
      </div>

      <SubmitButton disabled={!isValid} className="min-w-full my-2">
        Signup
      </SubmitButton>
    </form>
  );
};

export default SignupForm;
