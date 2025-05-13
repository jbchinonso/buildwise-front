"use client";
import { DashboardTileCard, PageModal } from "@/components/dashboard";
import { useModal } from "@/lib/hooks";
import { twMerge } from "tailwind-merge";

export const PropertiesSold = ({
  data,
  className,
}: {
  data?: string | number;
  className?: string;
}) => {
  const { isModalOpen, closeModal } = useModal();
  return (
    <>
      <DashboardTileCard
        label="Properties sold"
        data={data}
        className={className}
      />

      {/* <DashboardStatsCard
         title="Total Clients"
         icon={<Profile2User size="24" color="#9747FF" />}
         data="23.8B"
         theme=""
         onClick={toggleModal}
       /> */}

      {isModalOpen && (
        <PageModal
          handleClose={closeModal}
          heading="Clients Overview"
          className="max-w-[MIN(95%,600px)]"
        >
          <section className="flex flex-col w-full gap-4 ">
            <div className="flex w-full rounded-xl text-xs py-[10px] flex-wrap bg-primary-50 p-3 text-white">
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">All Clients</p>
                <p className="text-grey-600">100</p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Active Buyers</p>
                <p className="text-grey-600">208</p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Closed sales</p>
                <p className="text-grey-600">₦51,208,009</p>
              </div>
            </div>

            {/* <div className="flex items-baseline justify-between w-full gap-4">
               <h2 className="font-semibold text-grey-600">
                 Recently onboarded agents
               </h2>

               <Link
                 href="/"
                 className="flex items-center gap-1 text-xs font-medium text-primary-400 flex-nowrap whitespace-nowrap"
               >
                 View all <ArrowRight size={14} color="currentColor" />
               </Link>
             </div> */}

            {/* <div className="w-full my-2">
               <DataTable columns={columns} data={data} />
             </div> */}
          </section>
        </PageModal>
      )}
    </>
  );
};
