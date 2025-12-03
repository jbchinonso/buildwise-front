"use client";
import { useModal } from "@/lib/hooks";
import { Button } from "../ui";
import { ConfirmActionModal } from "../ui/ConfirmationModal";
import { ITitanProfile } from "@/lib/type";
import { getError } from "@/lib/utils";
import toast from "react-hot-toast";
import { deactivateTitan } from "@/lib/services";

export const DeactivateTitanAccount = ({
  titan,
}: {
  titan: Partial<ITitanProfile>;
}) => {
  const { toggleModal, isModalOpen } = useModal();

  const deactivateTitanAction = async () => {
    toast.dismiss();
    try {
      await deactivateTitan(titan?._id as string);
      toast.success("Titan Deactivated successfully");
    } catch (error) {
      toast.error(getError(error));
    }
  };
  return (
    <>
      <div className="w-full flex py-2 my-2">
        <Button
          variant="secondary"
          size="sm"
          type="button"
          onClick={toggleModal}
          className="text-error ml-auto"
        >{`Deactivate Agent's Account`}</Button>
      </div>

      {isModalOpen && (
        <ConfirmActionModal
          title="Deactivate Titan Account?"
          onClose={toggleModal}
          action={deactivateTitanAction}
        />
      )}
    </>
  );
};
