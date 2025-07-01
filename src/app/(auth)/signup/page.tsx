import Image from "next/image";
import SignupForm from "./SignupForm";
import { Logo } from "@/components/ui";

const Signup = () => {
  return (
    <section className="flex flex-col flex-wrap sm:py-[MIN(50px,5%)] !max-h-[1080px] custom-width flex-1 w-full gap-x-10 lg:flex-row  m-auto">
      <div className="w-full flex-[45%]  max-h-[MIN(976px,90dvh)] hidden lg:flex sticky top-0">
        <div className="flex flex-col min-h-full gap-4 px-8 py-2 bg-white rounded-4xl">
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

      <div className="flex-[50] flex-col gap-8 flex lg:justify-center overflow-y-auto items-center px-8 w-full max-w-[MIN(100%,568px)] self-center">
        <div className="flex flex-col gap-4 my-auto w-full max-w-[MIN(100%,500px)]">
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
