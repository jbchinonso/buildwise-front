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
  data: any
) => {  
  if (data && data.chartData && Array.isArray(data.chartData)) {
  
    return data.chartData.map((item: any) => ({
      month: Date.parse(item.month || item.date || item?._id)
        ? new Date(item.month || item.date || item?._id).toLocaleString("default", {
            month: "long",
          })
        : "Unknown",
      sales: item.sales || 0,
      revenue: item.revenue || 0,
    }));
  }
  
  if (Array.isArray(data)) {
    return data.map((item) => ({
      month: Date.parse(item.date || item?.month || item?._id)
        ? new Date(item.date || item?.month || item?._id).toLocaleString("default", {
            month: "long",
          })
        : item.month || "Unknown",
      sales: item.sales || 0,
      revenue: item.revenue || 0,
    }));
  }
  
  return [];
};


export const getDashboarSalesChart = async (
  params: Record<string, any> = { lastYears: 1 }
): Promise<{
  data?: {
    month: string;
    sales: number;
    revenue: number;
  }[];
  total?: number;
  pagination?: IPagination;
  error?: string;
}> => {
  try {
    
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (key !== "id") {
        query.set(key, String(value));
      }
    });

    const response = await authFetch(
      `/dashboard/sales-chart-data?${query.toString()}`,
      {
        next: {
          revalidate: 60,
          tags: [CACHETAGS.sales],
        },
      }
    );
    
    
    const chartDataResponse = response.data;
    
    if (!chartDataResponse) {
      return { data: [], total: 0 };
    }
    
    const chartData = chartDTO(chartDataResponse);
    
    const total = chartDataResponse.total || 0;
    
    
    return { 
      data: chartData,
      total 
    };
    
  } catch (error) {
    return { 
      data: [], 
      total: 0,
      error: getError(error)
    };
  }
};

export const getRevenueChartData = async (
  params: Record<string, any> = { lastYears: 1 }
) => {
  try {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (key !== "id") {
        query.set(key, String(value));
      }
    });

    const response = await authFetch(
      `/dashboard/revenue-chart-data?${query.toString()}`,
      {
        next: {
          revalidate: 0,
          tags: [CACHETAGS.sales],
        },
      }
    );
    
    const apiData = response.data;
    
    if (!apiData || !apiData.chartData) {
      return { data: [], total: 0 };
    }
    
    const chartData = apiData.chartData.map((item: any) => {
      let monthName = "Unknown";
      if (item.date) {
        try {
          const date = new Date(item.date);
          if (!isNaN(date.getTime())) {
            monthName = date.toLocaleString("default", { month: "long" });
          }
        } catch (e) {
          console.warn(`Could not parse date: ${item.date}`);
        }
      }
      
      return {
        month: monthName,
        revenue: item.totalRevenue || 0
      };
    }).filter(item => item.revenue > 0);
    
    const total = apiData.total || 0;
    
    return { 
      data: chartData,
      total 
    };
    
  } catch (error) {
    console.error('Error:', error);
    return { 
      data: [], 
      total: 0
    };
  }
};
export const getRevenueData = async () => {
  try {
    const response = await authFetch(`/dashboard/total-revenue`, {
      next: {
        revalidate: 0,
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
    const response = await authFetch("/titans/dashboard-summary", {
      next: {
        revalidate: 8400,
        tags: ["dashboard"],
      },
    });


    return response as {
      totalRevenue: number;
      totalClients: number;
      totalEarnings: number;
      totalTitans: number;
    };

  } catch (error) {
    console.error("Error fetching titans:", getError(error));
    throw new Error(getError(error));
  }
};
