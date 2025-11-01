"use client";
import { TabButton } from "@/components/ui";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export const ActiveTabs = ({
  properties = [],
}: {
  properties: {
    propertyId: string;
    propertyName: string;
    plotNumber: string | number;
  }[];
}) => {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("property") || 0;

  return (
    <div className="w-fit text-sm rounded-full border flex gap-1 bg-grey-50 overflow-x-auto max-w-full">
      <div className="w-fit rounded-full border p-2 flex gap-1 overflow-x-auto max-w-full">
        <TabButton isActive={activeTab == 0} href="?" title="All transactions">
          All transactions
        </TabButton>

        {properties?.map(
          ({ propertyId, propertyName, plotNumber = "N/A" }, index) => (
            <TabButton
              key={propertyId}
              isActive={activeTab == propertyId}
              href={`?property=${propertyId}`}
              title={
                propertyName
                  ? `${propertyName} - Plot ${plotNumber}`
                  : `Property ${index + 1}`
              }
            >
              {propertyName || `Property ${index + 1}`}
            </TabButton>
          )
        )}
      </div>
    </div>
  );
};
