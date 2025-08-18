"use server";

import { revalidateTag } from "next/cache";
import { baseUrl, getError } from "../utils";
import { authFetch } from "./auth.service";
import { URLSearchParams } from "url";
import { IClientOverview, IClientRecentlyReserved } from "../type";

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

    const url = `/clients?${query.toString()}`;


    const { data, ...pagination } = await authFetch(
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
