"use client";
import { DataTable, PageModal } from "@/components/dashboard";
import { DataTableColumnHeader, Input } from "@/components/ui";
import { useModal } from "@/lib/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

type Owner = {
  id: string;
  client: string;
  titan: string;
  units: string;
  amountPaid: string;
  outtandin: string;
};

const columns: ColumnDef<Owner>[] = [
  {
    accessorKey: "client",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Client Name" />
    ),
    cell: ({ row }) => <div>{row.getValue("client")}</div>,
  },
  {
    accessorKey: "titan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Titan" />
    ),
    cell: ({ row }) => <div>{row.getValue("titan")}</div>,
  },
  {
    accessorKey: "units",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Units" />
    ),
    cell: ({ row }) => <div>{row.getValue("units")}</div>,
  },
  {
    accessorKey: "amountPaid",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Paid" />
    ),
    cell: ({ row }) => <div>{row.getValue("amountPaid")}</div>,
  },
  {
    accessorKey: "outstanding",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Outstanding" />
    ),
    cell: ({ row }) => <div>{row.getValue("outstanding")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          <button id="button">
            <ChevronRight className="size-4" />
            <span className="sr-only">View details</span>
          </button>
        </div>
      );
    },
  },
];

interface IProps {
  id?: string;
  owners?: string | number;
}

export const ClientsOwnersModal = ({ id, owners }: IProps) => {
  const { isModalOpen, toggleModal, closeModal } = useModal();
  const router = useRouter();
  return (
    <>
      <Input
        label="Clients/Ownerships"
        readOnly
        onClick={toggleModal}
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)] cursor-pointer"
        defaultValue={owners}
        rightIcon={<ChevronRight className="size-4" color="currentColor" />}
      />

      {isModalOpen && (
        <PageModal
          handleClose={closeModal}
          heading="Clients/ ownership"
          className="max-w-[MIN(100%,889px)]"
        >
          <p className="mb-4">{owners}</p>
          <section className="flex flex-col w-full gap-4">
            <div className="w-full my-1 flex-1">
              <DataTable columns={columns} data={[]} />
            </div>
          </section>
        </PageModal>
      )}
    </>
  );
};
