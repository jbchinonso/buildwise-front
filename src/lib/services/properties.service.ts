"use server";

import { revalidateTag } from "next/cache";
import { baseUrl, getError } from "../utils";
import { authFetch } from "./auth.service";

export const getAllProperties = async ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}) => {
  try {
    const { data, ...pagination } = await authFetch(
      `/properties?page=${page}&limit=${limit}`,
      {
        next: {
          tags: ["properties"],
          revalidate: 8400,
        },
      }
    );
    return { data, pagination };
  } catch (error) {
    throw getError(error);
  }
};

export const getTopSellingProperties = async ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}) => {
  try {
    const response = await authFetch(
      `/properties/top-selling?page=${page}&limit=${limit}`,
      {
        next: {
          tags: ["properties"],
          revalidate: 8400,
        },
      }
    );
    return response
  } catch (error) {
    throw getError(error);
  }
};

export const getRecentlyListedProperties = async ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}) => {
  try {
    const response = await authFetch(
      `/properties/recently-listed?page=${page}&limit=${limit}`,
      {
        next: {
          tags: ["properties"],
          revalidate: 8400,
        },
      }
    );
    return response
  } catch (error) {
    throw getError(error);
  }
};

export const getProperty = async (id: string) => {
  try {
    const data = await authFetch(`/properties/${id}`, {
      next: {
        tags: ["property"],
        revalidate: 8400,
      },
    });
    return data;
  } catch (error) {
    throw getError(error);
  }
};

interface ICreatePropertyPayload {
  firstName: string;
  lastName: string;
  state: string;
  lga: string;
  agentId: string;
  phoneNumber: string;
  email: string;
  residentialAddress: string;
}

export const addProperty = async (client: ICreatePropertyPayload) => {
  try {
    const response = await baseUrl.post("/properties", client);
    revalidateTag("properties");
    return response?.data;
  } catch (error) {
    throw getError(error);
  }
};
