"use client";
import { Button, Input, Modal, SubmitButton, Toggle } from "@/components/ui";
import { useModal } from "@/lib/hooks";
import { useFormik } from "formik";
import { ChevronRight } from "lucide-react";
import { useEffect } from "react";

export const NotificationSettings = () => {
  const { closeModal, isModalOpen, toggleModal, modalRef } = useModal();

  const { dirty, values, setFieldValue, resetForm } = useFormik({
    initialValues: {
      sms: false,
      email: false,
    },
    onSubmit: () => {},
  });

  const onSubmit = () => {};

  useEffect(() => {
    // reset form on modal close
    if (!isModalOpen) {
      resetForm();
    }
  }, [isModalOpen]);

  return (
    <>
      <div
        onClick={toggleModal}
        tabIndex={0}
        className="flex-[45%] max-w-[MIN(100%,470px)]"
      >
        <Input
          label="Notification"
          defaultValue={"SMS, Email"}
          placeholder="SMS, Email"
          labelStyle="text-[#292A2C]"
          containerStyle="w-full"
          onClick={toggleModal}
          rightIcon={
            <ChevronRight
              className="size-4"
              color="currentColor"
              onClick={toggleModal}
            />
          }
        />
      </div>

      {isModalOpen && (
        <Modal
          heading="Set notifications"
          handleClose={closeModal}
          className="w-[400px]"
        >
          <form action={onSubmit} className="w-full flex-1 flex flex-col gap-4">
            <div
              // ref={modalRef}
              className="flex w-full p-4 py-3 border rounded-xl items-center justify-between"
            >
              <label
                className="Label"
                htmlFor="email"
                style={{ paddingRight: 15 }}
              >
                Email notification
              </label>

              <Toggle
                id="email"
                checked={values.email}
                onCheckedChange={(checked) => setFieldValue("email", checked)}
              />
            </div>

            <div className="flex w-full p-4 py-3 border rounded-xl items-center justify-between">
              <label
                className="Label"
                htmlFor="sms"
                style={{ paddingRight: 15 }}
              >
                SMS notification
              </label>

              <Toggle
                id="sms"
                checked={values.sms}
                onCheckedChange={(checked) => setFieldValue("sms", checked)}
              />
            </div>

            <div className="flex justify-end gap-2 mt-8">
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
                disabled={!dirty}
              >
                Save Changes
              </SubmitButton>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};
