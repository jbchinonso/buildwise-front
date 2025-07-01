"use client";

import { Input, SubmitButton, Modal, Button } from "@/components/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check } from "lucide-react";

const ResetPasswordForm = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("clicked");
    if (!newPassword || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    setShowSuccessModal(true);
  };

  const handleProceedToLogin = () => {
    // leaving it for now to validate later
    router.push("/login");
    setShowSuccessModal(false);
  };

  return (
    <>
      <form
        className="flex flex-col w-full gap-4 justify-start"
        onSubmit={handleResetPassword}
      >
        <Input
          type="password"
          name="newPassword"
          id="newPassword"
          label="New Password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <Input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <SubmitButton
          disabled={!newPassword || !confirmPassword}
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
