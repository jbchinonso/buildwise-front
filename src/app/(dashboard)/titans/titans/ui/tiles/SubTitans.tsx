"use client";
import {
  DashboardTileCard,
  DataTable,
  PageModal,
} from "@/components/dashboard";
import { DataTableColumnHeader } from "@/components/ui";
import { useModal } from "@/lib/hooks";
import { ColumnDef } from "@tanstack/react-table";

type SubTitans = {
  id: string;
  subTitan: string;
  sales: string;
  revenue: string;
  commissions: string;
  joined: string;
  status: string;
};

const columns: ColumnDef<SubTitans>[] = [
  {
    accessorKey: "subTitan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sub-titans" />
    ),
    cell: ({ row }) => <div>{row.getValue("subTitan")}</div>,
  },
  {
    accessorKey: "sales",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sales" />
    ),
    cell: ({ row }) => <div>{row.getValue("sales")}</div>,
  },
  {
    accessorKey: "revenue",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Revenue" />
    ),
    cell: ({ row }) => <div>{row.getValue("revenue")}</div>,
  },
  {
    accessorKey: "commissions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Commission" />
    ),
    cell: ({ row }) => (
      <div className={"text-center"}>{row.getValue("commissions")}</div>
    ),
  },
  {
    accessorKey: "joined",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Joined" />
    ),
    cell: ({ row }) => (
      <div className={"text-center"}>{row.getValue("joined")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <div
        className={`text-center ${
          row.getValue("payment_status") == "Active" ? "text-[#09A4B9]" : ""
        }`}
      >
        {row.getValue("status")}
      </div>
    ),
  },
];

export const SubTitians = ({
  data,
  className,
  subTitans = [],
}: {
  data?: string | number;
  className?: string;
  subTitans?: [];
}) => {
  const { isModalOpen, closeModal, toggleModal } = useModal();
  return (
    <>
      <DashboardTileCard
        label="Sub-titans"
        data={data}
        className={className}
        onClick={toggleModal}
      />

      {isModalOpen && (
        <PageModal
          handleClose={closeModal}
          heading="Sub Titans"
          className="max-w-[MIN(95%,880px)]"
        >
          <section className="flex flex-col w-full gap-4 ">
            <div className="flex w-full rounded-xl text-xs py-[10px] flex-wrap bg-primary-50 p-3 text-white">
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Referrals</p>
                <p className="text-grey-600">100</p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Commission from sub-titans</p>
                <p className="text-grey-600">₦51,208</p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Sub-titans revenue</p>
                <p className="text-grey-600">₦51,208</p>
              </div>
            </div>

            <div className="w-full my-2">
              <DataTable columns={columns} data={subTitans} />
            </div>
          </section>
        </PageModal>
      )}
    </>
  );
};
