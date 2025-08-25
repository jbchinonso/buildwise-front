"use client";
import { Button, Input, Modal, SubmitButton } from "@/components/ui";
import { useModal } from "@/lib/hooks";
import { changePasswordSchema } from "@/lib/utils";
import { useFormik } from "formik";
import { Edit2 } from "iconsax-react";

export const ChangePasswordModal = () => {
  const { closeModal, isModalOpen, toggleModal } = useModal();
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
      newPassword: "",
      confirmPassword: "",
      currentPassword: "",
    },
    onSubmit: () => {},
    validationSchema: changePasswordSchema,
  });

  const onSubmit = () => {};

  return (
    <>
      <Input
        label="Password"
        placeholder="*********"
        autoComplete="off"
        labelStyle="text-[#292A2C]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
        onClick={toggleModal}
        rightIcon={
          <Edit2
            color={"#023729"}
            size={14}
            onClick={toggleModal}
            className="cursor-pointer"
          />
        }
      />

      {isModalOpen && (
        <Modal
          heading="Change password"
          handleClose={closeModal}
          className=" w-[400px]"
        >
          <form action={onSubmit} className="w-full flex flex-col gap-4">
            <Input
              type="password"
              name="currentPassword"
              id="currentPassword"
              label="Current Password"
              placeholder="Enter your current password"
              value={values.currentPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched?.currentPassword && errors?.currentPassword
                  ? errors.currentPassword
                  : ""
              }
            />

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

            <div className="flex justify-end gap-2 mt-11">
              <Button
                type="button"
                variant="secondary"
                size="xs"
                onClick={closeModal}
              >
                Cancel
              </Button>
              <SubmitButton
                id="submit-recovery"
                type="submit"
                size="xs"
                disabled={!isValid || !dirty}
              >
                Save Password
              </SubmitButton>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};
