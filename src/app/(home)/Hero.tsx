import { Button } from "@/components/ui";
import React from "react";
import Landing from "@/assets/landing_1.png";
import Landing2 from "@/assets/landing_2.png";
import Landing3 from "@/assets/landing_3.png";
import Landing4 from "@/assets/landing_4.png";
import Landing5 from "@/assets/landing_5.png";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/utils";

const Hero = async () => {
  const session = await getServerSession(authOptions);
  return (
    <section className="w-full relative flex-1 min-h-full bg-[#F8F8F8] py-[calc(var(--navbar-scroll-padding))] px-2 sm:px-[MIN(100px,10%)]">
      <div className="w-full relative py-10 flex-1 z-[1] flex flex-col gap-10 justify-center items-center">
        <div className="flex text-white gap-4 flex-col w-full mx-auto text-center justify-center items-center max-w-[MIN(95%,860px)]">
          <h1 className="font-bold text-3xl md:text-[64px] leading-[100%]">
            Manage your clients, own your real estate business.
          </h1>
          <p>
            Join the BuildWise Estate System to manage clients, track
            commissions, and grow your network
          </p>
        </div>

        <div className="flex gap-4 my-4 items-center justify-center">
          <Button
            className="rounded-sm bg-[rgba(74,0,1,1)] max-w-[151px]"
            asLink
            href={session?.user ? "/dashboard" : "/login"}
          >
            {session?.user ? "Dashboard" : "Login"}
          </Button>
          <Button className="rounded-sm" variant="secondary">
            Learn More
          </Button>
        </div>

        <div className="flex flex-wrap gap-4 backdrop-blur-[12px] px-4 lg:px-[50px] py-8 bg-[rgba(255,255,255,0.2)] w-full p-4 rounded-xl border max-w-[MIN(816px,99%)]">
          <div className="flex items-baseline gap-4 justify-evenly w-full">
            <div className="rounded-xl flex-[25%] w-full max-w-[170px] bg-[rgba(53,53,53,0.5)]">
              <Image src={Landing} alt="Revenue" />
            </div>
            <div className="rounded-xl flex-[25%] w-full max-w-[170px] bg-[rgba(53,53,53,0.5)]">
              <Image src={Landing2} alt="Revenue" />
            </div>
            <div className="rounded-xl flex-[25%] w-full max-w-[170px] bg-[rgba(53,53,53,0.5)]">
              <Image src={Landing3} alt="Revenue" />
            </div>
            <div className="rounded-xl flex-[25%] w-full max-w-[170px] bg-[rgba(53,53,53,0.5)]">
              <Image src={Landing4} alt="Revenue" />
            </div>
          </div>
          <div className="flex rounded-xl items-baseline gap-4 justify-evenly w-full bg-[rgba(53,53,53,0.5)]">
            <Image src={Landing5} alt="Revenue" />
          </div>
        </div>
      </div>
      <div className="absolute z-0 opacity-[72] top-0 left-0 h-full overflow-hidden bg-cover bg-center bg-[url('/image/hero_bg.png')] bg-no-repeat  flex-col justify-center items-center w-full  bg-[rgba(0,0,0,0.6)] px-6 sm:px-[MIN(100px,10%)] gap-8">
        <span className="w-full z-0 absolute  bg-[rgba(0,0,0,0.6)] h-full top-0 left-0" />
      </div>
    </section>
  );
};

export default Hero;
