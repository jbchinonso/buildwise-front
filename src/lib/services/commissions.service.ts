import { customFetch, getError } from "../utils";

export const getCommissions = async (): Promise<{
  data?: any[];
  error?: string;
}> => {
  try {
    const data = await customFetch(
      "https://dummyjson.com/c/d74b-de04-4864-bc3c",
      {
        next: {
          revalidate: 8400,
        },
      }
    );

    return { data };
  } catch (error) {
    return { error: getError(error) };
  }
};
