import { customFetch, getError } from "../utils";

export const getTitans = async (): Promise<{
  data?: any[];
  error?: string;
}> => {
  try {
    const data = await customFetch(
      "https://dummyjson.com/c/ee14-b763-4227-8657",
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
