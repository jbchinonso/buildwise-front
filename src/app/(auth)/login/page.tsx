import React from "react";
import { SignInForm } from "./SignInForm";
import Image from "next/image";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const Login = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;
  return (
    <section className="flex flex-col flex-wrap flex-1 w-full h-full px-10 overflow-y-auto gap-x-10 lg:flex-row md:max-h-dvh">
  
      <div className="w-full flex-[50] py-6 h-auto md:sticky top-0">
              <div className="bg-white h-full rounded-4xl py-2 px-8 flex flex-col gap-8">
                {/* Logo */}
                <div className="self-start">
                  <Image
                    src="/image/BuildWiseLogo.svg"
                    alt="Logo"
                    width={120}
                    height={40}
                  />
                </div>
      
                <h1 className="sm:text-xl md:text-2xl lg:text-[56px] leading-[120%] font-bold max-w-[598px]">
                  Start your real estate business with Buildwise.
                </h1>
      
                {/* Avatar */}
                <div>
                  <div className="flex flex-col items-center">
                    <Image
                      src="/image/AuthImage.svg"
                      alt="An avatar"
                      width={510}
                      height={486}
                      className="w-full h-auto object-contain max-w-[510px]"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
      

      <div className="flex-[50] flex items-center px-8">
        <SignInForm callbackUrl={searchParams?.callbackUrl as string}/>
      </div>
    </section>
  );
};

export default Login;
