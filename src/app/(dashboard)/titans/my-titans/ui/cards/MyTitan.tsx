"use client";
import {
  DashboardStatsCard,
  DataTable,
  PageModal,
} from "@/components/dashboard";

import { Button, DataTableColumnHeader, Table } from "@/components/ui";
import { useModal } from "@/lib/hooks";
import { ArrowRight, Profile2User } from "iconsax-react";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";


type Transaction = {
  id: string;
  titan: string;
  sales: string;
  revenue: string;
  commission: string;
  joined: string;
  status: string;
  // instalment: string;
  // payment_status: string;
};
const titanData: Transaction[] = [
  {
    id: "1",
    titan: "Robert Fox",
    sales: "--",
    revenue: "--",
    commission: "--",
    joined: "Today",
    status: "Pending",
  },
  {
    id: "2",
    titan: "Annette Black",
    sales: "4",
    revenue: "₦17,000,000",
    commission: "₦83,500",
    joined: "2yrs ago",
    status: "Active",
  },
  {
    id: "3",
    titan: "Cody Fisher",
    sales: "1",
    revenue: "₦17,000,000",
    commission: "₦83,500",
    joined: "1y 5m ago",
    status: "Suspended",
  },
  {
    id: "4",
    titan: "Jerome Bell",
    sales: "3",
    revenue: "₦17,000,000",
    commission: "₦83,500",
    joined: "1y 5m ago",
    status: "Active",
  },
  {
    id: "5",
    titan: "Floyd Miles",
    sales: "3",
    revenue: "₦17,000,000",
    commission: "₦83,500",
    joined: "1y 5m ago",
    status: "Active",
  },
  {
    id: "6",
    titan: "Courtney Henry",
    sales: "3",
    revenue: "₦17,000,000",
    commission: "₦83,500",
    joined: "1y 5m ago",
    status: "Active",
  },
  {
    id: "7",
    titan: "Albert Flores",
    sales: "3",
    revenue: "₦17,000,000",
    commission: "₦83,500",
    joined: "1y 5m ago",
    status: "Active",
  },
  {
    id: "8",
    titan: "Jacob Jones",
    sales: "3",
    revenue: "₦17,000,000",
    commission: "₦83,500",
    joined: "1y 5m ago",
    status: "Active",
  },
  {
    id: "9",
    titan: "Arlene McCoy",
    sales: "3",
    revenue: "₦17,000,000",
    commission: "₦83,500",
    joined: "1y 5m ago",
    status: "Active",
  },
  {
    id: "10",
    titan: "Dianne Russell",
    sales: "3",
    revenue: "₦17,000,000",
    commission: "₦83,500",
    joined: "1y 5m ago",
    status: "Active",
  },
  {
    id: "11",
    titan: "Wade Warren",
    sales: "3",
    revenue: "₦17,000,000",
    commission: "₦83,500",
    joined: "1y 5m ago",
    status: "Active",
  },
];


const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "titan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Titan" />
    ),
    cell: ({ row }) => <div>{row.getValue("titan")}</div>,
  },
  {
    accessorKey: "sales",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sales" />
    ),
    cell: ({ row }) => <div>{row.getValue("sales")}</div>,
  },
  {
    accessorKey: "revenue",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Revenue" />
    ),
    cell: ({ row }) => <div>{row.getValue("revenue")}</div>,
  },
  {
    accessorKey: "commission",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="My Commission" />
    ),
    cell: ({ row }) => <div>{row.getValue("commission")}</div>,
  },
  {
    accessorKey: "joined",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Joined" />
    ),
    cell: ({ row }) => <div>{row.getValue("joined")}</div>,
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
      const router = useRouter(); // keep inside cell scope if using App Router
      const titanId = row.original.id;
  
      return (
        <button
          onClick={() => router.push("/titans/my-titans/titan-profile/")}
          className="flex items-center justify-center"
        >
          <ChevronRight className="size-4 text-gray-500 hover:text-gray-800 transition" />
        </button>
      );
    },
  },
];
// onClick={() => router.push(`/titans/my-titans/titan-profile/${titanId}`)}
export const MyTitan = ({ data }: { data: Transaction[] }) => {
  const { isModalOpen, toggleModal, closeModal } = useModal();
  return (
    <>
      <DashboardStatsCard
        title="My Titans"
        icon={<Profile2User size="24" color="#926667"  />}
        data="15"
        theme=""
        onClick={toggleModal}
      />

      {isModalOpen && (
        <PageModal
          handleClose={closeModal}
          heading="My Titans Overview"
          className="max-w-[MIN(95%,620px)]"
        >
          <section className="flex flex-col w-full gap-4 ">
            <div className="flex w-full rounded-xl text-xs py-[10px] flex-wrap bg-primary-50 p-3 text-white">
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">My Titans</p>
                <p className="text-grey-600 font-medium">15</p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Commission from Titans</p>
                <p className="text-grey-600 font-medium">300,050</p>
              </div>
              <div className="flex flex-col flex-[25] gap-2">
                <p className="text-grey-400">Titans total revenue</p>
                <p className="text-grey-600 font-medium">220,000,000</p>
              </div>
            </div>

            <div className="flex items-baseline justify-between w-full gap-4">
              
            </div>

            <div className="w-full my-2">
              <DataTable columns={columns} data={titanData} />
            </div>

            <div className="flex justify-end gap-4 items-center">
              <Button size="xs" outline variant="secondary">
                Close
              </Button>

              <Button size="xs">Export PDF</Button>
            </div>
          </section>
        </PageModal>
      )}
    </>
  );
};
