"use server";
import { IPagination, SubTitan } from "../type";
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

    return response as {
      data: any[];
      pagination: IPagination;
    };
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

export const getTitanSummary = async () => {
  try {
    const response = await authFetch("/titans/titan-network-summary", {
      next: {
        revalidate: 8400,
        tags: ["titans"],
      },
    });

    return response as {
      totalTitans: number;
      titanCommission: number;
      subTitanCommission: number;
    };
  } catch (error) {
    console.error("Error fetching titans:", getError(error));
    throw new Error(getError(error));
  }
};

export const getTopPerformingTitans = async () => {
  try {
    const response = await authFetch("/titans/top-performing-titans", {
      next: {
        revalidate: 8400,
        tags: ["titans"],
      },
    });

    return { data: response };
  } catch (error) {
    return { error: getError(error) };
    console.error("Error fetching titans:", getError(error));
    throw new Error(getError(error));
  }
};

export const getTitansOverviewSummary = async () => {
  try {
    const response = await authFetch("/titans/overview/summary", {
      next: {
        revalidate: 8400,
        tags: ["titans"],
      },
    });

    return response as {
      titanCommission: number;
      titanRevenue: number;
      totalTitans: number;
    };
  } catch (error) {
    return { error: getError(error) };
    // console.error("Error fetching titans:", getError(error));
    // throw new Error(getError(error));
  }
};

export const getTitansCommissionSummary = async () => {
  try {
    const response = await authFetch("/titans/commissions/summary", {
      next: {
        revalidate: 8400,
        tags: ["titans"],
      },
    });

    return response as {
      totalCommission: number;
      titanCommission: number;
      subTitanCommission: number;
      bonusCommission: number;
    };
  } catch (error) {
    return { error: getError(error) };
    // console.error("Error fetching titans:", getError(error));
    // throw new Error(getError(error));
  }
};

export const getTitansCommissionChart = async () => {
  try {
    const response = await authFetch("/titans/commissions/chart", {
      next: {
        revalidate: 8400,
        tags: ["titans"],
      },
    });

    return response as any[];
  } catch (error) {
    return { error: getError(error) };
    // console.error("Error fetching titans:", getError(error));
    // throw new Error(getError(error));
  }
};

export const getTitansCommissionListt = async () => {
  try {
    const response = await authFetch("/titans/commissions/chart", {
      next: {
        revalidate: 8400,
        tags: ["titans"],
      },
    });

    return response as any[];
  } catch (error) {
    return { error: getError(error) };
    // console.error("Error fetching titans:", getError(error));
    // throw new Error(getError(error));
  }
};

export const getTitansCommissionList = async () => {
  try {
    const response = await authFetch("/titans/commissions/recent", {
      next: {
        revalidate: 8400,
        tags: ["titans"],
      },
    });

    console.log({ response });

    return response as any[];
  } catch (error) {
    return { error: getError(error) };
    // console.error("Error fetching titans:", getError(error));
    // throw new Error(getError(error));
  }
};

export const getTitansOverviewList = async () => {
  try {
    const response = await authFetch("/titans/overview/list", {
      next: {
        revalidate: 8400,
        tags: ["titans"],
      },
    });

    return {
      response: response?.data,
      meta: response?.meta,
    } as {
      response: any[];
      meta: IPagination;
    };
  } catch (error) {
    return { error: getError(error) };
    // console.error("Error fetching titans:", getError(error));
    // throw new Error(getError(error));
  }
};

export const getTitanPropertiesSold = async (titan?: string) => {
  try {
    const response = await authFetch(`/titans/${titan}/properties-sold`, {
      next: {
        revalidate: 8400,
        tags: ["titans"],
      },
    });

    return response;
  } catch (error) {
    return { error: getError(error) };
    // console.error("Error fetching titans:", getError(error));
    // throw new Error(getError(error));
  }
};

export const getTitanSubTitans = async (titan?: string) => {
  try {
    const response = await authFetch(`/titans/${titan}/sub-titans`, {
      next: {
        revalidate: 8400,
        tags: ["titans"],
      },
    });

    return response as SubTitan[];
  } catch (error) {
    // return { error: getError(error) };
    // console.error("Error fetching titans:", getError(error));
    throw new Error(getError(error));
  }
};

export const getPropertiesSold = async () => {
  try {
    const { data: properties, meta } = await authFetch(
      "/titans/properties-sold",
      {
        next: {
          revalidate: 8400,
          tags: ["properties"],
        },
      }
    );

    return { properties, meta };
  } catch (error) {
    // return { error: getError(error) };
    // console.error("Error fetching titans:", getError(error));
    throw new Error(getError(error));
  }
};

export const getTitanPropertiesSummary = async () => {
  try {
    const response = await authFetch("/titans/properties-summary", {
      next: {
        revalidate: 8400,
        tags: ["properties"],
      },
    });

    return response as {
      closedSales: number;
      totalAvailableUnits: number;
      totalReservedUnits: number;
      totalSoldUnits: number;
      totalUnits: number;
    };
  } catch (error) {
    // return { error: getError(error) };
    // console.error("Error fetching titans:", getError(error));
    throw new Error(getError(error));
  }
};

export const getTitanActivities = async () => {
  try {
    const response = await authFetch("/activity/activities");
    return response as any[];
  } catch (error) {
    throw new Error(getError(error));
  }
};
