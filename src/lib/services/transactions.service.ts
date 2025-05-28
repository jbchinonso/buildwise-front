import { customFetch, getError } from "../utils";

export const getTransactions = async (): Promise<{
  data?: any[];
  error?: string;
}> => {
  try {
    // const data = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await customFetch(
      "https://dummyjson.com/c/d971-2806-4333-994c",
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
