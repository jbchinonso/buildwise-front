"use client";
import { Button, Modal, SubmitButton } from "@/components/ui";

interface IConfirmModalProps {
  title?: string;
  children?: string | React.ReactNode;
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
      <form
        action={handleAction}
        className="w-full flex-1 min-h-full flex flex-col gap-4"
      >
        <div className="mx-auto text-center">
          {props?.children || (
            <p>Are you sure you want to perform this action?</p>
          )}
        </div>

        <div className="flex justify-between gap-2 mt-auto">
          <Button
            type="button"
            variant="secondary"
            size="xs"
            onClick={props.onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <SubmitButton
            id="submit-recovery"
            type="submit"
            size="xs"
            className="flex-1 bg-[rgba(244,0,0,1)] border-[rgba(244,0,0,1)]"
          >
            Yes, {props?.title || "Continue"}
          </SubmitButton>
        </div>
      </form>
    </Modal>
  );
};
