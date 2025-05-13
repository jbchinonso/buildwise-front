"use client";
import { Input, SubmitButton } from "@/components/ui";
import Modal from "@/components/ui/Modal";
import RecoverPasswordModal from "@/components/ui/RecoverPasswordModal";
import { signInValidationSchema, getError } from "@/lib/utils";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


export const SignInForm = ({ callbackUrl = "/" }: { callbackUrl?: string }) => {
  // const router = useRouter();
  const [showRecoverModal, setShowRecoverModal] = useState(false);
  const [recoverEmail, setRecoverEmail] = useState("");

  const router = useRouter();

  const handleRecover = () => {
    // if (!email) return; // leaving it for now to validate later
    router.push("/resetPassword");
    setShowRecoverModal(false);
    
  };


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
      className="flex flex-col w-full gap-4 justify-start"
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
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setShowRecoverModal(true);
          }}
          className="text-sm ml-auto"
        >
          Forgot password?
        </Link>

      <SubmitButton disabled={!isValid} className="min-w-full mt-8">
        Login
      </SubmitButton>
    </form>
    {showRecoverModal && (
        <Modal onClose={() => setShowRecoverModal(false)}  
        height="h-[340px] w-[400px]">
      
          <RecoverPasswordModal
            email={recoverEmail}
            setEmail={setRecoverEmail}
            onCancel={() => setShowRecoverModal(false)}
            onRecover={handleRecover}
          />
        </Modal>
      )}
    </>
  );
};
