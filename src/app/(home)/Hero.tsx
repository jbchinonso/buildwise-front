import { Button } from "@/components/ui";
import React from "react";

const Hero = () => {
  return (
    <section className="w-full relative flex-1 min-h-full bg-[#F8F8F8] py-[calc(var(--navbar-scroll-padding))] px-2 sm:px-[MIN(100px,10%)]">
      <div className="w-full relative py-10 flex-1 z-[1] flex flex-col gap-10 justify-center items-center">
        <div className="flex   text-white gap-4 flex-col w-full mx-auto text-center justify-center items-center max-w-[MIN(95%,860px)]">
          <h1 className="font-bold text-[64px] leading-[100%]">
            Manage your clients, own your real estate business.
          </h1>
          <p>
            Join the BuildWise Estate System to manage clients, track
            commissions, and grow your network
          </p>
        </div>

        <div className="flex gap-4 my-4 items-center justify-center">
          <Button className="rounded-sm bg-[rgba(74,0,1,1)] max-w-[151px]">
            Login
          </Button>
          <Button className="rounded-sm" variant="secondary">
            Learn More
          </Button>
        </div>

        <div className="flex flex-wrap gap-4 backdrop-blur-[12px] px-[50px] py-8 bg-[rgba(255,255,255,0.2)] w-full p-4 rounded-xl border max-w-[MIN(816px,90%)]">
          <div className="flex items-baseline gap-4 justify-evenly w-full">
            <div className="p-4 rounded-xl flex-[25%] w-full max-w-[170px] bg-[rgba(53,53,53,0.5)] min-h-[93px]"></div>
            <div className="p-4 rounded-xl flex-[25%] w-full max-w-[170px] bg-[rgba(53,53,53,0.5)] min-h-[93px]"></div>
            <div className="p-4 rounded-xl flex-[25%] w-full max-w-[170px] bg-[rgba(53,53,53,0.5)] min-h-[93px]"></div>
            <div className="p-4 rounded-xl flex-[25%] w-full max-w-[170px] bg-[rgba(53,53,53,0.5)] min-h-[93px]"></div>
          </div>
          <div className="flex rounded-xl items-baseline gap-4 justify-evenly w-full bg-[rgba(53,53,53,0.5)] min-h-[93px]"></div>
        </div>
      </div>
      <div className="absolute z-0 opacity-[72] top-0 left-0  w-full h-full overflow-hidden bg-cover bg-center bg-[url('/image/hero_bg.png')] bg-no-repeat  flex-col justify-center items-center w-full  bg-[rgba(0,0,0,0.6)] px-6 sm:px-[MIN(100px,10%)] gap-8">
        <span className="w-full z-0 absolute  bg-[rgba(0,0,0,0.6)] h-full top-0 left-0" />
      </div>
    </section>
  );
};

export default Hero;
