"use client";

import { Button, Input } from "@/components/ui";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { ChangePasswordModal } from "./ChangePasswordModal";
import { copyTextToClipboard } from "@/lib/utils";
import { Copy } from "iconsax-react";
import { BankModal } from "./BankModal";
import { NotificationSettings } from "@/components/dashboard";

export const SettingsForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [inviteLink, setInviteLink] = useState(
    `${process.env.VERCEL_URL||window?.origin}/signup?referral=`
  );
  const [bankAccount, setBankAccount] = useState({
    bankName: "GTB",
    accountName: "",
    accountNumber: "0494 3939 33",
  });

  return (
    <>
      <div className="w-full flex supports-[grid]:grid md:grid-cols-2 flex-wrap justify-between gap-4 gap-x-20">
        <ChangePasswordModal />
        <BankModal {...bankAccount} />
        <Input
          label="Invitation link"
          type="text"
          defaultValue={inviteLink}
          readOnly
          labelStyle="text-[#292A2C]"
          containerStyle="flex-[45%] max-w-[MIN(100%,470px)] cursor-copy *:cursor-copy"
          inputStyle="cursor-copy"
          onClick={() => copyTextToClipboard(inviteLink)}
          rightIcon={
            <Copy
              size={14}
              color={"#023729"}
              className="cursor-copy"
              onClick={() => copyTextToClipboard(inviteLink)}
            />
          }
        />
        <NotificationSettings />
      </div>
      <div className="w-full flex my-10 gap-4 items-center">
        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={() => setIsEditing(false)}
        >
          Deactivate Account
        </Button>

        <Button type="button" size="sm" onClick={() => signOut()}>
          Sign out
        </Button>
      </div>
    </>
  );
};
