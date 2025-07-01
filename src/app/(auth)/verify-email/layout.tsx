import { Logo } from "@/components/ui";
import React from "react";

const VerifyAccount = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-col gap-8 flex justify-center overflow-y-auto items-center px-8 w-full max-w-[MIN(100%,568px)] self-center mx-auto">
      <div className="flex flex-col justify-center gap-4 my-auto w-full max-w-[MIN(100%,500px)]">
        <div className="self-center py-4">
          <Logo />
        </div>

        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default VerifyAccount;
