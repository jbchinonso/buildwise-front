"use client";
import { Button, Modal, SubmitButton } from "@/components/ui";

interface IConfirmModalProps {
  title?: string;
  message?: string;
  action: () => Promise<void>;
  onClose: () => void;
}

export const ConfirmActionModal = (props: IConfirmModalProps) => {
  const handleAction = async () => {
    await Promise.resolve(props?.action?.());
  };

  return (
    <Modal
      heading={props?.title || "Confirm action"}
      handleClose={props.onClose}
      className="w-[400px]"
    >
      <form action={handleAction} className="w-full flex flex-col gap-4">
        <div className="flex justify-between gap-2 mt-11">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={props.onClose}
            className="w-full"
          >
            Cancel
          </Button>
          <SubmitButton
            id="submit-recovery"
            type="submit"
            size="sm"
            className="flex-1"
          >
            Yes, Continue
          </SubmitButton>
        </div>
      </form>
    </Modal>
  );
};
