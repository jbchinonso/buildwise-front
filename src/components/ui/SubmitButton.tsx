"use client";
import { useFormStatus } from "react-dom";
import { Button, IButtonProps, SpinLoadingAnimation } from ".";
import { twMerge } from "tailwind-merge";

interface Props extends IButtonProps {
  loading?: boolean;
}

export function SubmitButton({ children, loading, ...props }: Props) {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending || props.disabled || loading}
      outline={pending || loading}
      type="submit"
      id="submit"
      {...props}
      aria-disabled={pending || props.disabled || loading}
      className={twMerge(
        props.className,
        pending || loading ? "opacity-70 border border-primary relative" : ""
      )}
    >
      {(pending || loading) && <SpinLoadingAnimation />}
      <span className={`w-full flex mx-auto justify-center items-center`}>
        {children}
      </span>
    </Button>
  );
}
