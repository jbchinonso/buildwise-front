"use server";
import { revalidateTag } from "next/cache";
import { baseUrl, getError } from "../utils";
import { authFetch } from "./auth.service";
import { IClientPaymentData, IPagination } from "../type";

interface ISalePayload {
  propertyId: string;
  clientId: string;
  agentId: string;
  plotNumber: number | string;
  unitNumber: string;
  plotSize: string;
  amountPaid: number | string;
  price: number | string;
  instalmentDuration?: string;
  paymentPlan: string;
  paymentDate: string;
}

export const createSale = async (sale: ISalePayload) => {
  try {
    const response = await baseUrl.post("/sales", sale);
    revalidateTag("sales");
    return response?.data;
  } catch (error) {
    throw getError(error);
  }
};

export const getActiveAgents = async () => {
  try {
    const response = await authFetch("/sales/active-agent", {
      next: {
        revalidate: 8400,
        tags: ["agents"],
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
        tags: ["property-sales"],
      },
    });

    return { data, pagination };
  } catch (error) {
    console.error("Error fetching sales:", getError(error));
    throw new Error(getError(error));
  }
};

export const getReceiptData = async ({ salesId }: { salesId: string }) => {
  try {
    const url = `/receipts/transaction/${salesId}`;

    const response = await authFetch(url, {
      next: {
        revalidate: 8400,
        tags: ["receipts"],
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching sales:", getError(error));
    throw new Error(getError(error));
  }
};

export const getClientPaymentData = async ({ clientId }: { clientId: string }) => {
  try {
    const url = `/sales/clients/${clientId}/payments/`;

    const response = await authFetch(url, {
      next: {
        revalidate: 8400,
        tags: ["sales"],
      },
    });

    return response as IClientPaymentData[]; 
    // NOTE: I am getting the data but it doesnt match the UI
  } catch (error) {
    console.error("Error fetching client payments:", getError(error));
    throw new Error(getError(error));
  }
};
