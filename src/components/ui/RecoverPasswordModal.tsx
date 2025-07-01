"use client";
import { useCallback, useState } from "react";
import { Button, Input, Modal, SubmitButton } from "@/components/ui";
import { useRouter } from "next/navigation";
import { forgotPassword } from "@/lib/services";
import toast from "react-hot-toast";
import { getError } from "@/lib/utils";

export const RecoverPasswordModal = () => {
  const [email, setEmail] = useState("");

  const router = useRouter();
  const closeModal = useCallback(() => router.replace("?"), []);

  const handleRecover = async () => {
    if (!email) return; // leaving it for now to validate later
    try {
      const response = await forgotPassword({
        email,
      });
      toast.success(
        response?.message ||
          "If an account exists, you will receive a reset email"
      );
      setEmail("");
      return router.refresh();
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <Modal
      heading="Recover Password"
      handleClose={closeModal}
      className=" w-[400px]"
    >
      <form action={handleRecover} className="w-full flex flex-col gap-4">
        <div className="text-left ">
          <p className="text-sm text-gray-600 mb-4">
            Enter your email to receive a link for resetting your password.
          </p>
        </div>

        <div className="">
          <Input
            type="email"
            name="recoverEmail"
            placeholder="Enter your email"
            label="Email address"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-xs"
          />
        </div>

        <div className="flex justify-between gap-2 mt-11">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={closeModal}
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
            Recover Password
          </SubmitButton>
        </div>
      </form>
    </Modal>
  );
};
