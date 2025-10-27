import { toAmount } from "@/lib/utils";
import { Button, Input } from "../ui";
import { IClientProperty } from "@/lib/type";
import { AddPropertyModal } from "./AddPropertyModal";

export const ClientProperties = ({
  properties = [],
  property = 1,
}: {
  properties: IClientProperty[];
  property?: string | number;
}) => {
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
  return (
    <div className="flex flex-wrap justify-between gap-4 gap-x-20 w-full">
      <Input
        label="State"
        type="text"
        readOnly
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
        defaultValue={property?.state}
      />
      <Input
        label="Property"
        type="text"
        readOnly
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
        defaultValue={property?.propertyName}
      />
      <Input
        label="Property Size"
        type="text"
        readOnly
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
        defaultValue={property?.unitNumber}
      />
      <Input
        label="Property ID"
        type="text"
        readOnly
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
        defaultValue={property?.plotNumber}
      />
      <Input
        label="Payment Plan"
        type="text"
        readOnly
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
        defaultValue={property?.paymentPlan}
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
    </div>
  );
};
