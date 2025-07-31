"use server";

import { revalidateTag } from "next/cache";
import { baseUrl, getError } from "../utils";
import { authFetch } from "./auth.service";
import { ICreatePropertyPayload, IPagination, IProperty } from "../type";

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

    return response as {
      totalProperties: number;
      totalAvailableUnits: number;
      totalReservedUnits: number;
      closedSales: number;
    };
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

    return []
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
