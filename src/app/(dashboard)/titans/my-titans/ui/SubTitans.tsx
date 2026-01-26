"use client";

import Link from "next/link";
import { DataTable, PageModal } from "@/components/dashboard";
import {
  Button,
  DataTableColumnHeader,
  Input,
  TableSkeleton,
} from "@/components/ui";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import { useClientFetch, useModal } from "@/lib/hooks";
import { toAmount } from "@/lib/utils";
import { useParams } from "next/navigation";
import { getTitanSubTitans } from "@/lib/services";
import { SubTitan } from "@/lib/type";

const columns: ColumnDef<SubTitan>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "propertiesSold",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Property sold" />
    ),
    cell: ({ row }) => (
      <div>{toAmount(row.getValue("propertiesSold") || 0, false)}</div>
    ),
  },
  {
    accessorKey: "commissionEarned",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="My commission" />
    ),
    cell: ({ row }) => (
      <div>{toAmount(row.getValue("commissionEarned") || 0)}</div>
    ),
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
        String(row.getValue("id"));

      return (
        <div className="flex justify-center px-4">
          <Link href={`${id}`} id="button">
            <ChevronRight className="size-4" />
            <span className="sr-only">View details</span>
          </Link>
        </div>
      );
    },
  },
];

export default function SubTitans({ data }: { data?: string | number }) {
  const { isModalOpen, toggleModal, closeModal } = useModal();
  const params = useParams();

  const { data: subTitans, isLoading } = useClientFetch({
    action: async () => {
      const res = await getTitanSubTitans(params?.titan as string);
      return res;
    },
    isModalOpen,
  });

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
          className="md:max-w-[MIN(95%,620px)]"
        >
          <section className="flex flex-1 flex-col w-full gap-4">
            {isLoading ? (
              <TableSkeleton />
            ) : (
              <div className="w-full my-2">
                <DataTable columns={columns} data={subTitans || []} />
              </div>
            )}

            <div className="flex mt-auto justify-end gap-4">
              <Button
                size="sm"
                outline
                variant="secondary"
                onClick={closeModal}
              >
                Close
              </Button>
              <Button size="sm">Export PDF</Button>
            </div>
          </section>
        </PageModal>
      )}
    </>
  );
}
