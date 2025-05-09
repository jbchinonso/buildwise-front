import { customFetch, getError } from "../utils";

export const getTransactions = async (): Promise<{
  data?: any[];
  error?: string;
}> => {
  try {
    // const data = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await customFetch(
      "https://dummyjson.com/c/4920-aa7f-4dcf-9c6f"
    );

    return { data };
  } catch (error) {
    return { error: getError(error) };
  }
};
