"use client";
import { IBankRequest } from "@/lib/type";
import { getError, toAmount } from "@/lib/utils";
import { ArrowLeft2, ArrowRight2, NotificationBing } from "iconsax-react";
import { X } from "lucide-react";
import { DashboardModal } from "@/components/dashboard";
import { useModal } from "@/lib/hooks";
import { Avatar, Input, SubmitButton } from "@/components/ui";
import { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  approveBankRequest,
  declineBankRequest,
} from "@/lib/services/bank.service";

export const Banner = ({
  requests,
  totalUsers,
}: {
  requests: IBankRequest[];
  totalUsers: number;
}) => {
  const { isModalOpen, toggleModal } = useModal();
  const [currentPage, setCurrentPage] = useState(0);
  const total = requests?.length || 0;

  const handlePrev = useCallback(() => {
    if (currentPage <= 0 || total <= 1) return;
    setCurrentPage(currentPage - 1);
  }, [currentPage, total]);

  const handleNext = useCallback(() => {
    if (currentPage + 1 === total || total <= 1) return;
    setCurrentPage(currentPage + 1);
  }, [currentPage, total]);

  const currentRequest = useMemo(
    () => requests[currentPage],
    [currentPage, requests]
  );

  const approveRequest = async () => {
    toast.dismiss();
    try {
      await approveBankRequest(currentRequest?._id);
      toast.success("Bank request approved successfully");
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const declineRequest = async () => {
    toast.dismiss();
    try {
      await declineBankRequest(currentRequest?._id);
      toast.success("Bank request declined successfully");
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <>
      <div className="bg-[#292A2C] w-screen fixed top-10 left-0 p-4 z-100 flex">
        <div className="flex m-auto gap-6 items-center justify-center">
          <div className="text-[#F4BB1F] flex gap-2">
            <NotificationBing
              color="#F4BB1F"
              className="text-green-400"
              size={24}
            />
            <p>Important notification</p>
          </div>

          {totalUsers > 1 ? (
            <p className="text-white">
              ({toAmount(totalUsers, false)}) Agents are requesting a change of
              bank account
            </p>
          ) : (
            <p className="text-white">
              Sodik Nwachukwu is requesting a change of bank account
            </p>
          )}

          <button
            onClick={toggleModal}
            className="text-[#F4BB1F] text-sm py-2 p-4 border border-transparent hover:border-[#F4BB1F] rounded-lg"
          >
            View Request
          </button>
          <button
            type="button"
            className="absolute z-10 cursor-pointer text-white top-4 right-6 place-self-end "
            //   onClick={closeModal}
          >
            <X color="currentColor" className="text-xl" />
          </button>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <DashboardModal
          handleClose={toggleModal}
          heading="Change bank request"
          className="lg:max-w-[MIN(90%,520px)]"
        >
          <div className="flex flex-col w-full gap-4">
            <div className="flex w-full gap-4">
              <div className="flex flex-col items-start gap-4">
                <Avatar
                  name="Sodik Nwachukwu"
                  className="lg:flex-col items-start gap-1"
                  id={currentRequest?.userId}
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {currentRequest?.oldBankDetails && (
                <div className="flex gap-2 text-sm flex-col w-full rounded-lg border p-4">
                  <p>Old Account</p>
                  <Input
                    label="Bank"
                    readOnly
                    defaultValue={currentRequest?.oldBankDetails?.bankName}
                  />
                  <Input
                    label="Account Number"
                    readOnly
                    defaultValue={currentRequest?.oldBankDetails?.accountNumber}
                  />
                </div>
              )}
              <div className="flex gap-2 text-sm flex-col w-full rounded-lg border p-4">
                <p>New account</p>
                <Input
                  label="Bank"
                  readOnly
                  defaultValue={currentRequest?.bankName}
                />
                <Input
                  label="Account Number"
                  readOnly
                  defaultValue={currentRequest?.accountNumber}
                />
              </div>
            </div>

            {/* PAGINATION */}
            {total > 1 && (
              <Pagination
                handleNext={handleNext}
                handlePrev={handlePrev}
                total={total}
                currentPage={currentPage}
              />
            )}
            {/* BUTTONS  */}
            <div className="flex item-center w-full gap-4 my-4">
              <form action={declineRequest} className="flex-1">
                <SubmitButton
                  variant="secondary"
                  className="text-red-500 w-full "
                >
                  Decline
                </SubmitButton>
              </form>
              <form action={approveRequest} className="flex-1">
                <SubmitButton className="w-full">Approve</SubmitButton>
              </form>
            </div>
          </div>
        </DashboardModal>
      )}
    </>
  );
};

interface IProps {
  saleId?: string;
  // data?: {
  //   item: string;
  //   data?: string | number;
  //   label?: string;
  // }[];
}

export const BankRequestPreviewModal = ({ saleId }: IProps) => {
  return (
    <DashboardModal
      backHref="?"
      heading="Receipt"
      className="lg:max-w-[MIN(90%,520px)]"
    ></DashboardModal>
  );
};

const Pagination = ({
  total,
  currentPage,
  handlePrev,
  handleNext,
}: {
  total: number;
  currentPage: number;
  handlePrev: () => void;
  handleNext: () => void;
}) => {
  return (
    <div className="flex mx-auto w-full justify-center gap-3 items-center">
      <button
        disabled={currentPage <= 0}
        type="button"
        onClick={handlePrev}
        className="rounded-full p-2 text-black disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ArrowLeft2 color="currentColor" size="18" className="" />
      </button>
      <p>
        {currentPage + 1} of {total}
      </p>
      <button
        disabled={currentPage + 1 === total}
        type="button"
        onClick={handleNext}
        className="rounded-full p-2 text-black  disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ArrowRight2 color="currentColor" size="18" className="" />
      </button>
    </div>
  );
};
