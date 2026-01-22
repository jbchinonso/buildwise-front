"use server";
import {  updateTag } from "next/cache";
import { IPagination, ITitanClosedSales, ITitanClosedSalesPiechart, ITitanProfile, ITitans, SubTitan } from "../type";
import { CommissionDueData, ITopAgent } from "../types/titan";
import { baseUrl, CACHETAGS, getError, getMonth } from "../utils";
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
        tags: [CACHETAGS.titans],
      },
    });

    return response as {
      data: ITitans[];
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
        tags: [CACHETAGS.titans],
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
        tags: [CACHETAGS.titans],
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
        tags: [CACHETAGS.titans],
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
        tags: [CACHETAGS.titans],
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
        tags: [CACHETAGS.titans],
      },
    });


    return response as {
      totalEarnings: number;
      salesCommission: number;
      titansCommission: number;
      totalPaidIn: number;
    };
  } catch (error) {
    // return { error: getError(error) };
    // console.error("Error fetching titans:", getError(error));
    throw new Error(getError(error));
  }
};

export const getTitansCommissionChart = async () => {
  try {
    const response = await authFetch("/titans/commissions/chart", {
      next: {
        revalidate: 8400,
        tags: [CACHETAGS.titans],
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
        tags: [CACHETAGS.titans],
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
        tags: [CACHETAGS.titans],
      },
    });

    // console.log({ response });

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
        tags: [CACHETAGS.titans],
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
        tags: [CACHETAGS.titans],
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
        tags: [CACHETAGS.titans],
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

export const getTitanActivities = async (id: string = "") => {
  try {
    const response = await authFetch(`/activity/activities/${id}`);
    return response as any[];
  } catch (error) {
    throw new Error(getError(error));
  }
};

export const getTopTitanPerformannce = async (): Promise<{
  error?: string;
  data?: ITopAgent[];
}> => {
  try {
    const response = await authFetch(`/titans/top-agents`, {
      next: {
        tags: [CACHETAGS.titans],
        revalidate: 8400,
      },
    });

    return { data: response?.data as ITopAgent[] };
  } catch (error) {
    return { error: getError(error) };
    throw getError(error);
  }
};

export const getCommissionsDue = async () => {
  try {
    const response = await authFetch("/titans/commissions-due", {
      next: { tags: [CACHETAGS.titans], revalidate: 8400 },
    });

    return {
      data: response?.data as CommissionDueData[],
    };
  } catch (error) {
    return { error: getError(error) };
    throw getError(error);
  }
};

export const getTitanProfile = async (id: string) => {
  try {
    const { data } = await authFetch(`/titans/${id}/profile`, {
      next: { tags: [CACHETAGS.titans], revalidate: 8400 },
    });

    return data as ITitanProfile;
  } catch (error) {
    throw getError(error);
  }
};

export const deactivateTitan = async (id: string) => {
  try {
    await baseUrl.patch(`/titans/${id}/deactivate`);
    updateTag(CACHETAGS.titans);
  } catch (error) {
    throw getError(error);
  }
};



export const getTitanEarningsOverview = async () => {
  try {
    const response = await authFetch("/titans/earnings-overview", {
      next: {
        revalidate: 8400,
        tags: [CACHETAGS.dashboard],
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching titans:", getError(error));
    throw new Error(getError(error));
  }
};

export const getTitanCommissionEarnings = async () => {
  try {
    const response = await authFetch("/titans/commissions/recent", {
      next: {
        revalidate: 8400,
        tags: [CACHETAGS.commissions],
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching titans:", getError(error));
    throw new Error(getError(error));
  }
};


interface IEarningChartResponse {
  chartData: {
    salesCommissions: { month: number | string; amount: number }[];
    subTitanCommissions: { month: number | string; amount: number }[];
  };
  yearlyTotals: { sales: 0; titans: 0; grandTotal: 0 };
}

export const getTitanEarningsChart = async () => {
  try {
    const response = await authFetch("/titans/earnings-overview", {
      next: {
        revalidate: 8400,
        tags: ["dashboard"],
      },
    });
    
    return response as IEarningChartResponse;
  } catch (error) {
    console.error("Error fetching titans:", getError(error));
    throw new Error(getError(error));
  }
};

export const getTitanClosedSales = async () => {
  try {
    const response = await authFetch("/titans/closed", {
      next: {
        tags: ["sales"],
        revalidate: 8400,
      },
    });

    return response as {
      meta: {
        total: number;
      };
      data: ITitanClosedSales[];
    };
  } catch (error) {
    throw getError(error);
  }
};

export const getTitanClosedSalesChart = async () => {
  try {
    const response = await authFetch("/titans/closed/pie-chart", {
      next: {
        tags: ["sales"],
        revalidate: 8400,
      },
    });

    return response as ITitanClosedSalesPiechart;
  } catch (error) {
    throw getError(error);
  }
};

export const getTitanClosedSalesSummary = async () => {
  try {
    const response = await authFetch("/titans/closed/summary", {
      next: {
        tags: ["sales"],
        revalidate: 8400,
      },
    });

    return response as {
      totalProperties: number;
      completedPurchases: number;
      closedRevenue: number;
    };
  } catch (error) {
    throw getError(error);
  }
};

export const getTitanClientRevenueSummary = async () => {
  try {
    const response = await authFetch("/titans/revenue-summary", {
      next: {
        tags: [CACHETAGS.revenue],
        revalidate: 8400,
      },
    });

    return response as {
      totalRevenue: number;
      propertySold: number;
      avgRevenuePerSale: number;
      commissionEarned: number;
      pendingCommission: number;
    };
  } catch (error) {
    throw getError(error);
  }
};

export const getTitanClientRevenueChart = async () => {
  try {
    const response = await authFetch("/titans/revenue-chart", {
      next: {
        tags: [CACHETAGS.revenue],
        revalidate: 8400,
      },
    });

    interface IData {
      month: number | string;
      revenue: number;
    }

    const result = (response || []).map((v: IData) => ({
      month: getMonth(v?.month || 1),
      revenue: v?.revenue || 0,
    }));

    return result;
  } catch (error) {
    throw getError(error);
  }
};

export const getTitanDashboardRecentSalesStats = async () => {
  try {
    const response = await authFetch("/titans/recent-sales", {
      next: {
        tags: [CACHETAGS.revenue],
        revalidate: 8400,
      },
    });

    // console.log({ response });

    return response;
  } catch (error) {
    throw getError(error);
  }
};

export const getTitanClientRecentSales = async () => {
  try {
    const response = await authFetch("/titans/titan-recent-sales", {
      next: {
        tags: [CACHETAGS.revenue],
        revalidate: 8400,
      },
    });

    return response;
  } catch (error) {
    throw getError(error);
  }
};
