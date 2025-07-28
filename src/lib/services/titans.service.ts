import { getError } from "../utils";
import { authFetch } from "./auth.service";

export const getTitans = async () => {
  try {
    const response= await authFetch("/titans/all", {
      next: {
        revalidate: 8400,
        tags: ["titans"],
      },
    });

    console.log({ response });

    return response //{ data, ...pagination };
  } catch (error) {
    console.error("Error fetching titans:", getError(error));
    throw new Error(getError(error));
  }
};
