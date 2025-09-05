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
      date: string;
      totalSales: number;
      totalRevenue: number;
    }[]
  ) =>
    data?.map((item) => ({
      month: Date.parse(item.date)
        ? new Date(item.date).toLocaleString("default", { month: "long" })
        : item.date,
      sales: item.totalSales,
      revenue: item.totalRevenue,
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
}

export const dashboardService = new DashboardService();
