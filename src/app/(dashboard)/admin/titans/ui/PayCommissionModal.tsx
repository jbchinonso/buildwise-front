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
import { updateTitanCommission } from "@/lib/services";
import { IOption, ITitanCommission, ITitanProfile } from "@/lib/type";
import { copyTextToClipboard, getError, toAmount } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Files } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

interface IToggleProps {
  id: string;
  status: string;
}

const columns: ColumnDef<ITitanCommission>[] = [
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
        <ToggleStatus
          id={(row.getValue("commissionId") as string) || ""}
          status={status}
        />
      );
    },
  },
];

const ToggleStatus = ({
  id,
  status,
}: {
  id: string;
  status: "paid" | "unpaid" | string | undefined;
}) => {
  const [localStatus, setLocalStatus] = useState(status);

  const update = async () => {
    toast.dismiss();
    try {
      if (localStatus === status || !localStatus) return;
      const response = await updateTitanCommission(id, localStatus);
      toast.success("Commission updated successfully");
      setLocalStatus(response?.status)
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const onChange = useCallback((option: IOption) => {
    setLocalStatus(option.value as string);
  }, []);

  useEffect(() => {
    setLocalStatus(status as string);
    console.log("Mounted")
  }, []);

  return (
    <>
      <form action={update} className="flex gap-2">
        <CustomDropdown
          update={onChange}
          title={localStatus}
          className={`text-center capitalize w-[90px] rounded-full px-2 py-0.5 text-[#292A2C] ${
            String(localStatus).toLowerCase() == "paid"
              ? "bg-[#70F41F]"
              : "bg-[#F4BB1F] "
          }`}
          options={[
            { label: "Paid", value: "paid" },
            { label: "Unpaid", value: "unpaid" },
          ]}
        />

        {localStatus && localStatus !== status && (
          <SubmitButton size="xs" className="!text-sm  !py-0.5">
            Update
          </SubmitButton>
        )}
      </form>
    </>
  );
};

export const PayCommissionModal = ({
  bankAccount = "",
  titan,
  commissions = [],
}: {
  bankAccount?: string;
  titan?: Partial<ITitanProfile & { fullName?: string }>;
  commissions?: ITitanCommission[];
}) => {
  const { isModalOpen, toggleModal, closeModal } = useModal();

  const tableData = useMemo<ITitanCommission[]>(
    () => [...(commissions || [])],
    [commissions]
  );

  const unpaidCommissions = useMemo(
    () =>
      (commissions || [])?.filter(
        (commission) => commission?.status === "unpaid"
      )?.length,
    [commissions]
  );

  return (
    <>
      <Button size="sm" onClick={toggleModal}>
        Pay Commission {unpaidCommissions ? `(${unpaidCommissions})` : ""}
      </Button>

      {isModalOpen && (
        <DashboardModal
          heading={"Pay agent's commissions"}
          handleClose={closeModal}
          className="lg:max-w-[MIN(90%,924px)]"
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
                  <p className="font-semibold text-sm lg:text-base">
                    {bankAccount}
                  </p>
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
            <div className="flex w-full">
              <DataTable columns={columns} data={tableData} />
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
            </div>
          </div>
        </DashboardModal>
      )}
    </>
  );
};
