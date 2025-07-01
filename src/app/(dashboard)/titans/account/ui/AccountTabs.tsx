"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const AccountTabs = () => {
  const pathname = usePathname();

  return (
    <div className="flex gap-2 p-2 text-sm w-fit rounded-3xl bg-grey-50">
      <Link
        href={""}
        data-ui={pathname.endsWith("account") ? "active" : ""}
        className="p-4 py-2 rounded-3xl data-active:bg-white active:text-primary-400 hover:bg-white"
      >
        Personal information
      </Link>
      <Link
        href={"account/performance"}
        data-ui={pathname.endsWith("performance") ? "active" : ""}
        className="p-4 py-2 rounded-3xl data-active:bg-white active:text-primary-400 hover:bg-white"
      >
        Performance & earnings
      </Link>
      <Link
        href={"account/titans"}
        data-ui={pathname.endsWith("titans") ? "active" : ""}
        className="p-4 py-2 rounded-3xl data-active:bg-white active:text-primary-400 hover:bg-white"
      >
        Titans
      </Link>
      <Link
        href={"account/settings"}
        data-ui={pathname.endsWith("settings") ? "active" : ""}
        className="p-4 py-2 rounded-3xl data-active:bg-white active:text-primary-400 hover:bg-white"
      >
        Settings
      </Link>
    </div>
  );
};
