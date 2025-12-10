"use server"
import { revalidateTag } from "next/cache";
import { ICommissionHistory, ITitanCommission } from "../type";
import { baseUrl, getError } from "../utils";
import { authFetch } from "./auth.service";

export const getCommissions = async (
  id: string
): Promise<{
  data?: any[];
  error?: string;
}> => {
  try {
    const { data } = await authFetch(`/titans/${id}/commissions`, {
      next: {
        tags: ["commissions"],
        revalidate: 8400,
      },
    });

    return { data };
  } catch (error) {
    return { error: getError(error) };
  }
};

export const getCommissionBreakdown = async (): Promise<{
  data?: ICommissionHistory[];
  error?: string;
}> => {
  try {
    // const session = await getServerSession(authOptions);
    // const id = session?.user?.id;
    // console.log({ id, session });

    const data = await authFetch(`/titans/commissions/breakdown/`, {
      next: {
        revalidate: 8400,
        tags: ["titans"],
      },
    });

    return { data };
  } catch (error) {
    return { error: getError(error) };
  }
};

export const getTotalCommissions = async () => {
  try {
    const data = await authFetch("/earning/titan", {
      next: {
        revalidate: 8400,
        tags: ["commission"],
      },
    });

    return { data };
  } catch (error) {
    return { error: getError(error) };
  }
};

// ADMIN
export const getTitanCommission = async (
  id: string
): Promise<{
  data?: ITitanCommission[];
  error?: string;
}> => {
  try {
    const { data } = await authFetch(`/titans/commissions-all/${id}`, {
      next: {
        tags: ["commissions"],
        revalidate: 8400,
      },
    });

    return { data } as {
      data: ITitanCommission[];
    };
  } catch (error) {
    return { error: getError(error) };
  }
};

export const updateTitanCommission = async (
  id: string
): Promise<any> => {
  try {
    const response = await baseUrl.patch(`/titans/commissions-all/${id}`);
    revalidateTag("commissions", "max")

    return response;
  } catch (error) {
    return { error: getError(error) };
  }
};
