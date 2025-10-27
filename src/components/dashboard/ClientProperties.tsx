"use client";
import { toAmount } from "@/lib/utils";
import { Button, Input } from "../ui";
import { IClientProperty } from "@/lib/type";
import { AddPropertyModal } from "./AddPropertyModal";
import { useSearchParams } from "next/navigation";

export const ClientProperties = ({
  properties = [],
}: {
  properties: IClientProperty[];
}) => {
  const searchParams = useSearchParams();
  const property = Number(searchParams.get("property") || 1);

  const selectedProperty = properties?.[Number(property || 1) - 1];

  return (
    <div className="flex flex-1 flex-wrap justify-between gap-4 gap-x-20 w-full">
      <div className="flex gap-4">
        <div className="w-fit rounded-full border p-2 flex gap-1 bg-[rgba(232,233,235,1)]">
          {(properties || [])?.map((v, i) => (
            <Button
              asLink
              href={`?property=${i + 1}`}
              replace={true}
              scroll={false}
              key={v?.propertyName + i}
              size="xs"
              className="!text-xs"
              variant={property == i + 1 ? "primary" : "secondary"}
            >
              Property {i + 1}
            </Button>
          ))}
        </div>

        <AddPropertyModal isMini />
      </div>

      <PropertyPreview property={selectedProperty} />
    </div>
  );
};

const PropertyPreview = ({ property }: { property: IClientProperty }) => {
  if (!property) return null;
  return (
    <div className="flex flex-wrap justify-between gap-4 gap-x-20 w-full">
      <Input
        label="State"
        type="text"
        readOnly
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
        value={property?.state}
      />
      <Input
        label="Property"
        type="text"
        readOnly
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
        value={property?.propertyName}
      />
      <Input
        label="Property Size"
        type="text"
        readOnly
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
        value={property?.unitNumber}
      />
      <Input
        label="Property ID"
        type="text"
        readOnly
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
        value={property?.plotNumber}
      />
      <Input
        label="Payment Plan"
        type="text"
        readOnly
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
        value={property?.paymentPlan}
      />
      <Input
        label="Total paid"
        type="text"
        readOnly
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
        value={toAmount(property?.amountPaid || 0)}
      />
      <Input
        label="Outstanding payment"
        type="text"
        readOnly
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
        value={toAmount(property?.outstandingPayment || 0)}
      />
      <Input
        label="Payment due"
        type="text"
        readOnly
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
        value={toAmount(property?.paymentDue || 0)}
      />
    </div>
  );
};
