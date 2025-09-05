"use client";

import { cn, getError } from "@/lib/utils";

export function CardError({
  message = "Something went wrong!",
  error,
  reset,
  className,
}: {
  message: string;
  error: string;
  reset: () => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "m-auto flex flex-1 py-2 items-center justify-center flex-col w-full px-4 text-red-500",
        className
      )}
    >
      <p className="text-ellipsis my-auto line-clamp-3 text-sm">
        {message}
        <br />*{getError(error)}
      </p>
      <button
        onClick={reset}
        className="cursor-pointer  w-fit border rounded-full py-1 p-3 text-xs my-1"
      >
        Try again
      </button>
    </div>
  );
}
