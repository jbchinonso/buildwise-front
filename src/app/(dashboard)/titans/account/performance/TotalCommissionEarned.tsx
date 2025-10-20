"use client";
import { DataTable, PageModal } from "@/components/dashboard";
import { DataTableColumnHeader, Input } from "@/components/ui";
import { useClientFetch, useModal } from "@/lib/hooks";
import { toAmount } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { CommissionDetails } from "./CommissionDetails";
import { getTotalCommissions } from "@/lib/services";

type Commission = {
  id: string;
  type: string;
  commission: string;
  commissionID: string;
  status: string;
};

const columns: ColumnDef<Commission>[] = [
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => <div>{row.getValue("type")}</div>,
  },
  {
    accessorKey: "commission",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Commission" />
    ),
    cell: ({ row }) => <div>{row.getValue("commission")}</div>,
  },
  {
    accessorKey: "commissionID",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Commission ID" />
    ),
    cell: ({ row }) => <div>{row.getValue("commissionID")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
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
          <Link href={`?commission=${id}`} id="button">
            <ChevronRight className="size-4" />
            <span className="sr-only">View details</span>
          </Link>
        </div>
      );
    },
  },
];

const TotalCommissionEarned = ({
  totalCommissionEarned,
}: {
  totalCommissionEarned: string | number;
}) => {
  const { isModalOpen, toggleModal, closeModal } = useModal();

  const {
    data,
    isLoading,
    // error: clientsError,
  } = useClientFetch({
    action: async () => {
      const res = await getTotalCommissions();
      return res?.data as {
        total: number;
        currentPage: number;
        totalPages: number;
        commissions: [];
      };
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
          label="Total commission earned"
          readOnly
          onClick={toggleModal}
          containerStyle="cursor-pointer"
          className="cursor-pointer"
          defaultValue={toAmount(totalCommissionEarned || 0)}
          rightIcon={<ChevronRight className="size-4" color="currentColor" />}
        />
      </div>

      <CommissionDetails />

      {isModalOpen && (
        <PageModal
          handleClose={closeModal}
          heading="Total commission earned"
          className="max-w-[MIN(100%,600px)]"
        >
          <section className="flex flex-col w-full gap-4">
            <div className="w-full my-1 flex-1">
              <DataTable columns={columns} data={data?.commissions || []} />
            </div>
          </section>
        </PageModal>
      )}
    </>
  );
};

export default TotalCommissionEarned;
