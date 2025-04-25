import Signup from "./SignupForm";

const Login = () => {
  return (
    <section className="flex flex-col flex-wrap flex-1 w-full h-full px-10 overflow-y-auto gap-x-10 lg:flex-row md:max-h-dvh ">
      <div className="w-full flex-[50] py-6 h-full md:max-h-full md:sticky top-0">
        <div className=" bg-white h-full rounded-4xl md:py-[126px] p-8">
          <h1 className="sm:text-xl md:text-2xl lg:text-[56px] leading-[120%] font-bold max-w-[598px]">
            Start your real estate business with Buildwise.
          </h1>
        </div>
      </div>

      <div className="sm:flex-[50] w-full min-w-[MIN(285px,100%)] sm:py-6 flex flex-col items-center pb-10">
        <div className="flex flex-col gap-4 my-auto w-full max-w-[MIN(100%,568px)]">
          <div className="w-full">
            <h2 className="text-2xl font-bold">Sign Up</h2>
            <p>Create your account</p>
          </div>
          <Signup />

          <div className="flex flex-col gap-2">
            <p className="text-sm text-center">
              Already have an account?{" "}
              <a href="/login" className="font-bold text-primary-500">
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
