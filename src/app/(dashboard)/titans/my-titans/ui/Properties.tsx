"use client";

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
import Link from "next/link";
import { toAmount } from "@/lib/utils";
import { getTitanPropertiesSold } from "@/lib/services";
import { useParams } from "next/navigation";

type Transaction = {
  id: string;
  titan: string;
  sales: string;
  revenue: string;
  commission: string;
  joined: string;
  status: string;
};

const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "property",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Property" />
    ),
    cell: ({ row }) => <div>{row.getValue("property")}</div>,
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => <div>{row.getValue("location")}</div>,
  },
  {
    accessorKey: "buyer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Buyer" />
    ),
    cell: ({ row }) => <div>{row.getValue("buyer")}</div>,
  },
  {
    accessorKey: "unit",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Unit" />
    ),
    cell: ({ row }) => <div>{row.getValue("unit")}</div>,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => <div>{row.getValue("price")}</div>,
  },
  {
    accessorKey: "payment status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment Status" />
    ),
    cell: ({ row }) => <div>{row.getValue("payment status")}</div>,
  },

  {
    accessorKey: "_id",
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

export default function Properties({ data }: { data?: string | number }) {
  const { isModalOpen, toggleModal, closeModal } = useModal();
  const params = useParams();

  const { data: propertiesSold, isLoading } = useClientFetch({
    action: async () => {
      const res = await getTitanPropertiesSold(params?.titan as string);
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
          label="Properties sold"
          defaultValue={toAmount(data || 0, false)}
          type="text"
          readOnly
          labelStyle="text-[#7A7F83]"
          rightIcon={
            <ChevronRight className="size-4 mb-8" onClick={toggleModal} />
          }
          containerStyle="cursor-pointer"
          onClick={toggleModal}
        />
      </div>

      {isModalOpen && (
        <PageModal
          handleClose={closeModal}
          heading="Properties Sold"
          className="md:max-w-[MIN(95%,620px)]"
        >
          <section className="flex flex-1 flex-col w-full gap-4">
            {isLoading ? (
              <TableSkeleton />
            ) : (
              <div className="w-full my-2">
                <DataTable columns={columns} data={propertiesSold || []} />
              </div>
            )}

            <div className="flex mt-auto justify-end gap-4">
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
