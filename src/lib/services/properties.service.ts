"use server";

import { revalidateTag } from "next/cache";
import { baseUrl, getError } from "../utils";
import { authFetch } from "./auth.service";
import {
  ICreatePropertyPayload,
  IMostAvailableUnits,
  IPagination,
  IProperty,
  IPropertyClientOwnership,
  IPropertySummary,
} from "../type";

export const getAllProperties = async ({
  page = 1,
  limit = 10,
}: IPagination = {}) => {
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

export const getPropertiesSummary = async () => {
  try {
    const response = await authFetch(`/properties/summary`, {
      next: {
        tags: ["properties"],
        revalidate: 8400,
      },
    });

    return response as IPropertySummary;
  } catch (error) {
    throw getError(error);
  }
};

export const getTopSellingProperties = async ({
  page = 1,
  limit = 10,
}: IPagination = {}) => {
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
    return response;
  } catch (error) {
    throw getError(error);
  }
};

export const getRecentlyListedProperties = async ({
  page = 1,
  limit = 10,
}: IPagination = {}) => {
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

    return response;
  } catch (error) {
    throw getError(error);
  }
};

export const getAvailableProperties = async ({
  page = 1,
  limit = 10,
}: IPagination = {}) => {
  try {
    const response = await authFetch(
      `/properties/most-available-units?page=${page}&limit=${limit}`,
      {
        next: {
          tags: ["properties"],
          revalidate: 8400,
        },
      }
    );
    return response;
  } catch (error) {
    throw getError(error);
  }
};

export const getReservedProperties = async ({
  page = 1,
  limit = 10,
}: IPagination = {}) => {
  try {
    const response = await authFetch(
      `/properties/recently-reserved?page=${page}&limit=${limit}`,
      {
        next: {
          tags: ["properties"],
          revalidate: 8400,
        },
      }
    );
    return response;
  } catch (error) {
    return [];
    throw getError(error);
  }
};

export const addProperty = async (property: ICreatePropertyPayload) => {
  try {
    const response = await baseUrl.post("/properties", property);
    revalidateTag("properties");
    return response?.data;
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
    return data as IProperty;
  } catch (error) {
    throw getError(error);
  }
};

export const getClientAndOwnership = async (
  params: {
    id: number | string;
    page?: number | string;
    limit?: number | string;
    search?: string;
  } = { page: 1, limit: 5, search: "", id: "" }
) => {
  try {
    const query = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (key != "id") {
        query.set(key, String(value));
      }
    });

    // NOTE??  this endpoint is not paginated, but the UI is
    const response = await authFetch(
      `/properties/${params.id}/clients-ownership?${query.toString()}`,
      {
        next: {
          tags: ["property"],
          revalidate: 8400,
        },
      }
    );

    const { data, ...pagination } = response;

    return response as IPropertyClientOwnership[];
  } catch (error) {
    throw getError(error);
  }
};

export const getMostAvaliableUnits = async (
  params: {
    id: number | string;
    page?: number | string;
    limit?: number | string;
    search?: string;
  } = { page: 1, limit: 5, search: "", id: "" }
) => {
  try {
    const query = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (key != "id") {
        query.set(key, String(value));
      }
    });

    // NOTE??  this is supposed to be paginated and in an array
    const response = await authFetch(
      `/properties/most-available-units?${query.toString()}`,
      {
        next: {
          tags: ["property"],
          revalidate: 8400,
        },
      }
    );

    const { data, ...pagination } = response;

    return response as IMostAvailableUnits[];
  } catch (error) {
    throw getError(error);
  }
};
