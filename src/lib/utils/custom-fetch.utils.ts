"use server";

export const customFetch = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  let data: any;
  try {
    data = await response.json();
  } catch (jsonErr) {
    console.warn("Failed to parse JSON response:", jsonErr);
  }

  if (!response.ok) {
    const errorMessage =
      data?.message || "An unexpected error occurred. Please try again later.";
    console.error(
      "API error response:::::::::::::::::::::::::::::::::::::::::::::::::",
      errorMessage
    );
    throw new Error(errorMessage);
  }

  return data;
};
