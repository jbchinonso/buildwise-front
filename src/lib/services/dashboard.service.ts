import { IPagination } from "../type";
import { CACHETAGS, customFetch, getError } from "../utils";
import { authFetch } from "./auth.service";

class DashboardService {
  async getDashboardData(): Promise<{
    data?: any;
    error?: string;
  }> {
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
  }

  async getDashboardTransactions(): Promise<{
    data?: any[];
    pagination?: IPagination;
    error?: string;
  }> {
    try {
      const { data, ...pagination } = await authFetch(
        "/dashboard/transactions",
        {
          next: {
            revalidate: 8400,
            tags: [CACHETAGS.sales],
          },
        }
      );

      return { data, pagination };
    } catch (error) {
      return { error: getError(error) };
      throw new Error(getError(error));
    }
  }

  chartDTO = (
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
      sales: item.totalSales,
      revenue: item?.totalRevenue || item?.revenue,
    }));

  async getDashboarSalesChart(
    params: Record<string, any> = { lastYears: 1 }
  ): Promise<{
    data?: {
      month: string;
      sales: number;
      revenue: number;
    }[];
    pagination?: IPagination;
    error?: string;
  }> {
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

      return { data: this.chartDTO(data) };
    } catch (error) {
      return { error: getError(error) };
      throw new Error(getError(error));
    }
  }

  async getRevenueData() {
    try {
      const response = await authFetch(`/dashboard/total-revenue`, {
        next: {
          revalidate: 8400,
          tags: [CACHETAGS.sales],
        },
      });

      return {
        ...response,
        monthlyRevenue: this.chartDTO(response.monthlyRevenue || []),
      };
    } catch (error) {
      return { error: getError(error) };
    }
  }

  async getSalesData() {
    try {
      const response = await authFetch(`/dashboard/total-sales`, {
        next: {
          revalidate: 8400,
          tags: [CACHETAGS.sales],
        },
      });

      return {
        ...response,
        monthlySales: this.chartDTO(response.monthlySales || []),
      };
    } catch (error) {
      return { error: getError(error) };
    }
  }

  async getAgentData() {
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
  }
  
  async getClientData() {
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
  }
}

export const dashboardService = new DashboardService();
