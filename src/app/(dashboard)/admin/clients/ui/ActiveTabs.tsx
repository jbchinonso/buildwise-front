"use client";

import { IClientProperty } from "@/lib/type";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

const PROPERTY_KEY = "property";

export const ActiveTabs = ({
  properties = [],
}: {
  properties?: IClientProperty[];
}) => {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get(PROPERTY_KEY) || "";
  const router = useRouter();

  const switchTab = useCallback(
    (id?: string) => {
      const url = new URLSearchParams(searchParams);
      if (activeTab === id) {
        return;
      } else if (id) {
        url.set(PROPERTY_KEY, id);
      } else {
        url.delete(PROPERTY_KEY);
      }

      router.replace(`?${url.toString()}`, { scroll: false });
    },
    [searchParams, activeTab]
  );

  return (
    <div className="flex gap-2 p-2 text-sm rounded-3xl bg-grey-50">
      <button
        data-ui={!activeTab ? "active" : ""}
        onClick={() => switchTab()}
        className="p-4 py-2 rounded-3xl data-active:bg-white active:text-primary-400 hover:bg-white"
      >
        All transactions
      </button>
      {properties?.map((property, index) => {
        const propertyId =
          property?.id || property?.propertyId || `${index + 1}`;
        const propertyName = property?.propertyName || `Property-${index}`;
        const plotNumber = property?.plotNumber || "";
        return (
          <button
            title={`${propertyName} - ${plotNumber}`}
            key={propertyId}
            data-ui={activeTab === propertyId ? "active" : ""}
            onClick={() => switchTab(propertyId)}
            className="p-4 py-2 rounded-3xl data-active:bg-white active:text-primary-400 hover:bg-white"
          >
            {propertyName}
          </button>
        );
      })}
    </div>
  );
};
