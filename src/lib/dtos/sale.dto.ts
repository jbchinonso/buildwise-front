import { IReceipt } from "../type";
import { toAmount } from "../utils";

export const receiptDTO = (sale: IReceipt) => ({
  amount: sale?.amountDeposited,
  info: [
    {
      item: "client",
      label: "Client name",
      data: sale?.clientName || "N/A",
    },
    {
      item: "agent",
      data: sale?.agentName || "N/A",
    },
    {
      item: "property",
      data: sale?.propertyName || "N/A",
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
      data: toAmount(sale?.totalPaid || 0),
    },
    {
      item: "amount_due",
      label: "Amount due",
      data: toAmount(sale?.outstanding || 0),
    },
    {
      item: "amount_paid",
      label: "Amount paid",
      data: toAmount(sale?.amountDeposited || 0),
    },
  ],
});