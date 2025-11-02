import { IReceipt } from "../type";
import { formatDate, toAmount } from "../utils";

export const receiptDTO = (sale: IReceipt) => ({
  amount: sale?.amountDeposited,
  info: [
    {
      item: "date",
      label: "Date",
      data: formatDate(sale?.date, "dd, MMM yyyy"),
    },
    {
      item: "client",
      label: "Client name",
      data: sale?.clientName || "N/A",
    },
    {
      item: "property",
      data: sale?.propertyName || "N/A",
    },
    // {
    //   item: "agent",
    //   data: sale?.agentName || "N/A",
    // },
    {
      item: "Plot number",
      data: sale?.plotNumber,
    },
    // {
    //   item: "installment_period",
    //   label: "Instalment period",
    //   data: sale?.installment||"N/A",
    // },
    {
      item: "amountDeposited",
      label: "Amount deposited",
      data: toAmount(sale?.amountDeposited || 0),
    },
    {
      item: "totalPaid",
      label: "Total amount",
      data: toAmount(sale?.totalPaid || 0),
    },
    {
      item: "outstanding",
      label: "Outstanding",
      data: toAmount(sale?.outstanding || 0),
    },
  ],
});