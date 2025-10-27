"use client";
import { DashboardModal } from "@/components/dashboard";
import { Button, Logo, TableSkeleton } from "@/components/ui";
import { useClientFetch, useExportPDF } from "@/lib/hooks";
import { getReceiptData } from "@/lib/services";
import { getError, toAmount } from "@/lib/utils";
import { TickCircle } from "iconsax-react";
import Image from "next/image";
import React, { useCallback, useRef } from "react";
import toast from "react-hot-toast";

interface IProps {
  saleId: string;
  // data?: {
  //   item: string;
  //   data?: string | number;
  //   label?: string;
  // }[];
}

export const ReceiptModal = ({ saleId }: IProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { exportToPDF } = useExportPDF();

  const { data, isLoading, error } = useClientFetch({
    action: async () => await getReceiptData(saleId),
    isModalOpen: true,
  });

  const handleExportPDF = useCallback(async () => {
    try {
      if (!data) {
        throw new Error("Receipt data not found");
      } else if (contentRef.current) {
        await exportToPDF(contentRef.current, {
          filename: `buildwise_receipt_${saleId}.pdf`,
          //   format: "a4",
          orientation: "portrait",
          quality: 2,
          margin: 20,
          width: 518,
          height: 700,
        });
      }
    } catch (error) {
      console.error("Export failed:", error);
      toast.error(getError(error));
    }
  }, [contentRef.current, data]);

  return (
    <DashboardModal
      backHref="?"
      heading="Receipt"
      className="sm:max-w-[MIN(90%,520px)]"
    >
      {isLoading ? (
        <TableSkeleton />
      ) : error ? (
        <p className="p-4 m-auto">An error occured fetching receipt data</p>
      ) : (
        <div ref={contentRef} className="flex flex-col flex-1">
          <Logo className="my-1" />
          <div  className="flex sr-only flex-col mx-auto text-center">
            <h1 className="text-3xl font-bold">
              {toAmount(data?.amount || 0)}
            </h1>
            <p className="flex items-center gap-1 text-sm text-grey-400">
              <TickCircle size="12" color="#37d67a" />
              Successfully deposited
            </p>
          </div>
          <div className="flex flex-col flex-1 w-full gap-4 py-4 mt-auto">
            {data?.info.map((data, index) => {
              return (
                <div
                  key={`${data?.item}-${index}`}
                  className="flex items-center justify-between w-full p-2 border-b"
                >
                  <p className="text-xs capitalize text-grey-400">
                    {data?.label || data?.item}
                  </p>
                  <p className="text-sm font-bold text-grey-600">
                    {data?.data}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="relative flex w-full my-4">
            <Image
              src="/image/sign.png"
              alt=""
              width={100}
              height={100}
              style={{ width: "auto", height: "auto" }}
            />
          </div>
          <div
            data-html2canvas-ignore
            className="flex mt-auto py-4 gap-4 justify-stretch w-full *:w-full"
          >
            <Button
              asLink
              href="?"
              variant="secondary"
              size="sm"
              className="px-8"
            >
              Send to Client Email
            </Button>

            <Button
              disabled={
                isLoading ||
                Boolean(error) ||
                !data ||
                !Boolean(contentRef?.current)
              }
              onClick={handleExportPDF}
              variant="secondary"
              size="sm"
            >
              Export PDF
            </Button>
          </div>
        </div>
      )}
    </DashboardModal>
  );
};
