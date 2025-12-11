"use client";

import { Input } from "@/components/ui";
import { copyTextToClipboard } from "@/lib/utils";
import { Copy } from "iconsax-react";
import { useState } from "react";

export const InviteLink = () => {
  const [inviteLink] = useState(
    `${process.env.VERCEL_URL || (window && window?.origin)}/signup?referral=`
  );

  return (
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
  );
};

