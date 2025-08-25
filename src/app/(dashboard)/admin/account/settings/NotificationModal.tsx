"use client";
import { Button, Input, Modal, SubmitButton } from "@/components/ui";
import { useModal } from "@/lib/hooks";
import { useFormik } from "formik";
import { ChevronRight } from "lucide-react";
// import { Switch } from "radix-ui";

export const NotificationModal = () => {
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
      sms: "",
      email: "",
    },
    onSubmit: () => {},
  });

  const onSubmit = () => {};
  return (
    <>
      <Input
        label="Notification"
        name="phone"
        id="phone"
        type="text"
        defaultValue={"SMS, Email"}
        placeholder="SMS, Email"
        labelStyle="text-[#292A2C]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
        onClick={toggleModal}
        rightIcon={
          <ChevronRight
            className="size-4"
            color="currentColor"
            onClick={toggleModal}
          />
        }
      />

      {isModalOpen && (
        <Modal
          heading="Set notifications"
          handleClose={closeModal}
          className=" w-[400px]"
        >
          <form action={onSubmit} className="w-full flex-1 flex flex-col gap-4">
            <div style={{ display: "flex", alignItems: "center" }}>
              <label
                className="Label"
                htmlFor="airplane-mode"
                style={{ paddingRight: 15 }}
              >
                Airplane mode
              </label>
              {/* <Switch.Root className="SwitchRoot" id="airplane-mode">
                <Switch.Thumb className="SwitchThumb" />
              </Switch.Root> */}
            </div>
            <div className="flex justify-end gap-2 mt-auto">
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
