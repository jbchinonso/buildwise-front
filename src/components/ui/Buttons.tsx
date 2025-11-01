"use client";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import {
  AnchorHTMLAttributes,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";
import { useFormStatus } from "react-dom";
import { LoaderIcon } from "react-hot-toast";
import { ClassNameValue, twMerge } from "tailwind-merge";
import { Url } from "url";

export interface IButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  href?: Partial<Url> | string;
  replace?: boolean;
  scroll?: boolean;
  outline?: boolean;
  asLink?: boolean;
  loading?: boolean;
  variant?: "secondary" | "primary" | "ghost" | "white";
  size?: keyof typeof ButtonSizes;
}

const ButtonSizes = {
  default: "px-4 py-2",
  xs: "px-4 text-[10px] py-2",
  sm: "px-6 text-xs py-2",
  lg: "px-8",
  icon: "size-9 aspect-square h-auto p-0 !sm:p-0",
};

export function Button({
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
        return "bg-transparent text-primary-500";
      case "secondary":
        return "bg-[#E8E9EB] text-primary-500 ";
      case "white":
        return "bg-white text-primary-500 ";
      default:
        return "text-white enabled:hover:text-primary-500 text-white border-primary-500 bg-primary-500 enabled:hover:bg-[#ededed]";
    }
  })();

  return (
    <ButtonWrapper
      asLink={asLink}
      {...props}
      className={twMerge(
        `capitalize rounded-4xl whitespace-nowrap flex flex-nowrap items-center place-items-center text-sm md:text-base cursor-pointer relative p-4 px-16 group disabled:pointer-events-none disabled:opacity-70 min-w-fit gap-1 transition-all duration-300 ease-out justify-center border border-transparent enabled:hover:border-primary-500`,
        size ? ButtonSizes[size] : "",
        outline && "text-white bg-transparent",
        variantStyles,
        className
      )}
    >
      {props.children}
    </ButtonWrapper>
  );
}

const ButtonWrapper = ({
  href,
  children,
  onClick,
  onCopy,
  replace,
  scroll,
  asLink,
  ...props
}: {
  href?: Partial<Url> | string;
  scroll?: boolean;
  replace?: boolean;
  onClick?: any;
  children: React.ReactNode;
} & IButtonProps) => {
  return href && asLink ? (
    <Link
      onClick={onClick}
      replace={replace}
      scroll={scroll}
      href={href}
      className={props.className}
      title={props.title}
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
      {children}
    </Button>
  );
}

export const TabButton = ({
  children,
  className,
  isActive,
  href,
  title,
}: {
  isActive?: boolean;
  className?: ClassNameValue;
  children: React.ReactNode;
  href: string;
  title?: string;
}) => {
  return (
    <Link
      href={href}
      data-ui={isActive ? "active" : ""}
      title={title}
      replace
      scroll={false}
      className={cn(
        "text-xs max-w-[140px] border border-transparent hover:bg-white/50 flex items-center min-w-[104px] p-4 py-2 rounded-3xl data-active:bg-white data-active:text-primary-400",
        className
      )}
    >
      {children}
    </Link>
  );
};
