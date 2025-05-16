"use client";
import { DashboardModal, DataTable } from "@/components/dashboard";
import { Button, DataTableColumnHeader, ProfileAvatar } from "@/components/ui";
import { useModal } from "@/lib/hooks";
import { copyTextToClipboard } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Files } from "lucide-react";

type ICommission = {
  id: string;
  client: string;
  payment: string;
  commission: string;
  commission_id: string;
  status: string;
};

const columns: ColumnDef<ICommission>[] = [
  {
    accessorKey: "client",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Client" />
    ),
    cell: ({ row }) => <div>{row.getValue("client")}</div>,
  },
  {
    accessorKey: "payment",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment" />
    ),
    cell: ({ row }) => <div>{row.getValue("payment")}</div>,
  },
  {
    accessorKey: "commission",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => <div>{row.getValue("commission")}</div>,
  },
  {
    accessorKey: "commission_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Commission ID" />
    ),
    cell: ({ row }) => <div>{row.getValue("commission_id")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <div
        className={`text-center rounded-full px-1 p-0.5 text-[#292A2C] ${
          row.getValue("status") == "Paid" ? "bg-[#70F41F]" : "bg-[#F4BB1F] "
        }`}
      >
        {row.getValue("status")}
      </div>
    ),
  },
];

export const PayCommissionModal = ({ bankAccount = "O70 3456 6543" }) => {
  const { isModalOpen, toggleModal, closeModal } = useModal();
  return (
    <>
      <Button size="sm" onClick={toggleModal}>
        Pay Commission (3)
      </Button>

      {isModalOpen && (
        <DashboardModal
          heading={"Pay agent's commissions"}
          handleClose={closeModal}
          className="sm:max-w-[MIN(90%,924px)]"
        >
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-baseline justify-between">
              <ProfileAvatar
                image="/image/avatar.png"
                name="Annette Black"
                id="0939393"
                className="flex-col items-start gap-1"
              />

              <div className="flex gap-4 border rounded-xl p-4 py-2">
                <div>
                  <p className="text-[#7A7F83] text-xs">Bank account</p>
                  <p className="font-semibold">{bankAccount}</p>
                </div>

                <button
                  onClick={() => {
                    copyTextToClipboard(bankAccount);
                  }}
                  className="border cursor-pointer border-transparent hover:border-grey-50 rounded aspect-square px-2 p-0.5"
                >
                  <Files
                    size={14}
                    className="text-[#292A2C] text-xs my-auto  aspect-square"
                  />
                </button>
              </div>
            </div>
            <div className="flex w-full bg-red-300">
              <DataTable columns={columns} data={[]} />
            </div>
            <div className="flex gap-4 justify-end">
              <Button
                onClick={closeModal}
                variant="secondary"
                size="sm"
                className="px-8"
              >
                Cancel
              </Button>
              <Button size="sm">Update Payment</Button>
            </div>
          </div>
        </DashboardModal>
      )}
    </>
  );
};
