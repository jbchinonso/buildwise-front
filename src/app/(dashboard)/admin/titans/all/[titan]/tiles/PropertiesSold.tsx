"use client";
import { DashboardTileCard, DataTable, PageModal } from "@/components/dashboard";
import { DataTableColumnHeader } from "@/components/ui";
import { useModal } from "@/lib/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "iconsax-react";
import { ChevronRight } from "lucide-react";


export type Transaction = {
  id: string;
  property: string;
  buyer: string;
  properties_sold: number;
  commission: string;
  price: string;
  unit: string;
  payment_status: string;
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "property",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Property" />
    ),
    cell: ({ row }) => <div>{row.getValue("property")}</div>,
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
    accessorKey: "commission",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Commission" />
    ),
    cell: ({ row }) => <div>{row.getValue("commission")}</div>,
  },
  {
    accessorKey: "payment_status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment Status" />
    ),
    cell: ({ row }) => (
      <div
        className={`text-center ${
          row.getValue("payment_status") == "Active" ? "text-[#09A4B9]" : ""
        }`}
      >
        {row.getValue("payment_status")}
      </div>
    ),
  },

  {
    // id: "actions",
    accessorKey: "id",
    header: () => null,
    cell: ({ row }) => {
      const id = String(row.getValue("id")) || String(row?.id);

      return (
        <div className="flex justify-center px-4">
          <Link href={`/admin/titans/all/${id}`} id="button">
            <ChevronRight className="size-4" />
            <span className="sr-only">View details</span>
          </Link>
        </div>
      );
    },
  },
];

export const PropertiesSold = ({
  data,
  className,
  propertiesSold=[],
}: {
  data?: string | number;
  propertiesSold?: any[];
  className?: string;
}) => {
  const { isModalOpen, closeModal, toggleModal } = useModal();
  return (
    <>
      <DashboardTileCard
        label="Properties sold"
        data={data}
        className={className}
        onClick={toggleModal}
      />

      {isModalOpen && (
        <PageModal
          handleClose={closeModal}
          heading="Properties Sold"
          // className="max-w-[MIN(95%,600px)]"
        >
          <section className="flex flex-col w-full gap-4 ">
            <div className="flex w-full rounded-xl text-xs py-[10px] flex-wrap bg-primary-50 p-3 text-white">
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Properties sold</p>
                <p className="text-grey-600">4</p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Total value</p>
                <p className="text-grey-600">₦20,208,009</p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Paid</p>
                <p className="text-grey-600">₦51,208,009</p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Outstanding</p>
                <p className="text-grey-600">₦51,208,009</p>
              </div>
            </div>

            <div className="w-full my-2">
              <DataTable columns={columns} data={propertiesSold} />
            </div>
          </section>
        </PageModal>
      )}
    </>
  );
};
