"use client";
import {
  DashboardTileCard,
  DataTable,
  PageModal,
} from "@/components/dashboard";
import { DataTableColumnHeader } from "@/components/ui";
import { useModal } from "@/lib/hooks";
import { ColumnDef } from "@tanstack/react-table";

type Client = {
  id: string;
  client: string;
  properties_sold: number;
  commission: string;
  joined: string;
};

const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "client",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Client's name" />
    ),
    cell: ({ row }) => <div>{row.getValue("client")}</div>,
  },
  {
    accessorKey: "properties",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Properties" />
    ),
    cell: ({ row }) => <div>{row.getValue("properties")}</div>,
  },
  {
    accessorKey: "payment",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment" />
    ),
    cell: ({ row }) => <div>{row.getValue("payment")}</div>,
  },
  {
    accessorKey: "joined",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Joined" />
    ),
    cell: ({ row }) => (
      <div
        className={`text-center ${
          row.getValue("payment_status") == "Active" ? "text-[#09A4B9]" : ""
        }`}
      >
        {row.getValue("payment_status")}
      </div>
    ),
  },
];

export const Clients = ({
  data,
  className,
  clients = [],
}: {
  data?: string | number;
  className?: string;
  clients?: [];
}) => {
  const { isModalOpen, closeModal, toggleModal } = useModal();
  return (
    <>
      <DashboardTileCard
        label="Clients"
        data={data}
        className={className}
        onClick={toggleModal}
      />

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

            <div className="w-full my-2">
              <DataTable columns={columns} data={clients} />
            </div>
          </section>
        </PageModal>
      )}
    </>
  );
};
