"use client"; // Error boundaries must be Client Components

import { CardError } from "@/components/ui";
import { getError } from "@/lib/utils";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <CardError
      reset={() => reset()}
      message="Error fetching data!"
      error={getError(error)}
    />
  );
}
