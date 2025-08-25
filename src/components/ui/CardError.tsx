"use client"; 

import { getError } from "@/lib/utils";

export function CardError({
  message = "Something went wrong!",
  error,
  reset,
}: {
  message: string;
  error: string;
  reset: () => void;
}) {
  return (
    <div className="m-auto flex flex-1 py-2 justify-center flex-col w-full px-4 text-red-500">
      <p className="text-ellipsis my-auto line-clamp-3 text-sm">
        {message}
        <br />*{getError(error)}
      </p>
      <button
        onClick={reset}
        className="cursor-pointer ml-auto mt-auto w-fit border rounded-full py-1 p-3 text-xs my-1"
      >
        Try again
      </button>
    </div>
  );
}
