"use server";
import { updateTag } from "next/cache";
import { baseUrl, CACHETAGS, getError } from "../utils";
import { authFetch } from "./auth.service";
import { IClientPaymentData, IPagination, IReceipt } from "../type";
import { receiptDTO } from "../dtos/sale.dto";
import { IUpdatePaymentPayload } from "../types/titan";

interface ISalePayload {
  propertyId: string;
  clientId: string;
  agentId: string;
  plotNumber: number | string;
  unitNumber: string;
  plotSize: number | string;
  amountPaid: number | string;
  price?: number | string;
  instalmentDuration?: string | number;
  paymentPlan?: string;
  paymentDate: string;
}

export const createSale = async (sale: ISalePayload) => {
  try {
    const response = await baseUrl.post("/sales", sale);
    updateTag(`${CACHETAGS.properties}-${sale.propertyId}`);
    updateTag(`${CACHETAGS.sales}-${sale.clientId}`);
    updateTag(CACHETAGS.property_sale);
    updateTag(CACHETAGS.sales);
    updateTag(CACHETAGS.properties);
    updateTag(CACHETAGS.titans);
    return response?.data;
  } catch (error) {
    return { error: getError(error) };
    throw getError(error);
  }
};

export const getActiveAgents = async () => {
  try {
    const response = await authFetch("/sales/active-agent", {
      next: {
        revalidate: 8400,
        tags: [CACHETAGS.titans],
      },
    });

    return response; //{ data, ...pagination };
  } catch (error) {
    console.error("Error fetching agents:", getError(error));
    throw new Error(getError(error));
  }
};

export const getPropertySales = async ({
  propertyId,
  params = {
    page: 1,
    limit: 10,
  },
}: {
  propertyId: string;
  params: IPagination;
}) => {
  try {
    const url = `/sales/${propertyId}/sales?page=${params?.page || 1}&limit=${
      params?.limit || 10
    }`;

    const { data, ...pagination } = await authFetch(url, {
      next: {
        revalidate: 8400,
        tags: [CACHETAGS.property_sale],
      },
    });

    return { data, pagination };
  } catch (error) {
    console.error("Error fetching sales:", getError(error));
    throw new Error(getError(error));
  }
};

export const getReceiptData = async (saleId?: string) => {
  try {
    const url = `/receipts/transaction/${saleId}`;

    const response = await authFetch(url, {
      next: {
        revalidate: 8400,
        tags: [CACHETAGS.receipts],
      },
    });

    return receiptDTO(response as IReceipt);
  } catch (error) {
    console.error("Error fetching sales:", getError(error));
    throw new Error(getError(error));
  }
};

export const getClientPaymentData = async (clientId: string) => {
  try {
    if (!clientId?.trim()) return;

    const url = `/sales/clients/${clientId}/payments/`;

    const response = await authFetch(url, {
      next: {
        revalidate: 8400,
        tags: [CACHETAGS.sales],
      },
    });

    return response as IClientPaymentData;
    // NOTE: I am getting the data but it doesnt match the UI, no property name, id, agent name, id
    
  } catch (error) {
    console.error("Error fetching client payments:", getError(error));
    throw new Error(getError(error));
  }
};

export const getPropertyUnitsSoldOrReserved = async ({
  params = {
    page: 1,
    limit: 5,
    search: "",
    sortBy: "plotNumber",
    sortOrder: "asc",
  },
}: {
  params: {
    page?: number | string;
    limit?: number | string;
    search?: string;
    sortBy?: string;
    sortOrder?: string;
  };
}) => {
  try {
    const query = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      query.set(key, String(value));
    });

    const url = `/sales/units-sold-reserved/?${query.toString()}`;
    const { data, ...pagination } = await authFetch(url, {
      next: {
        tags: [CACHETAGS.sales],
        revalidate: 8400,
      },
    });
    return { data, pagination };
  } catch (error) {
    throw getError(error);
  }
};

export const updatePayment = async (payload: IUpdatePaymentPayload) => {
  try {
    const response = await baseUrl.post("/sales/update-payment", payload);

    updateTag(CACHETAGS.sales);
    return response.data;
  } catch (error) {
    console.error("Error updating payment:", getError(error));
    return { error: getError(error) };
  }
};
