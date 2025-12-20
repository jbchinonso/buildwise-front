"use client";

import { Button, Input } from "@/components/ui";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { ChangePasswordModal } from "./ChangePasswordModal";
import { copyTextToClipboard } from "@/lib/utils";
import { Copy } from "iconsax-react";
import { NotificationSettings } from "@/components/dashboard";

export const SettingsForm = () => {
  const {data: session} = useSession()
  console.log({session})
  // const [isEditing, setIsEditing] = useState(false);

  const [inviteLink] = useState(
    `${process.env.VERCEL_URL || (window && window?.origin)}/signup?referral=`
  );
  return (
    <>
      <div className="min-w-full flex supports-[grid]:grid grid-cols-1 md:grid-cols-2 flex-wrap justify-between gap-4 gap-x-20">
        <ChangePasswordModal />
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
          // onClick={() => setIsEditing(false)}
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
