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
    revalidateTag("sales");
    revalidateTag("property-sales");
    revalidateTag(`property-${sale.propertyId}`);
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

export const getClientPaymentData = async ({
  clientId,
}: {
  clientId: string;
}) => {
  try {
    if (!clientId?.trim()) return;

    const url = `/sales/clients/${clientId}/payments/`;

    console.log({ url });

    const response = await authFetch(url, {
      next: {
        revalidate: 8400,
        tags: ["sales"],
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
        tags: ["sales"],
        revalidate: 8400,
      },
    });
    return { data, pagination };
  } catch (error) {
    throw getError(error);
  }
};
