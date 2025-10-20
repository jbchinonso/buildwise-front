"use client";
import { DashboardModal } from "@/components/dashboard";
import { cn, copyTextToClipboard, formatDate, toAmount } from "@/lib/utils";
import { Copy } from "iconsax-react";
import { useSearchParams } from "next/navigation";

export const CommissionDetails = () => {
  const searchParams = useSearchParams();
  const commissionId = searchParams.get("commission") || "";

  const data = [
    {
      label: "Type",
      data: "Sales Commission",
    },
    {
      label: "Status",
      data: "Paid",
      className: "text-[rgba(79,171,21,1)]",
    },
    {
      label: "Commission ID",
      data: "383838873",
      canCopy: true,
    },
    {
      label: "Date",
      data: formatDate(new Date().toISOString(), "dd MMM yyyy - hh:mma"),
    },
    {
      label: "Client",
      data: "Ben White",
    },
    {
      label: "Property",
      data: "Silvercrest Vill",
    },
    {
      label: "Plot number",
      data: "Plot 104",
    },
    {
      label: "Property price",
      data: toAmount(0),
    },
    {
      label: "Amount deposited",
      data: toAmount(0),
    },
    {
      label: "Commission paid",
      data: toAmount(0),
    },
  ] as any;

  return (
    commissionId && (
      <DashboardModal backHref="?" heading="Commission details">
        <div className="flex flex-col flex-1">
          <div className="flex sr-only flex-col mx-auto text-center">
            <h1 className="text-3xl font-bold">
              {/* {toAmount(data?.amount || 0)} */}
            </h1>
          </div>
          <div className="flex flex-col flex-1 w-full gap-4 py-4 mt-auto">
            {data?.map((item: any, index: number) => {
              return (
                <div
                  key={`${item?.data}-${index}`}
                  className={
                    "flex items-center justify-between w-full p-2 border-b"
                  }
                >
                  <p className="text-xs capitalize text-grey-400">
                    {item?.label || item?.data}
                  </p>
                  <p
                    className={cn(
                      "text-sm font-bold text-grey-600 flex items-center gap-1",
                      item?.className || ""
                    )}
                  >
                    {item?.data}
                    {item?.canCopy && (
                      <button
                        onClick={() =>
                          copyTextToClipboard(
                            item?.data || "",
                            item?.label || ""
                          )
                        }
                        type="button"
                        name="Copy"
                        className=""
                      >
                        <Copy size={14} color="currentColor" />
                      </button>
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </DashboardModal>
    )
  );
};
