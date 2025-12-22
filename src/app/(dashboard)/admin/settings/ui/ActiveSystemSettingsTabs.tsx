"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const ActiveSystemSettingsTabs = () => {
  const pathname = usePathname();

  return (
    <div className="flex gap-2 p-2 text-sm w-fit rounded-3xl bg-grey-50">
      <Link
        href={"/admin/settings"}
        data-ui={!pathname.includes("commission-and-payment") ? "active" : ""}
        className="p-4 py-2 rounded-3xl data-active:bg-white active:text-primary-400 hover:bg-white"
      >
        User management
      </Link>
      <Link
        href={"/admin/settings/commission-and-payment"}
        data-ui={pathname.includes("commission-and-payment") ? "active" : ""}
        className="p-4 py-2 rounded-3xl data-active:bg-white active:text-primary-400 hover:bg-white"
      >
        Commission & payment
      </Link>
    </div>
  );
};
