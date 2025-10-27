"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";


export const ActiveTabs = ({
  properties = [],
}: {
  properties: {
    propertyId: string;
    propertyName: string;
  }[];
}) => {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("property") || 0;
 
  return (
    <div className="flex gap-2 p-2 text-sm rounded-3xl bg-grey-50">
      <Link
        href={"?"}
        data-ui={activeTab == 0 ? "active" : ""}
        replace
        className="p-4 py-2 rounded-3xl data-active:bg-white active:text-primary-400 hover:bg-white"
      >
        All transactions
      </Link>
      {properties?.map(({ propertyId, propertyName }) => (
        <Link
          href={`?property=${propertyId}`}
          key={propertyId}
          replace
          data-ui={activeTab == propertyId ? "active" : ""}
          className="p-4 py-2 rounded-3xl data-active:bg-white active:text-primary-400 hover:bg-white"
        >
          {propertyName}
        </Link>
      ))}
    </div>
  );
};
