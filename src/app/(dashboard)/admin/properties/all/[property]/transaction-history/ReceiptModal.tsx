"use client";
import { DashboardModal } from "@/components/dashboard";
import { Button } from "@/components/ui";
import { useExportPDF } from "@/lib/hooks";
import { toAmount } from "@/lib/utils";
import { TickCircle } from "iconsax-react";
import Image from "next/image";
import React, { useRef } from "react";

interface IProps {
  amount: number;
  data: {
    item: string;
    data?: string | number;
    label?: string;
  }[];
}

export const ReceiptModal = ({ data: receiptData, amount }: IProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { exportToPDF } = useExportPDF();

  const handleExportPDF = async () => {
    if (contentRef.current) {
      try {
        await exportToPDF(contentRef.current, {
          filename: "my-component.pdf",
        //   format: "a4",
          orientation: "portrait",
          quality: 2,
          margin: 20,
          width: 518,
          height:673
        });
      } catch (error) {
        console.error("Export failed:", error);
      }
    }
  };

  return (
    <DashboardModal
      backHref="?"
      heading="Receipt"
      className="sm:max-w-[MIN(90%,520px)]"
    >
      <div ref={contentRef} className="flex flex-col flex-1">
        <div className="flex flex-col mx-auto text-center">
          <h1 className="text-3xl font-bold">{toAmount(amount || 0)}</h1>
          <p className="flex items-center gap-1 text-sm text-grey-400">
            <TickCircle data-html2canvas-ignore size="12" color="#37d67a" />
            Successfully deposited
          </p>
        </div>
        <div className="flex flex-col flex-1 w-full gap-4 py-4 mt-auto">
          {receiptData.map((data, index) => {
            return (
              <div
                key={`${data?.item}-${index}`}
                className="flex items-center justify-between w-full p-2 border-b"
              >
                <p className="text-xs capitalize text-grey-400">
                  {data?.label || data?.item}
                </p>
                <p className="text-sm font-bold text-grey-600">{data?.data}</p>
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

          <Button onClick={handleExportPDF} variant="secondary" size="sm">
            Export PDF
          </Button>
        </div>
      </div>
    </DashboardModal>
  );
};
