"use client";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { LoaderIcon } from "react-hot-toast";
import { ClassNameValue, twMerge } from "tailwind-merge";

export interface IButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  href?: string;
  small?: boolean;
  large?: boolean;
  replace?: boolean;
  scroll?: boolean;
  outline?: boolean;
  asLink?: boolean;
  loading?: boolean;
  variant?: "secondary" | "primary" | "ghost";
  size?: keyof typeof ButtonSizes;
}

const ButtonSizes = {
  default: "px-4 py-2",
  xs: "px-3 text-xs py-1",
  sm: "px-3 text-xs py-2",
  lg: "px-8",
  icon: "size-9 aspect-square h-auto p-0 !sm:p-0",
};

export function Button({
  small,
  className,
  outline,
  asLink,
  size,
  variant,
  ...props
}: IButtonProps) {
  const variantStyles: ClassNameValue = (() => {
    switch (variant) {
      case "ghost":
        return "bg-transparent text-primary enabled:hover:border-primary";
      case "secondary":
        return "bg-transparent text-primary enabled:hover:border-primary";
      default:
        return "text-white hover:text-primary-500 text-white border border-primary-500 bg-primary-500 hover:bg-[#ededed]";
    }
  })();

  return (
    <ButtonWrapper
      asLink={asLink}
      {...props}
      className={twMerge(
        `capitalize rounded-4xl whitespace-nowrap flex flex-nowrap items-center place-items-center text-sm md:text-base cursor-pointer relative p-4 md:px-[19px] group disabled:pointer-events-none disabled:opacity-70 min-w-fit`,
        size ? ButtonSizes[size] : "",
        outline && "text-white bg-transparent border",
        variantStyles,
        className
      )}
    >
      <span
        className={`relative w-full min-w-fit h-full text-center justify-center items-center gap-1 flex mx-auto text-inherit transition-all duration-300 ease-out ${
          small ? "text-xs" : ""
        }`}
      >
        {props.children}
      </span>
    </ButtonWrapper>
  );
}

const ButtonWrapper = ({
  href,
  children,
  onClick,
  replace,
  scroll,
  asLink,
  ...props
}: {
  href?: string;
  scroll?: boolean;
  replace?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: any;
  children: React.ReactNode;
} & IButtonProps) => {
  return href && !asLink ? (
    <Link
      onClick={onClick}
      replace={replace}
      scroll={scroll}
      href={href}
      className={props.className}
    >
      {children}
    </Link>
  ) : (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export function SubmitButton({ children, loading, ...props }: IButtonProps) {
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
      {(pending || loading) && <LoaderIcon />}
      <span className={`w-full flex mx-auto justify-center items-center`}>
        {children}
      </span>
    </Button>
  );
}
