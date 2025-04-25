import React from "react";
import { SignInForm } from "./SignInForm";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const Login = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;
  return (
    <section className="flex flex-wrap flex-1 w-full h-full gap-4 p-10">
      <div className="h-full bg-white rounded-4xl flex-[50] py-[126px] px-8">
        <h1 className="text-[56px] leading-[120%] font-bold max-w-[598px]">
          Start your real estate business with Buildwise.
        </h1>
      </div>

      <div className="flex-[50] flex items-center px-8">
        <SignInForm callbackUrl={searchParams?.callbackUrl as string}/>
      </div>
    </section>
  );
};

export default Login;
