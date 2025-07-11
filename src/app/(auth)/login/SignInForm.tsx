"use client";
import { Input, RecoverPasswordModal, SubmitButton } from "@/components/ui";
import { getError, signInValidationSchema } from "@/lib/utils";
import { useFormik } from "formik";
import { signIn, SignInOptions } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export const SignInForm = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const callbackUrl = "/dashboard";
  const router = useRouter();
  const isModalOpen = searchParams.get("forgot-password");

  const { touched, errors, handleBlur, handleChange, values, isValid } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: signInValidationSchema,
      onSubmit: async () => {},
    });

  const loginAction = async (formData: FormData) => {
    // event.preventDefault(); // Prevent the default form submission
    toast.dismiss();
    try {
      // const formData = new FormData(event.currentTarget);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      const credentials: SignInOptions = {
        email,
        password,
        callbackUrl,
        redirect: false,
      };

      const res = await signIn("credentials", credentials);

      if (res?.error) {
        throw new Error(res?.error);
      }

      toast.success("Login successful, Redirecting...");

      return router.replace(res?.url || "/dashboard");
    } catch (error: any) {
      const err = getError(error);
      console.error(err);
      toast.error(getError(error));
    }
  };

  return (
    <>
      <form
        action={loginAction}
        className="flex flex-col justify-start w-full gap-4 my-auto "
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

        <Link
          href="?forgot-password=true&search=yes"
          className="ml-auto text-sm"
        >
          Forgot password?
        </Link>

        <SubmitButton disabled={!isValid} className="min-w-full mt-8">
          Login
        </SubmitButton>
        <p className="mx-auto">
          Don't have an account?
          <Link
            className="font-bold text-primary hover:underline"
            href="/signup"
          >
            {" "}
            Sign up{" "}
          </Link>
        </p>
      </form>
      {isModalOpen && <RecoverPasswordModal />}
    </>
  );
};
