"use client";
import { Input, RecoverPasswordModal, SubmitButton } from "@/components/ui";
import { signInValidationSchema } from "@/lib/utils";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export const SignInForm = ({ callbackUrl = "/" }: { callbackUrl?: string }) => {
  const searchParams = useSearchParams();
  const isModalOpen = searchParams.get("forgot-password");

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

  // const loginAction = async () => {
  //   toast.dismiss();
  //   try {
  //     if (!isValid) {
  //       handleSubmit();
  //       throw new Error("Fill all required fields!");
  //     }
  //     const credentials: SignInOptions = {
  //       ...values,
  //       callbackUrl,
  //       redirect: false,
  //     };

  //     const res = await signIn("credentials", credentials);

  //     if (res?.error) {
  //       throw new Error(res.error);
  //     }

  //     toast.success("Login successful, Redirecting...");
  //     return res?.url && router.replace(res.url);
  //   } catch (error: any) {
  //     toast.error(getError(error) || "Login failed! Please try again.");
  //   }
  // };

  return (
    <>
      <form
        // action={loginAction}
        className="flex flex-col my-auto w-full gap-4 justify-start"
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
          className="text-sm ml-auto"
        >
          Forgot password?
        </Link>

        <SubmitButton disabled={!isValid} className="min-w-full mt-8">
          Login
        </SubmitButton>
        <p className="mx-auto">
          Don't have an account?
          <Link
            className="text-primary font-bold hover:underline"
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
