"use server";

import { revalidateTag } from "next/cache";
import { baseUrl, getError } from "../utils";
import { authFetch } from "./auth.service";

export const getAllClients = async ({
  page = 1,
  limit = 5,
}: {
  page?: number;
  limit?: number;
}) => {
  try {
    const { data, ...pagination } = await authFetch(
      `/client?page=${page}&limit=${limit}`,
      {
        next: {
          tags: ["clients"],
          revalidate: 8400,
        },
      }
    );
    return { data, pagination };
  } catch (error) {
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
