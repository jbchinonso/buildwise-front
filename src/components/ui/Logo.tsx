"use client";
import Image from "next/image";
import Link from "next/link";
import { ClassNameValue, twMerge } from "tailwind-merge";

export const Logo = ({
  className,
  onClick,
}: {
  className?: ClassNameValue;
  onClick?: () => any;
}) => {
  return (
    <Link
      href="/"
      onClick={() => onClick?.()}
      className={twMerge(
        `-indent-[9999px] text-primary relative flex items-center justify-center z-50`,
        className
      )}
    >
      Buildwise
      <Image
        src="/logo.svg"
        alt="Logo"
        width={110}
        height={64}
        priority
        unoptimized
      />
    </Link>
  );
};
