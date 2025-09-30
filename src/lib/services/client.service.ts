"use server";

import { revalidateTag } from "next/cache";
import { baseUrl, getError } from "../utils";
import { authFetch } from "./auth.service";
import { URLSearchParams } from "url";
import {
  IClientOverview,
  IClientRecentlyReserved,
  IClientRecentTransactions,
  IPaymentHistorySales,
  IPaymentHistoryTransactionDTO,
  IUser,
} from "../type";

export const getAllClients = async (
  params: {
    page?: number | string;
    limit?: number | string;
    search?: string;
  } = { page: 1, limit: 5, search: "" }
) => {
  try {
    const query = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      query.set(key, String(value));
    });

    const url = `/clients/get-details/?${query.toString()}`;

    const { data, pagination } = await authFetch(
      url,
      {
        next: {
          tags: ["clients"],
          revalidate: 8400,
        },
      }
      // NOTE: This need to match the UI especially payments
    );
    return { data, pagination };
  } catch (error) {
    throw getError(error);
  }
};

export const getClient = async (id: string) => {
  try {
    const data = await authFetch(`/clients/${id}`, {
      next: {
        tags: ["client"],
        revalidate: 8400,
      },
    });
    return data;
  } catch (error) {
    throw getError(error);
  }
};

interface ICreateClientPayload {
  firstName: string;
  lastName: string;
  state: string;
  lga: string;
  agentId: string;
  phoneNumber: string;
  email: string;
  residentialAddress: string;
}

export const addClient = async (client: ICreateClientPayload) => {
  try {
    const response = await baseUrl.post("/clients", client);
    revalidateTag("clients");
    return response?.data;
  } catch (error) {
    throw getError(error);
  }
};

export const getClientSummary = async () => {
  try {
    const response = await authFetch(`/sales/client-stat-summary`, {
      next: {
        tags: ["client"],
        revalidate: 8400,
      },
    });

    return response as {
      totalClients: number;
      totalReservedProperties: number;
      totalCompletedSales: number;
    };
  } catch (error) {
    throw getError(error);
  }
};

export const getClientStats = async () => {
  try {
    const response = await authFetch(`/clients/stats`, {
      next: {
        tags: ["client"],
        revalidate: 8400,
      },
    });

    return response as {
      totalClients: number;
      totalReserved: number;
      totalClosed: number;
    };
  } catch (error) {
    throw getError(error);
  }
};

export const getClientOverview = async () => {
  try {
    const response = await authFetch(`/clients/overview`, {
      next: {
        tags: ["client"],
        revalidate: 8400,
      },
    });

    return response as IClientOverview;
    // NOTE: need to return client id at /clients/overview
    // NOTE: confirm totalPropertiesBoughtOrReserved is amount and not count
  } catch (error) {
    throw getError(error);
  }
};

export const getClientRecentlyReserved = async () => {
  try {
    const response = await authFetch("/clients/recently-reserved", {
      next: {
        tags: ["client"],
        revalidate: 8400,
      },
    });

    return response as IClientRecentlyReserved[];
  } catch (error) {
    throw getError(error);
  }
};

export const getTitanClientRecentTransactions = async () => {
  try {
    const response = await authFetch("/titans/recent-transactions", {
      next: {
        tags: ["transactions"],
        revalidate: 8400,
      },
    });

    return response as IClientRecentTransactions[];
  } catch (error) {
    throw getError(error);
  }
};

export const getAllTitanClients = async () => {
  try {
    const response = await authFetch("/titans/all-client", {
      next: {
        tags: ["clients"],
        revalidate: 8400,
      },
    });

    return response;
  } catch (error) {
    throw getError(error);
  }
};

export const getTitanClientProfile = async (id: string) => {
  try {
    const response = await authFetch(`/clients/personal-info/${id}`, {
      next: {
        tags: ["clients-" + id],
        revalidate: 8400,
      },
    });

    return response as {
      _id: string;
      firstName: string;
      lastName: string;
      state: string;
      lga: string;
      phoneNumber: string;
      email: string;
      residentialAddress: string;
    };
  } catch (error) {
    throw getError(error);
  }
};

export const getTitanClientPaymentHistory = async (id: string) => {
  try {
    const response = await authFetch(`/clients/${id}/payment-history`, {
      next: {
        tags: ["clients-" + id + "-payment", "payments"],
        revalidate: 8400,
      },
    });

    const sales = response?.sales as IPaymentHistorySales[];

    const uniquePropertiesMap = new Map();

    const allTransactions =
      sales.reduce((acc, cv) => {
        const transactions = cv?.transactions?.map((v) => {
          return {
            propertyId: cv?.property?._id,
            property: cv?.property?.name,
            date: v?.createdAt,
            amount: v?.amountPaid,
            plotNumber: cv?.plotNumber,
            status: v?.status,
            id: v?._id,
          };
        });

        const propertyId = cv.property?._id;
        const propertyName = cv.property?.name;

        if (!uniquePropertiesMap.has(propertyId)) {
          uniquePropertiesMap.set(propertyId, {
            propertyId,
            propertyName,
          });
        }

        return [...acc, ...transactions];
      }, [] as IPaymentHistoryTransactionDTO[]) || [];

    return {
      allTransactions,
      properties: Array.from(uniquePropertiesMap.values()) || [],
    };
  } catch (error) {
    throw getError(error);
  }
};
