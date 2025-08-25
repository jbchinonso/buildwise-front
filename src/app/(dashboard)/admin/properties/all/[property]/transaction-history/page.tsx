import { BreadCrumbs } from "@/components/ui";
import {
  getAllProperties,
  getProperty,
  getPropertySales,
  getReceiptData,
} from "@/lib/services";
import React from "react";
import { TransactionTable } from "./TransactionTable";
import { IPagination } from "@/lib/type";
import { toAmount } from "@/lib/utils";
import { IPropertySale } from "@/lib/dtos/property.dto";
import { ReceiptModal } from "./ReceiptModal";

type Params = Promise<{ property: string }>;

type SearchParams = Promise<{
  property: string;
  receipt: string;
  page: string | number;
  limit: string | number;
}>;

const TransactionHistory = async (props: {
  params: Params;
  searchParams: SearchParams;
}) => {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const propertyId = params.property;
  const property = await getProperty(propertyId);

  const { data = [], pagination = {} } = await getPropertySales({
    propertyId,
    params: searchParams,
  }); //NOTE change this to property transactions

  const sale = (data || []).find(
    (v: IPropertySale) => v._id === searchParams?.receipt
  );

  console.log({sale})

  let receiptData;

  if (sale) {
    const reciept = await getReceiptData(sale._id);
    receiptData = {
      amount: sale?.amountPaid,
      data: [
        {
          item: "client",
          label: "Client name",
          data:
            sale?.client || sale?.clientDetails
              ? `${sale?.clientDetails?.lastName} ${sale?.clientDetails?.firstName}`
              : "N/A",
        },
        {
          item: "agent",
          data:
            sale?.agent || sale?.agentDetails
              ? `${sale?.agentDetails?.lastName} ${sale?.agentDetails?.firstName}`
              : "N/A",
        },
        {
          item: "property",
          data: "Silvercrest vill",
        },
        {
          item: "units",
          data: sale?.plotNumber,
        },
        {
          item: "installment_period",
          label: "Instalment period",
          data: "18 May 2025 - 18 Nov 2026",
        },
        {
          item: "total_amount",
          label: "Total amount",
          data: "₦3,500,000",
        },
        {
          item: "amount_due",
          label: "Amount due",
          data: "₦1,500,000",
        },
        {
          item: "amount_paid",
          label: "Amount paid",
          data: toAmount(sale?.amountPaid || 0),
        },
      ],
    };
  }

  receiptData = sale
    ? {
        amount: sale?.amountPaid,
        data: [
          {
            item: "client",
            label: "Client name",
            data:
              sale?.client || sale?.clientDetails
                ? `${sale?.clientDetails?.lastName} ${sale?.clientDetails?.firstName}`
                : "N/A",
          },
          {
            item: "agent",
            data:
              sale?.agent || sale?.agentDetails
                ? `${sale?.agentDetails?.lastName} ${sale?.agentDetails?.firstName}`
                : "N/A",
          },
          {
            item: "property",
            data: "Silvercrest vill",
          },
          {
            item: "units",
            data: sale?.plotNumber,
          },
          {
            item: "installment_period",
            label: "Instalment period",
            data: "18 May 2025 - 18 Nov 2026",
          },
          {
            item: "total_amount",
            label: "Total amount",
            data: "₦3,500,000",
          },
          {
            item: "amount_due",
            label: "Amount due",
            data: "₦1,500,000",
          },
          {
            item: "amount_paid",
            label: "Amount paid",
            data: toAmount(sale?.amountPaid || 0),
          },
        ],
      }
    : null;

  return (
    <>
      <section className="flex flex-1 flex-col gap-4">
        <BreadCrumbs
          paths={[
            { title: "Home", path: "/admin/properties" },
            { title: "All Properties", path: "/admin/properties/all" },
            {
              title: property?.name || "Property",
              path: `/admin/properties/all/${propertyId}`,
            },
            {
              title: "Transaction History",
              path: `/admin/properties/all/${propertyId}/transaction-history`,
            },
          ]}
        />

        <TransactionTable data={data} />
      </section>
      {receiptData && (
        <ReceiptModal data={receiptData?.data} amount={receiptData?.amount} />
      )}
    </>
  );
};

export default TransactionHistory;
