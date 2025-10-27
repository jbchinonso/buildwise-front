"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Tab = ({
  href = "",
  className = "",
  isActive,
  children = "",
}: {
  href: string;
  className?: string;
  isActive?: boolean;
  children?: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      data-ui={isActive ? "active" : ""}
      className={cn(
        "p-4 py-2 flex- whitespace-nowrap rounded-3xl data-active:bg-white active:text-primary-400 hover:bg-white",
        className
      )}
    >
      {children}
    </Link>
  );
};

export const AccountTabs = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap  gap-2 p-2 text-sm w-fit rounded-3xl bg-grey-50">
      <Tab href="" isActive={pathname.endsWith("/titans/account")}>
        Personal information
      </Tab>
      <Tab href={"/titans/account/performance"} isActive={pathname.endsWith("performance")}>
        Performance & earnings
      </Tab>
      <Tab href={"/titans/account/my-network"} isActive={pathname.endsWith("my-network")}>
        My network
      </Tab>
      <Tab href={"/titans/account/settings"} isActive={pathname.endsWith("settings")}>
        Settings
      </Tab>
    </div>
  );
};
