"use client";
import { useRouter } from "next/navigation";
import { Button } from "./Buttons";

export const ErrorBoundary = ({
  message = "Something went wrong while fetching data",
  reset = () => {},
}) => {
  const router = useRouter();
  return (
    <div className="flex flex-1 gap-4 justify-center items-center flex-col">
      <h2>{message}</h2>

      <div className="flex gap-4">
        <Button
          size="xs"
          variant="secondary"
          onClick={reset}
          className="cursor-pointer border-primary/30 px-10"
        >
          Try again
        </Button>
        <Button
          size="xs"
          onClick={() => router.back()}
          className="cursor-pointer px-10"
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};
