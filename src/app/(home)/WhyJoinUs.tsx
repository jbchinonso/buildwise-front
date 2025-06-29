import React from "react";
import EarnCommissions from "@/assets/earn_commissions.png"
import ExpandNetwork from "@/assets/expand_network.png"
import ManageClients from "@/assets/manage_clients.png"
import Image from "next/image";

const WhyJoinUs = () => {
  return (
    <section className="w-full flex flex-col relative flex-1  bg-[rgba(74,0,1,1)] py-10 lg:py-[calc(var(--navbar-scroll-padding))] px-2 sm:px-[MIN(100px,10%)]">
      <h2 className="text-center text-2xl lg:text-5xl font-bold text-white my-8">
        Why Join BuildWise?
      </h2>

      <div className="w-full l.g:min-h-[1019px] items-center-safe  max-w-[MIN(100%,1233px)] mx-auto flex-1 flex flex-wrap gap-4 rounded-[24px] overflow-hidden">
        <div className="flex overflow-hidden gap-4 w-full flex-col relative lg:flex-[45%] min-h-[499px] lg:min-h-[590px] max-h-fit lg:max-h-[590px] bg-white">
          <span className="w-full h-auto m-auto max-w-[MIN(85%,600px)] mt-0 rounded-b-[24px] lg:absolute -left-[72px] aspect-[600/426]">
            <Image
              alt="Expand network"
              placeholder="blur"
              src={ExpandNetwork}
              className="rounded-b-[24px] w-full "
            />
          </span>

          <div className="flex flex-col mt-auto pb-8 mx-auto max-w-[MIN(100%,293px)] gap-4 text-center w-full">
            <p className="text-2xl text-[rgba(41,42,44,1)]">
              Expand Your Network
            </p>
            <p className="text-[rgba(122,127,131,1)]">
              Recruit agents and grow a multi-tiered referral system.
            </p>
          </div>
        </div>

        <div className="flex overflow-hidden gap-4 w-full flex-col relative lg:flex-[45%] min-h-[499px] lg:min-h-[590px] max-h-fit lg:max-h-[590px] bg-white">
          <div className="flex flex-col py-8  mx-auto max-w-[MIN(100%,293px)] gap-4 text-center w-full">
            <p className="text-2xl text-[rgba(41,42,44,1)]">
              Manage Clients Easily
            </p>
            <p className="text-[rgba(122,127,131,1)]">
              Invite clients, track payments, and close sales seamlessly.
            </p>
          </div>

          <span className="w-full h-auto m-auto lg:absolute -bottom-4 -left-[111.5px] rounded-t-[24px]  aspect-[600/426] max-w-[MIN(85%,600px)]">
            <Image
              alt="Manage clients"
              placeholder="blur"
              src={ManageClients}
              className="rounded-t-[24px] w-full"
            />
          </span>
        </div>

        <div className="flex bg-white w-full px-4 flex-wrap flex-col lg:flex-row min-h-[413px] max-h-[554px] rounded-b-[24px]">
          <div className="flex flex-col mt-auto p-4 m-8 max-w-[MIN(100%,293px)] gap-4 text-start w-full">
            <p className="text-2xl text-[rgba(41,42,44,1)]">Earn Commissions</p>
            <p className="text-[rgba(122,127,131,1)]">
              Get paid for every sale and earn from your downline agents.
            </p>
          </div>

          <div className="flex flex-1 relative overflow-hidden">
            <span className="w-full max-w-[558px] flex h-auto lg:absolute -bottom-8 left-1/2  lg:-translate-x-1/2 rounded-[24px] aspect-[557/511] flex-1">
              <Image
                alt="Earn commission"
                placeholder="blur"
                src={EarnCommissions}
                className="rounded-[24px] w-full  mt-auto"
              />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyJoinUs;
