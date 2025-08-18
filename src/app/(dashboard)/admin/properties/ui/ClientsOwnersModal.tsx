"use client";
import { DataTable, PageModal } from "@/components/dashboard";
import { DataTableColumnHeader, Input } from "@/components/ui";
import { IPropertyClientOwnershipTable } from "@/lib/dtos/property.dto";
import { useModal } from "@/lib/hooks";
import { toAmount } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const columns: ColumnDef<IPropertyClientOwnershipTable>[] = [
  {
    accessorKey: "client",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Client Name" />
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("client")}</div>
    ),
  },
  {
    accessorKey: "agent",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Titan" />
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("agent")}</div>
    ),
  },
  {
    accessorKey: "unit",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Units" />
    ),
    cell: ({ row }) => <div>{row.getValue("unit")}</div>,
  },
  {
    accessorKey: "paid",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Paid" />
    ),
    cell: ({ row }) => <div>{toAmount(row.getValue("paid") ?? 0)}</div>,
  },
  {
    accessorKey: "outstanding",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Outstanding" />
    ),
    cell: ({ row }) => (
      <div>{toAmount(row.getValue("outstanding") ?? 0)}</div>
    ),
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
  clientOwners?: IPropertyClientOwnershipTable[];
}

export const ClientsOwnersModal = ({ id, owners, clientOwners }: IProps) => {
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
              <DataTable columns={columns} data={clientOwners ?? []} />
            </div>
          </section>
        </PageModal>
      )}
    </>
  );
};
