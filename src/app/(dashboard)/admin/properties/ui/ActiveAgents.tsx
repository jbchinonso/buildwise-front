"use client";
import { DataTable, PageModal } from "@/components/dashboard";
import { DataTableColumnHeader, Input } from "@/components/ui";
import { useModal } from "@/lib/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

type Titan = {
  id: string;
  titan: string;
  clients: string;
  units: string;
};

const columns: ColumnDef<Titan>[] = [
  {
    accessorKey: "titan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Titan" />
    ),
    cell: ({ row }) => <div>{row.getValue("titan")}</div>,
  },
  {
    accessorKey: "clients",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Clients" />
    ),
    cell: ({ row }) => <div>{row.getValue("clients")}</div>,
  },
  {
    accessorKey: "units",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Units" />
    ),
    cell: ({ row }) => <div>{row.getValue("units")}</div>,
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
  agents?: string | number;
}

export const ActiveAgents = ({ id, agents }: IProps) => {
  const { isModalOpen, toggleModal, closeModal } = useModal();
  const router = useRouter();
  return (
    <>
      <Input
        label="Active Agents"
        type="text"
        readOnly
        onClick={toggleModal}
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)] cursor-pointer"
        defaultValue={agents}
        rightIcon={<ChevronRight className="size-4" color="currentColor" />}
      />

      {isModalOpen && (
        <PageModal
          handleClose={closeModal}
          heading="Active agents"
          className="max-w-[MIN(100%,535px)]"
        >
          <p className="mb-4">{agents}</p>
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
