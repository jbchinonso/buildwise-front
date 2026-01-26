"use client";
import { DataTable } from "@/components/dashboard";
import { ReceiptModal } from "@/components/dashboard/ReceiptModal";
import { DataTableColumnHeader } from "@/components/ui";
import { IPaginationResponse, IPaymentHistoryTransaction } from "@/lib/type";
import { cn, formatDate, toAmount } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IClientProperty } from "@/lib/type";

const columns: (
  toggleModal: (id: string) => void,
) => ColumnDef<IPaymentHistoryTransaction>[] = (
  toggleModal: (id: string) => void,
) => [
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => <div>{formatDate(row.getValue("date"))}</div>,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => <div>{toAmount(row.getValue("amount"))}</div>,
  },
  {
    accessorKey: "property",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Property" />
    ),
    cell: ({ row }) => {
      return <div>{row.getValue("property")}</div>;
    },
  },
  {
    accessorKey: "plotNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Plot No." />
    ),
    cell: ({ row }) => <div>{row.getValue("plotNumber")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <div
        className={cn({
          "text-[#09A4B9]": row.getValue("status") == "Confirmed",
        })}
      >
        {row.getValue("status")}
      </div>
    ),
  },

  {
    id: "actions",
    header: () => null,
    cell: ({ row }) => {
      const id = String(row?.original?.saleId || row?.original?._id) || "";

      return (
        <div className="flex justify-center px-4">
          <button
            onClick={() => toggleModal(id)}
            type="button"
            id="button"
            className="flex items-center gap-1"
          >
            View receipt <ChevronRight className="size-4" />
          </button>
        </div>
      );
    },
  },
];

const RECEIPT_KEY = "receipt";
export const PaymentHistoryTable = ({
  data = [],
  pagination,
}: {
  data: IPaymentHistoryTransaction[];
  pagination?: IPaginationResponse;
}) => {
  const searchParams = useSearchParams();
  const receipt = searchParams.get(RECEIPT_KEY) || "";
  const router = useRouter();

  const toggleModal = useCallback(
    (saleId: string) => {
      const url = new URLSearchParams(searchParams);

      if (receipt) {
        url.delete(RECEIPT_KEY);
      } else {
        url.set(RECEIPT_KEY, saleId);
      }

      router.replace(`?${url.toString()}`);
    },
    [searchParams, receipt, router],
  );

  return (
    <>
      <DataTable
        columns={columns(toggleModal)}
        data={data}
        pagination={pagination}
      />
      {Boolean(receipt) && <ReceiptModal saleId={receipt} />}
    </>
  );
};

const PROPERTY_KEY = "property";

export const ActiveTabs = ({
  properties = [],
}: {
  properties?: {
    _id: string;
    name: string;
  }[];
}) => {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get(PROPERTY_KEY) || "";
  const router = useRouter();

  const switchTab = useCallback(
    (id?: string, plotNumber?: string) => {
      const url = new URLSearchParams(searchParams);
      if (activeTab === id) {
        return;
      } else if (id) {
        url.set(PROPERTY_KEY, id);
      } else {
        url.delete(PROPERTY_KEY);
      }

      router.replace(`?${url.toString()}`, { scroll: false });
    },

    [searchParams, activeTab, router],
  );


  return (
    <div className="flex gap-2 p-2 text-sm rounded-3xl bg-grey-50 max-w-fit">
      <button
        data-ui={!activeTab ? "active" : ""}
        onClick={() => switchTab()}
        className="p-4 py-2 rounded-3xl data-active:bg-white active:text-primary-400 hover:bg-white"
      >
        All transactions
      </button>
      {properties?.sort((a, b)=>a.name.localeCompare(b.name))?.map((property, index) => {
        const propertyId = property?._id ?? `${index + 1}`;
        const propertyName = property?.name ?? `Property-${index}`;
        const isActive = activeTab === propertyId ? "active" : "";

        return (
          <button
            title={propertyName}
            key={propertyId}
            data-ui={isActive}
            onClick={() => switchTab(propertyId)}
            className="p-4 py-2 rounded-3xl data-active:bg-white active:text-primary-400 hover:bg-white"
          >
            {propertyName}
          </button>
        );
      })}
    </div>
  );
};
