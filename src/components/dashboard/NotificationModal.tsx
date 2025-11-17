"use client";
import { Button, Input, Modal, SubmitButton, Toggle } from "@/components/ui";
import { useModal } from "@/lib/hooks";
import { editNotificationSettings } from "@/lib/services";
import { getError } from "@/lib/utils";
import { useFormik } from "formik";
import { ChevronRight } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const NotificationSettings = () => {
  const { closeModal, isModalOpen, toggleModal } = useModal();

  const { dirty, values, setFieldValue, resetForm, handleReset } = useFormik({
    initialValues: {
      sms: false,
      email: false,
    },
    onSubmit: () => {},
  });

  const onSubmit = async () => {
    try {
      await editNotificationSettings(values);
      resetForm();
      toast.success("Notification settings updated successfully");
    } catch (error) {
      toast.error(getError(error));
    }
  };

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
          <form
            onReset={handleReset}
            action={onSubmit}
            className="w-full flex-1 flex flex-col gap-4"
          >
            <div className="flex w-full p-4 py-3 border rounded-xl items-center justify-between">
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
