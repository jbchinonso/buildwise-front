import Image from "next/image";
import SignupForm from "./SignupForm";
import { Logo } from "@/components/ui";

const Signup = () => {
  return (
    <section className="flex flex-col flex-wrap sm:py-[MIN(50px,5%)] !max-h-[1080px] custom-width flex-1 w-full gap-x-10 lg:flex-row  m-auto">
      <div className="w-full flex-[45%]  max-h-[MIN(976px,90dvh)] hidden lg:flex sticky top-0">
        <div className="bg-white min-h-full  rounded-4xl py-2 px-8 flex flex-col gap-4">
          {/* Logo */}
          <div className="self-start py-4">
            <Logo />
          </div>

          <h1 className="sm:text-xl md:text-3xl lg:text-4xl 2xl:text-[56px] leading-[120%] font-bold max-w-[598px]">
            Start your real estate business with Buildwise.
          </h1>

          <div className="flex relative max-w-[MIN(80%,510px)] w-full h-auto aspect-[510/486]  justify-center m-auto flex-col items-center flex-1">
            <Image
              src="/image/auth_image.webp"
              alt=""
              width={510}
              height={486}
              className="w-full"
              priority
            />
          </div>
        </div>
      </div>

      <div className="flex-[45%] flex-col gap-8 flex justify-center lg:overflow-y-auto items-center py-10 px-8 pb-10 max-w-[MIN(100%,568px)]">
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
