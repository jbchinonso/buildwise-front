"use client";
import { DataTable, PageModal } from "@/components/dashboard";
import {  DataTableColumnHeader, Input } from "@/components/ui";
import { ISoldUnitsDTO } from "@/lib/dtos/property.dto";
import { useModal } from "@/lib/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface IProps {
  id?: string;
  unitsSold?: string;
  sales?: ISoldUnitsDTO[];
}

type Transaction = {
  id: string;
  buyer: string;
  unit: string;
  price: string;
  amountPaid: string;
  outstanding: string;
  status: string;
};

const columns: ColumnDef<Transaction>[] = [
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
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
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

export const UnitsSold = ({ id, unitsSold }: IProps) => {
  const { isModalOpen, toggleModal, closeModal } = useModal();
  const router = useRouter()
  return (
    <>
      <Input
        label="Units Sold/Reserved"
        name="soldUnits"
        id="soldUnits"
        type="text"
        readOnly
        onClick={toggleModal}
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)] cursor-pointer"
        defaultValue={unitsSold}
        rightIcon={<ChevronRight className="size-4" color="currentColor" />}
      />

      {isModalOpen && (
        <PageModal
          handleClose={closeModal}
          heading="Units Sold / Reserved"
          className="max-w-[MIN(100%,600px)]"
        >
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
