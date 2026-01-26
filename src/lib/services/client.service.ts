"use server";

import { revalidateTag, updateTag } from "next/cache";
import { baseUrl, CACHETAGS, getError, getMonth } from "../utils";
import { authFetch } from "./auth.service";
import { URLSearchParams } from "url";
import {
  IActiveTitanClient,
  IClientOverview,
  IClientProperty,
  IClientRecentlyReserved,
  IClientRecentTransactions,
  IPagination,
  IPaymentHistorySales,
  IPaymentHistoryTransaction,
  IPaymentHistoryTransactionDTO,
  IRecentClients,
  ITitanClientSummary,
  ITitanClosedSales,
  ITitanClosedSalesPiechart,
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
          tags: [CACHETAGS.clients],
          revalidate: 8400,
        },
      }
      // NOTE: This need to match the UI especially payments
    );
    return { data, pagination };
  } catch (error) {
    console.log({errrorrrrr: error})
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
    revalidateTag(CACHETAGS.clients, "max");
    updateTag(CACHETAGS.clients);

    return response?.data;
  } catch (error) {
    return { error: getError(error) };
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
export const getRecentClients = async () => {
  try {
    const { data = [] } = await authFetch("/titans/recent-clients", {
      next: {
        tags: [CACHETAGS.clients],
        revalidate: 8400,
      },
    });

    return data as IRecentClients[];
  } catch (error) {
    // console.log({ERRRRRRROORRR: getError(error)})
    throw getError(error);
  }
};

export const getAllTitanClients = async () => {
  try {
    const { data, ...pagination } = await authFetch("/titans/all-client", {
      next: {
        tags: [CACHETAGS.clients],
        revalidate: 8400,
      },
    });

    return { data, pagination };
  } catch (error) {
    throw getError(error);
  }
};

export const getTitanClientProfile = async (id: string) => {
  try {
    const response = await authFetch(`/clients/personal-info/${id}`, {
      next: {
        tags: [`${CACHETAGS.clients}-${id}`],
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

export const getTitanClientProfileProperty = async (id: string) => {
  try {
    const response = await authFetch(`/clients/${id}/properties`, {
      next: {
        tags: [`${CACHETAGS.clients}-${id}`, CACHETAGS.sales, CACHETAGS.properties],
        revalidate: 8400,
      },
    });

    return response as IClientProperty[];
  } catch (error) {
    throw getError(error);
  }
};

export const getTitanClientPaymentHistory = async (
  id: string,
  propertyId: string=""
) => {
  const query = propertyId? `?propertyId=${propertyId}`: ""
  try {
    const response = await authFetch(
      `/clients/${id}/payment-history/${query}`,
      {
        next: {
          tags: [`${CACHETAGS.clients}-${id}-payment`, CACHETAGS.payments],
          revalidate: 8400,
        },
      }
    );

    const sales = response?.transactions as IPaymentHistoryTransaction[];
    const availableProperties = response?.availableProperties as {
      _id: string;
      name: string;
    }[];
    const pagination = response?.pagination as IPagination

    // const uniquePropertiesMap = new Map();

    // const allTransactions =
    //   sales.reduce((acc, cv) => {
    //     const transactions = cv?.transactions?.map((v) => {
    //       return {
    //         propertyId: cv?.property?._id,
    //         property: cv?.property?.name,
    //         date: v?.createdAt,
    //         amount: v?.amountPaid,
    //         plotNumber: cv?.plotNumber,
    //         status: v?.status,
    //         id: v?._id,
    //       };
    //     });

    //     const propertyId = cv.property?._id;
    //     const propertyName = cv.property?.name;
    //     const plotNumber = cv?.plotNumber || "N/A";

    //     if (!uniquePropertiesMap.has(propertyId)) {
    //       uniquePropertiesMap.set(propertyId, {
    //         propertyId,
    //         propertyName,
    //         plotNumber,
    //       });
    //     }

    //     return [...acc, ...transactions];
    //   }, [] as IPaymentHistoryTransactionDTO[]) || [];
    return {
      sales,
      pagination,
      availableProperties,
      // properties: Array.from(uniquePropertiesMap.values()) || [],
    };
  } catch (error) {
    throw getError(error);
  }
};

export const getTitanClientOverview = async () => {
  try {
    const response = await authFetch("/titans/active-clients-summary", {
      next: {
        tags: [CACHETAGS.clients],
        revalidate: 8400,
      },
    });

    return response?.data as ITitanClientSummary;

  } catch (error) {
    throw getError(error);
  }
};

export const getActiveTitanClient = async () => {
  try {
    const response = await authFetch("/titans/active-clients", {
      next: {
        tags: [CACHETAGS.clients],
        revalidate: 8400,
      },
    });

    return {
      clients: response?.data || [],
      meta: response?.meta || { total: 0 },
    } as { clients: IActiveTitanClient[]; meta: { total: number } };
  } catch (error) {
    throw getError(error);
  }
};

export const getTitanClientOverviewSummary = async () => {
  try {
    const response = await authFetch("/titans/dashboard/summary", {
      next: {
        revalidate: 8400,
        tags: ["dashboard"],
      },
    });

    return response as {
      totalClients: number;
      totalProperties: number;
      closedSales: number;
      activeBuyers: number;
      totalRevenue: number;
    };
  } catch (error) {
    console.error("Error fetching titans:", getError(error));
    throw new Error(getError(error));
  }
};
