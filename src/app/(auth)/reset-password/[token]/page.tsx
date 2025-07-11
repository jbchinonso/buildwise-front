import React from "react";
import Image from "next/image";
import ResetPasswordForm from "./ResetPasswordForm";
import { Logo } from "@/components/ui";

const ResetPassword = () => {
  return (
    <section className="flex flex-col flex-wrap sm:py-[MIN(50px,5%)] !max-h-[1080px] custom-width flex-1 w-full gap-x-10 lg:flex-row  m-auto">
      <div className="w-full flex-[45%]  max-h-[MIN(976px,90dvh)] hidden lg:flex sticky top-0">
        <div className="bg-white min-h-full rounded-4xl py-2 px-8 flex flex-col items-start gap-8">
          <Logo />

          <h1 className="sm:text-xl md:text-2xl lg:text-[56px] leading-[120%] font-bold max-w-[598px]">
            Start your real estate business with Buildwise.
          </h1>

          {/* Avatar */}
          <div className="flex relative max-w-[MIN(80%,510px)] w-full h-auto aspect-[510/486] justify-center m-auto flex-col items-center flex-1">
            <Image
              src="/image/auth_image.webp"
              alt=""
              width={510}
              height={486}
              className="w-full"
              priority
              unoptimized
            />
          </div>
        </div>
      </div>

      <div className="flex-[50] flex-col gap-8 flex lg:justify-center overflow-y-auto items-center px-8 w-full max-w-[MIN(100%,568px)] self-center">
        <div className="self-start py-4 lg:hidden flex flex-col items-start">
          <Logo />
        </div>
        <ResetPasswordForm />
      </div>
    </section>
  );
};

export default ResetPassword;
