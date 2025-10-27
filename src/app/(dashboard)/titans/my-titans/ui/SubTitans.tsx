"use client";

import { DataTable, PageModal } from "@/components/dashboard";
import { Button, DataTableColumnHeader, Input } from "@/components/ui";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import { useModal } from "@/lib/hooks";
import Link from "next/link";
import { toAmount } from "@/lib/utils";

type Transaction = {
  id: string;
  titan: string;
  sales: string;
  revenue: string;
  commission: string;
  joined: string;
  status: string;
};
const subTitanColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "property sold",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Property sold" />
    ),
    cell: ({ row }) => <div>{row.getValue("property sold")}</div>,
  },
  {
    accessorKey: "my commission",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="My commission" />
    ),
    cell: ({ row }) => <div>{row.getValue("buyer")}</div>,
  },
  {
    accessorKey: "joined",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Joined" />
    ),
    cell: ({ row }) => <div>{row.getValue("joined")}</div>,
  },

  {
    accessorKey: "id",
    header: () => null,
    cell: ({ row }) => {
      const id =
        String(row.getValue("id")) ||
        String(row?.original?.id) ||
        String(row.getValue("_id"));

      return (
        <div className="flex justify-center px-4">
          <Link href={`/${id}`} id="button">
            <ChevronRight className="size-4" />
            <span className="sr-only">View details</span>
          </Link>
        </div>
      );
    },
  },
];
const titanData: Transaction[] = [
  {
    id: "1",
    titan: "Titan 1",
    sales: "10",
    revenue: "₦2,000,000",
    commission: "₦200,000",
    joined: "2024-01-01",
    status: "Active",
  },
];
export default function SubTitans({ data }: { data?: string | number }) {
  const { isModalOpen, toggleModal, closeModal } = useModal();

  return (
    <>
      <div
        onClick={toggleModal}
        tabIndex={0}
        className="flex-[45%] max-w-[MIN(100%,470px)] cursor-pointer"
      >
        <Input
          label="Sub-titans"
          defaultValue={toAmount(data || 0, false)}
          type="text"
          readOnly
          labelStyle="text-[#7A7F83]"
          rightIcon={
            <ChevronRight className="size-4 mb-8" onClick={toggleModal} />
          }
          className="cursor-pointer"
          containerStyle="cursor-pointer"
          onClick={toggleModal}
        />
      </div>

      {isModalOpen && (
        <PageModal
          handleClose={closeModal}
          heading="Sub-titans"
          className="max-w-[MIN(95%,620px)]"
        >
          <section className="flex flex-col w-full gap-4">
            <DataTable columns={subTitanColumns} data={titanData} />

            <div className="flex justify-end gap-4 mt-4">
              <Button
                size="xs"
                outline
                variant="secondary"
                onClick={closeModal}
              >
                Close
              </Button>
              <Button size="xs">Export PDF</Button>
            </div>
          </section>
        </PageModal>
      )}
    </>
  );
}
