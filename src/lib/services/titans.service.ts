import { getError } from "../utils";
import { authFetch } from "./auth.service";

export const getTitans = async (
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

    const url = `/titans/all/?${query.toString()}`;

    const response = await authFetch(url, {
      next: {
        revalidate: 8400,
        tags: ["titans"],
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching titans:", getError(error));
    throw new Error(getError(error));
  }
};

export const getTitanStats = async () => {
  try {
    const response = await authFetch("/titans/titan-counts", {
      next: {
        revalidate: 8400,
        tags: ["titans"],
      },
    });

    return response?.data as {
      totalTitans: number;
      activeTitans: number;
      inactiveTitans: number;
    };
  } catch (error) {
    console.error("Error fetching titans:", getError(error));
    throw new Error(getError(error));
  }
};
