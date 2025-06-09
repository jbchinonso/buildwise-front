import React from "react";
import Image from "next/image";
import ResetPasswordForm from "./ResetPasswordForm";
import { Logo } from "@/components/ui";

const ResetPassword = () => {
  return (
    <section className="flex flex-col flex-wrap flex-1 w-full h-full px-10 overflow-y-auto gap-x-10 lg:flex-row md:max-h-dvh">
      <div className="w-full flex-[50] py-6 max-h-[MIN(976px,99dvh)] hidden lg:flex md:sticky top-0">
        <div className="bg-white h-full rounded-4xl py-2 px-8 flex flex-col gap-8">
          <Logo />

          <h1 className="sm:text-xl md:text-2xl lg:text-[56px] leading-[120%] font-bold max-w-[598px]">
            Start your real estate business with Buildwise.
          </h1>

          {/* Avatar */}
          <div className="flex relative max-w-[MIN(80%,510px)] m-auto flex-col items-center flex-1">
            <Image
              src="/image/AuthImage.svg"
              alt="An avatar"
              width={200}
              height={200}
              className="w-auto h-fit object-contain "
              priority
            />
          </div>
        </div>
      </div>

      <div className="flex-[50] flex-col gap-8 flex lg:justify-center overflow-y-auto items-center px-8">
        <div className="self-start py-4 lg:hidden">
          <Logo />
        </div>
        <ResetPasswordForm />
      </div>
    </section>
  );
};

export default ResetPassword;
