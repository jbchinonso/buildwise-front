"use server";

import { revalidateTag } from "next/cache";
import { baseUrl, getError } from "../utils";
import { authFetch } from "./auth.service";
import { URLSearchParams } from "url";

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

    const { data, ...pagination } = await authFetch(
      `/client?${query.toString()}`,
      {
        next: {
          tags: ["clients"],
          revalidate: 8400,
        },
      }
    );
    return { data, pagination };
  } catch (error) {
    return {error}
    // 
    throw getError(error);
  }
};

export const getClient = async (id: string) => {
  try {
    const data = await authFetch(`/client/${id}`, {
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
    const response = await baseUrl.post("/client", client);
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
