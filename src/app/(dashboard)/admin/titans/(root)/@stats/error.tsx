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
    // console.error(error);
  }, [error]);

  return (
    <>
      <CardError
        reset={() => reset()}
        message="Error fetching data!"
        error={getError(error)}
        className="bg-white cursor-pointer hover:scale-[1.01] duration-300 transition-all hover:bg-green-50/50 hover:border-primary-500 hover:shadow-sm border-[0.5px] border-grey-50 p-4 flex flex-col flex-1 f.lex-[25] max-h-[136px] h-full rounded-2xl relative w-full min-w-fit"
      />
      <CardError
        reset={() => reset()}
        message="Error fetching data!"
        error={getError(error)}
        className="bg-white cursor-pointer hover:scale-[1.01] duration-300 transition-all hover:bg-green-50/50 hover:border-primary-500 hover:shadow-sm border-[0.5px] border-grey-50 p-4 flex flex-col flex-1 f.lex-[25] max-h-[136px] h-full rounded-2xl relative w-full min-w-fit"
      />
      <CardError
        reset={() => reset()}
        message="Error fetching data!"
        error={getError(error)}
        className="bg-white cursor-pointer hover:scale-[1.01] duration-300 transition-all hover:bg-green-50/50 hover:border-primary-500 hover:shadow-sm border-[0.5px] border-grey-50 p-4 flex flex-col flex-1 f.lex-[25] max-h-[136px] h-full rounded-2xl relative w-full min-w-fit"
      />
    </>
  );
}
