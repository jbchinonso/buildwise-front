"use client"
import { Input, SubmitButton } from "@/components/ui";
import { signInValidationSchema, getError } from "@/lib/utils";
import { useFormik } from "formik";
import { Link } from "iconsax-react";
import { SignInOptions, signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export const SignInForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const router = useRouter();

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
      email: "",
      password: "",
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
        callbackUrl,
        redirect: false,
      };

      const res = await signIn("credentials", credentials);

      if (res?.error) {
        throw new Error(res.error);
      }

      toast.success("Login successful, Redirecting...");
      return res?.url && router.replace(res.url);
    } catch (error: any) {
      toast.error(getError(error) || "Login failed! Please try again.");
    }
  };

  return (
    <form
      // action={loginAction}
      className="flex flex-col  w-full max-w-[343px] mx-auto gap-4 mb-10"
    >
      <Input
        type="email"
        name="email"
        id="email"
        label="email"
        placeholder="Enter Email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.email && errors.email ? errors.email : ""}
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

      <Link href="/forgot-password" className="text-sm text-primarycolortadi6">
        Forgot password?
      </Link>

      <SubmitButton disabled={!isValid} className="min-w-full mt-8">
        Login
      </SubmitButton>
    </form>
  );
};
