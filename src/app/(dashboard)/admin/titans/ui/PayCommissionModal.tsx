"use client";
import { DashboardModal, DataTable } from "@/components/dashboard";
import {
  Avatar,
  Button,
  CustomDropdown,
  DataTableColumnHeader,
  SubmitButton,
} from "@/components/ui";
import { useModal } from "@/lib/hooks";
import { ITitanCommission, ITitanProfile } from "@/lib/type";
import { copyTextToClipboard, toAmount } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Files } from "lucide-react";
import { useEffect, useState } from "react";

interface IToggleProps {
  id: string;
  status: string;
}
const columns: (
  toggleStatus: (props: IToggleProps) => void
) => ColumnDef<ITitanCommission>[] = (
  toggleStatus: (props: IToggleProps) => void
) => [
  {
    accessorKey: "clientName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Client" />
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("clientName")}</div>
    ),
  },
  {
    accessorKey: "payment",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment" />
    ),
    cell: ({ row }) => <div>{toAmount(row.getValue("payment") || 0)}</div>,
  },
  {
    accessorKey: "commissionAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Commission" />
    ),
    cell: ({ row }) => <div>{toAmount(row.getValue("commissionAmount"))}</div>,
  },
  {
    accessorKey: "commissionId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Commission ID" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        {row.getValue("commissionId")}
        <button
          onClick={() => {
            copyTextToClipboard(row.getValue("commissionId"));
          }}
          className="border cursor-pointer border-transparent hover:text-green-500 rounded aspect-square px-2 p-0.5"
        >
          <Files
            size={14}
            color="currentColor"
            className="text-inherit text-xs my-auto  aspect-square"
          />
        </button>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = (row.getValue("status") as string) || "";
      return (
        <div
          className={`text-center capitalize w-[90px] rounded-full px-1 p-0.5 text-[#292A2C] ${
            String(status).toLowerCase() == "paid"
              ? "bg-[#70F41F]"
              : "bg-[#F4BB1F] "
          }`}
        >
          <CustomDropdown
            update={(option) =>
              toggleStatus({
                id: row.getValue("commissionId"),
                status: option.value || "",
              })
            }
            title={status}
            className="w-full"
            options={[
              { label: "Paid", value: "paid" },
              { label: "Unpaid", value: "unpaid" },
            ]}
          />
          {/* {row.toggleSelected} */}
        </div>
      );
    },
  },
];

export const PayCommissionModal = ({
  bankAccount = "O70 3456 6543",
  titan,
  commissions = [],
}: {
  bankAccount?: string;
  titan?: Partial<ITitanProfile & { fullName?: string }>;
  commissions?: ITitanCommission[];
}) => {
  const { isModalOpen, toggleModal, closeModal } = useModal();
  const [tableData, setTableData] = useState<ITitanCommission[]>([
    ...(commissions || []),
  ]);
  const [editedRows, setEditedRows] = useState<
    Record<string, ITitanCommission>
  >({});

  const toggleStatus = ({ id, status }: IToggleProps) => {
    setTableData((prev) =>
      prev.map((row) =>
        row.commissionId === id
          ? { ...row, status } // ← update the value
          : row
      )
    );

    setEditedRows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        status,
      },
    }));
  };

  const updateCommission = async () => {
    console.log({ editedRows });
  };

  useEffect(() => {
    if (!isModalOpen && Object.values(editedRows)?.length) {
      setEditedRows({});
      setTableData([...commissions]);
    }
  }, [isModalOpen, editedRows]);

  return (
    <>
      <Button size="sm" onClick={toggleModal}>
        Pay Commission {commissions?.length && `(${commissions?.length})`}
      </Button>

      {isModalOpen && (
        <DashboardModal
          heading={"Pay agent's commissions"}
          handleClose={closeModal}
          className="sm:max-w-[MIN(90%,924px)]"
        >
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-wrap gap-4 items-baseline justify-between">
              <Avatar
                name={titan?.fullName}
                id={titan?._id}
                className="lg:flex-col items-start gap-1"
              />

              <div className="flex gap-4 border rounded-xl p-4 py-2 flex-1 lg:max-w-fit justify-between">
                <div>
                  <p className="text-[#7A7F83] text-xs">Bank account</p>
                  <p className="font-semibold text-sm lg:text-base">{bankAccount}</p>
                </div>

                <button
                  onClick={() => {
                    copyTextToClipboard(bankAccount);
                  }}
                  className="border cursor-pointer border-transparent hover:border-grey-50 rounded aspect-square px-2 p-0.5"
                >
                  <Files
                    size={14}
                    className="text-[#292A2C] text-xs my-auto  aspect-square"
                  />
                </button>
              </div>
            </div>
            <div className="flex w-full bg-red-300">
              <DataTable columns={columns(toggleStatus)} data={tableData} />
            </div>
            <div className="flex gap-4 lg:justify-end mt-10">
              <Button
                onClick={closeModal}
                variant="secondary"
                size="sm"
                className="px-8 w-full lg:max-w-fit"
              >
                Cancel
              </Button>
              <form action={updateCommission}>
                <SubmitButton size="sm" className="w-full lg:max-w-fit">
                  Update Payment
                </SubmitButton>
              </form>
            </div>
          </div>
        </DashboardModal>
      )}
    </>
  );
};
