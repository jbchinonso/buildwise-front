'use client';

import { Input, SubmitButton } from "@/components/ui";
import Modal from "@/components/ui/Modal";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ResetPasswordForm = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("clicked")
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


  const handleProceedToLogin= () => {
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

        <SubmitButton disabled={!newPassword || !confirmPassword} className="min-w-full mt-8 bg-[#020a08]" >
          Reset Password
        </SubmitButton>
      </form>

      {showSuccessModal && (
        <Modal onClose={() => setShowSuccessModal(false)} height="h-[280px]">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-semibold mb-2 mt-8">Successful</h2>
            <p className="text-gray-700 text-xs">Your password has been successfully reset.</p>
            <p className="text-gray-700 text-xs mb-4">Login to continue</p>
            <button
              onClick={handleProceedToLogin}
              className="mt-6 px-2 py-3 bg-[#024533] text-white rounded-4xl w-full"
            >
              Proceed to login
              
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ResetPasswordForm;
