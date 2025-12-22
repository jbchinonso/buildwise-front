"use client";
import { toAmount } from "@/lib/utils";
import { Button, Input, TabButton } from "../ui";
import { IClientProperty } from "@/lib/type";
import { AddPropertyModal } from "./AddPropertyModal";
import { useSearchParams } from "next/navigation";

export const ClientProperties = ({
  properties = [],
  canAdd = true,
}: {
  properties: IClientProperty[];
  canAdd?: boolean;
}) => {
  const searchParams = useSearchParams();
  const property = Number(searchParams.get("property") || 1);

  const selectedProperty = properties?.[Number(property || 1) - 1];

  // console.log({selectedProperty})

  return (
    <div className="flex flex-1 flex-wrap justify-between gap-4 gap-x-20 w-full">
      <div className="flex gap-4 max-w-full overflow-x-auto py-1">
        <div className="w-fit rounded-full border flex gap-1 bg-[rgba(232,233,235,1)] overflow-x-auto max-w-full">
          <div className="w-fit rounded-full border p-2 flex gap-1 overflow-x-auto max-w-full">
            {(properties || [])?.map((_property, i) => (
              <TabButton
                href={`?property=${i + 1}`}
                key={_property?.propertyName + i}
                isActive={property == i + 1}
                title={
                  _property?.propertyName
                    ? `${_property?.propertyName} - Plot ${_property?.plotNumber}`
                    : `Property ${i + 1}`
                }
              >
                {_property?.propertyName ? (
                  <span className="max-w-full block overflow-ellipsis whitespace-nowrap line-clamp-1">
                    {_property?.propertyName}
                  </span>
                ) : (
                  `Property ${i + 1}`
                )}
              </TabButton>
            ))}
          </div>
        </div>

        {canAdd && <AddPropertyModal isMini />}
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
        defaultValue={toAmount(property?.amountPaid || 0)}
      />
      <Input
        label="Outstanding payment"
        type="text"
        readOnly
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
        defaultValue={toAmount(property?.outstandingPayment || 0)}
      />
      <Input
        label="Payment due"
        type="text"
        readOnly
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
        defaultValue={toAmount(property?.paymentDue || 0)}
      />
      <Input
        label="Client"
        type="text"
        readOnly
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
        defaultValue={property?.clientId}
      />
    </div>
  );
};
