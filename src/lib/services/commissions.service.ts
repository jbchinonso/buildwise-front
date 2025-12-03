import { ICommissionHistory } from "../type";
import { getError } from "../utils";
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
