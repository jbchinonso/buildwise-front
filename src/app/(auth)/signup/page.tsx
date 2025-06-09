import Image from "next/image";
import SignupForm from "./SignupForm";
import { Logo } from "@/components/ui";

const Signup = () => {
  return (
    <section className="flex flex-col flex-wrap flex-1 w-full h-full px-10 overflow-y-auto gap-x-10 lg:flex-row md:max-h-dvh ">
      <div className="w-full flex-[50] max-h-[MIN(976px,99dvh)] py-6 h-auto hidden lg:flex md:sticky top-0">
        <div className="bg-white h-full rounded-4xl py-2 px-8 flex flex-col gap-4">
          {/* Logo */}
          <div className="self-start py-4">
            <Logo />
          </div>

          <h1 className="sm:text-xl md:text-2xl lg:text-[56px] leading-[110%] font-bold max-w-[598px]">
            Start your real estate business with Buildwise.
          </h1>

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

      <div className="flex-[50] flex-col gap-8 flex justify-center lg:overflow-y-auto items-center py-10 px-8 pb-10">
        <div className="flex flex-col gap-4 my-auto w-full max-w-[MIN(100%,568px)]">
        <div className="self-start py-4 lg:hidden">
          <Logo />
        </div>
          <div className="w-full mb-2">
            <h2 className="text-2xl font-bold">Sign Up</h2>
            <p className="py-2">Create your account</p>
          </div>
          <SignupForm />
        </div>
      </div>
    </section>
  );
};

export default Signup;
