"use client";

import { Input, SubmitButton, Modal, Button } from "@/components/ui";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Check } from "lucide-react";
import { useFormik } from "formik";
import { getError, resetPasswordSchema } from "@/lib/utils";
import toast from "react-hot-toast";
import { resetPassword } from "@/lib/services";

const ResetPasswordForm = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const params = useParams();
  const [error, setError] = useState("");

  const {
    values,
    handleChange,
    handleReset,
    handleBlur,
    errors,
    isValid,
    dirty,
    touched,
    resetForm,
  } = useFormik({
    initialValues: {
      token: params?.token || "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: () => {},
    validationSchema: resetPasswordSchema,
  });

  const handleResetPassword = async () => {
    try {
      await resetPassword({
        newPassword: values.newPassword,
        token: values.token as string,
      });
      resetForm();
      setShowSuccessModal(true);
    } catch (error) {
      setError(getError(error));
      toast.error(getError(error));
    }
  };

  return (
    <>
      <form
        className="flex flex-col w-full gap-4 justify-start"
        action={handleResetPassword}
        onReset={handleReset}
      >
        <p className="font-bold mx-auto my-4">Enter your new password</p>
        <Input
          type="password"
          name="newPassword"
          id="newPassword"
          label="New Password"
          placeholder="Enter new password"
          value={values.newPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            touched?.newPassword && errors?.newPassword
              ? errors.newPassword
              : ""
          }
        />

        <Input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            touched?.confirmPassword && errors?.confirmPassword
              ? errors.confirmPassword
              : ""
          }
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <SubmitButton
          disabled={!isValid || !dirty}
          className="min-w-full mt-8 bg-[#024533]"
        >
          Reset Password
        </SubmitButton>
      </form>

      {showSuccessModal && (
        <Modal
          className="md:max-w-[440px] max-w-[440px]"
          handleClose={() => setShowSuccessModal(false)}
        >
          <div className="flex flex-col items-center gap-4 justify-center">
            <div className="w-14 h-14 bg-green-100 flex flex-col justify-center items-center rounded-full">
              <Check className="w-8 h-8 text-white bg-[#70F41F] rounded-full p-2 mx-auto" />
            </div>
            <h2 className="text-2xl font-semibold">Successful</h2>
            <p className="text-gray-700 text-sm">
              Your password has been successfully reset.
            </p>
            <p className="text-gray-700 text-sm">Login to continue</p>
            <Button
              asLink
              href="/login"
              className="mt-6 px-2 py-3 bg-[#024533] text-white rounded-4xl w-full"
            >
              Proceed to login
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ResetPasswordForm;
