import { BreadCrumbs } from "@/components/ui";
import { getAllProperties, getProperty } from "@/lib/services";
import React from "react";
import { TransactionTable } from "./TransactionTable";

type Params = Promise<{ property: string }>;

const TransactionHistory = async (props: { params: Params }) => {
  const params = await props.params;
  const id = params.property;

  const property = await getProperty(id);

  const { data = [], pagination = {} } = await getAllProperties({}); //NOTE change this to property transactions

  return (
    <section className="flex flex-1 flex-col gap-4">
      <BreadCrumbs
        paths={[
          { title: "Home", path: "/admin/properties" },
          { title: "All Properties", path: "/admin/properties/all" },
          {
            title: property?.name || "Property",
            path: `/admin/properties/all/${id}`,
          },
          {
            title: "Transaction History",
            path: `/admin/properties/all/${id}/transaction-history`,
          },
        ]}
      />

      <TransactionTable data={data} />
    </section>
  );
};

export default TransactionHistory;
