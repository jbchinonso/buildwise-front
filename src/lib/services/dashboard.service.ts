"use server";
import { IPagination } from "../type";
import { CACHETAGS, getError } from "../utils";
import { authFetch } from "./auth.service";

export const getDashboardData = async (): Promise<{
  data?: any;
  error?: string;
}> => {
  try {
    const response = await authFetch("/dashboard/overview", {
      next: {
        revalidate: 8400,
        tags: [
          CACHETAGS.revenue,
          CACHETAGS.sales,
          CACHETAGS.titans,
          CACHETAGS.clients,
        ],
      },
    });

    const data = response?.data as {
      totalRevenue: number;
      totalSales: number;
      titanCount: number;
      clientCount: number;
    };

    return { data };
  } catch (error) {
    throw new Error(getError(error));
    return { error: getError(error) };
  }
};

export const getDashboardTransactions = async (): Promise<{
  data?: any[];
  pagination?: IPagination;
  error?: string;
}> => {
  try {
    const { data, ...pagination } = await authFetch("/dashboard/transactions", {
      next: {
        revalidate: 8400,
        tags: [CACHETAGS.sales],
      },
    });

    return { data, pagination };
  } catch (error) {
    return { error: getError(error) };
    throw new Error(getError(error));
  }
};

const chartDTO = (
  data: {
    _id: string;
    date: string;
    totalSales: number;
    totalRevenue: number;
    revenue: number;
  }[]
) =>
  data?.map((item) => ({
    month: Date.parse(item.date || item?._id)
      ? new Date(item.date || item?._id).toLocaleString("default", {
          month: "long",
        })
      : item.date || item?._id,
    sales: item.totalSales || 0,
    revenue: item?.totalRevenue || item?.revenue || 0,
  }));

export const getDashboarSalesChart = async (
  params: Record<string, any> = { lastYears: 1 }
): Promise<{
  data?: {
    month: string;
    sales: number;
    revenue: number;
  }[];
  pagination?: IPagination;
  error?: string;
}> => {
  try {
    const query = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (key != "id") {
        query.set(key, String(value));
      }
    });

    const { data } = await authFetch(
      `/dashboard/sales-chart-data?${query.toString()}`,
      {
        next: {
          revalidate: 8400,
          tags: [CACHETAGS.sales],
        },
      }
    );

    return { data: chartDTO(data) };
  } catch (error) {
    // return { error: getError(error) };
    throw new Error(getError(error));
  }
};

export const getRevenueData = async () => {
  try {
    const response = await authFetch(`/dashboard/total-revenue`, {
      next: {
        revalidate: 8400,
        tags: [CACHETAGS.sales],
      },
    });

    return {
      ...response,
      monthlyRevenue: chartDTO(response.monthlyRevenue || []),
    };
  } catch (error) {
    return { error: getError(error) };
  }
};

export const getSalesData = async () => {
  try {
    const response = await authFetch(`/dashboard/total-sales`, {
      next: {
        revalidate: 8400,
        tags: [CACHETAGS.sales],
      },
    });

    return {
      ...response,
      monthlySales: chartDTO(response.monthlySales || []),
    };
  } catch (error) {
    return { error: getError(error) };
  }
};

export const getAgentData = async () => {
  try {
    const response = await authFetch(`/dashboard/agent-overview`, {
      next: {
        revalidate: 8400,
        tags: [CACHETAGS.titans],
      },
    });

    return response as {
      totalTitans: number;
      activeTitans: number;
      commissionsEarned: number;
      commissionsPaidOut: number;
      recentlyOnboardedAgents: {
        titan: string;
        upline: string;
        joined: string;
      }[];
    };
  } catch (error) {
    throw new Error(getError(error));
    // return { error: getError(error) };
  }
};

export const getClientData = async () => {
  try {
    const response = await authFetch(`/dashboard/client-overview`, {
      next: {
        revalidate: 8400,
        tags: [CACHETAGS.clients],
      },
    });

    return response as {
      allClients: number;
      activeBuyers: number;
      closedSales: number;
      recentlyOnboardedClients: {
        clientName: string;
        propertiesBought: string;
        payment: string;
        joined: string;
      }[];
    };
  } catch (error) {
    throw new Error(getError(error));
    // return { error: getError(error) };
  }
};

export const getTitanDashboardSummary = async () => {
  try {
    const response = await authFetch("/titans/titan-dashboard-summary", {
      next: {
        revalidate: 8400,
        tags: ["dashboard"],
      },
    });

    return response?.summary as {
      totalSalesRevenue: number;
      totalPaid: number;
      closedSales: number;
      ongoingSales: number;
      totalPlotsSold: number;
      outstanding: number;
      totalClients: number;
    };
  } catch (error) {
    console.error("Error fetching titans:", getError(error));
    throw new Error(getError(error));
  }
};
