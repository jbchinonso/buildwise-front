
"use client";

import { DataTable, PageModal } from "@/components/dashboard";
import { Button, DataTableColumnHeader, Input } from "@/components/ui";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import { useModal } from "@/lib/hooks";
import Link from "next/link";

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
  const titanData: Transaction[] = [
    {
      id: "1",
      titan: "Titan 1",
      sales: "10",
      revenue: "₦2,000,000",
      commission: "₦200,000",
      joined: "2024-01-01",
      status: "Active",
    }]  
  
  export default function Properties() {
    const { isModalOpen, toggleModal, closeModal } = useModal();
    
  
    return (
      <>
        <Input
          label="Properties sold"
          defaultValue="4"
          name="propertiesSold"
          id="propertiesSold"
          type="text"
          readOnly
          labelStyle="text-[#7A7F83]"
          rightIcon={<ChevronRight className="size-4 mb-8" onClick={toggleModal}/>}
          containerStyle="flex-[45%] max-w-[MIN(100%,470px)] cursor-pointer"
          onClick={toggleModal}
        />
  
        {isModalOpen && (
          <PageModal handleClose={closeModal} heading="Properties Sold" className="max-w-[MIN(95%,620px)]">
            <section className="flex flex-col w-full gap-4">
              <DataTable columns={columns} data={titanData} />
  
              <div className="flex justify-end gap-4 mt-4">
                <Button size="xs" outline variant="secondary" onClick={closeModal}>Close</Button>
                <Button size="xs">Export PDF</Button>
              </div>
            </section>
          </PageModal>
        )}
      </>
    );
  }