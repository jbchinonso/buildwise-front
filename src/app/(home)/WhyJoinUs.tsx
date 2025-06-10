import React from "react";

const WhyJoinUs = () => {
  return (
    <section className="w-full flex flex-col relative flex-1 min-h-dvh bg-[rgba(74,0,1,1)] py-[calc(var(--navbar-scroll-padding))] px-2 sm:px-[MIN(100px,10%)]">
      <h2 className="text-center text-5xl font-bold text-white my-8">
        Why Join BuildWise?
      </h2>

      <div className="w-full min-h-[1019px] max-w-[MIN(100%,1233px)] mx-auto flex-1 border flex flex-wrap gap-4 rounded-[24px] overflow-hidden">
        <div className="flex  overflow-hidden flex-col relative flex-[45%] max-h-[590px] bg-white">
          <span className="w-full absolute -top-4 -left-8 rounded-[24px]  bg-[rgba(31,31,31,0.2)] max-w-[MIN(70%,600px)] aspect-[600/426]"></span>

          <div className="flex flex-col mt-auto py-8 mx-auto max-w-[MIN(100%,293px)] gap-4 text-center w-full">
            <p className="text-2xl text-[rgba(41,42,44,1)]">
              Expand Your Network
            </p>
            <p className="text-[rgba(122,127,131,1)]">
              Recruit agents and grow a multi-tiered referral system.
            </p>
          </div>
        </div>
        <div className="flex relative overflow-hidden flex-[45%] bg-white  max-h-[590px] ">
          <div className="flex flex-col py-8  mx-auto max-w-[MIN(100%,293px)] gap-4 text-center w-full">
            <p className="text-2xl text-[rgba(41,42,44,1)]">
              Manage Clients Easily
            </p>
            <p className="text-[rgba(122,127,131,1)]">
              Invite clients, track payments, and close sales seamlessly.
            </p>
          </div>

          <span className="w-full absolute -bottom-4 -left-8 rounded-[24px]  bg-[rgba(31,31,31,0.2)] max-w-[MIN(70%,600px)] aspect-[600/426]"></span>
        </div>

        <div className="flex bg-white w-full px-4 flex-wrap">
          <div className="flex flex-col mt-auto m-8 max-w-[MIN(100%,293px)] gap-4 text-start w-full">
            <p className="text-2xl text-[rgba(41,42,44,1)]">Earn Commissions</p>
            <p className="text-[rgba(122,127,131,1)]">
              Get paid for every sale and earn from your downline agents.
            </p>
          </div>

          <div className="flex flex-1 mx-auto relative overflow-hidden">
            <span className="w-full absolute -bottom-8 left-1/2 -translate-x-1/2 rounded-[24px]  bg-[rgba(31,31,31,0.2)] max-w-[MIN(70%,600px)] aspect-[600/426]"></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyJoinUs;
