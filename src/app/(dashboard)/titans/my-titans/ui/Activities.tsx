"use client";

import { DataTable, PageModal } from "@/components/dashboard";
import { useState } from "react";
import { Button, DataTableColumnHeader, Input } from "@/components/ui";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";

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
const titanData: Transaction[] = [
// existing data
];

export default function Activities() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"properties" | "subtitans" | null>(null);

  const openModal = (type: "properties" | "subtitans") => {
    setModalType(type);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <form className="w-full flex flex-wrap justify-between gap-4">
      <Input
        label="Properties sold"
        value="4"
        name="propertiesSold"
        id="propertiesSold"
        type="text"
        labelStyle="text-[#7A7F83]"
        readOnly
        clickable
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
        onClick={() => openModal("properties")}
      />

      <Input
        label="Clients"
        value="3"
        name="clients"
        id="clients"
        type="text"
        labelStyle="text-[#7A7F83]"
        readOnly
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />

      <Input
        label="Sub-titans"
        value="8"
        name="subtitans"
        id="subtitans"
        type="text"
        labelStyle="text-[#7A7F83]"
        readOnly
        clickable
        onClick={() => openModal("subtitans")}
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />

      <Input
        label="Total revenue"
        value="₦17,000,000"
        name="totalRevenue"
        id="totalRevenue"
        type="text"
        labelStyle="text-[#7A7F83]"
        readOnly
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />

      <Input
        label="My referral commission"
        value="₦67,000"
        name="referralCommission"
        id="referralCommission"
        type="text"
        labelStyle="text-[#7A7F83]"
        readOnly
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />

      {isModalOpen && (
        <PageModal
          handleClose={closeModal}
          heading={
            modalType === "properties"
              ? "Properties Sold"
              : "Sub-titans"
          }
          className="max-w-[MIN(95%,620px)]"
        >
          <section className="flex flex-col w-full gap-4">
            {modalType === "properties" ? (
              <>
                <div className="text-sm text-gray-700">
                  <DataTable columns={columns} data={titanData} />
                </div>
              </>
            ) : (
              <>
                <div className="text-sm text-gray-700">
                  <DataTable columns={subTitanColumns} data={titanData} />
                </div>
              </>
            )}

            <div className="flex justify-end gap-4 items-center mt-4">
              <Button size="xs" outline variant="secondary" onClick={closeModal}>
                Close
              </Button>
              <Button size="xs">Export PDF</Button>
            </div>
          </section>
        </PageModal>
      )}
    </form>
  );
}
