"use client";
import { Element3, Global, Profile2User, User } from "iconsax-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="flex-[20] w-full max-w-[MIN(100%,260px)] border rounded-2xl bg-white p-4 border-grey-50">
      <ul className="w-full">
        {[
          {
            title: "Dashboard",
            path: "/titans",
            icon: <Element3 color="currentColor" size="14" />,
          },
          {
            title: "Client",
            path: "/titans/client",
            icon: <Profile2User color="currentColor" size="14" />,
          },
          {
            title: "Titans",
            path: "/titans/my-titans",
            icon: <Global color="currentColor" size="14" />,
          },
          {
            title: "Account",
            path: "/titans/account",
            icon: <User color="currentColor" size="14" />,
          },
        ].map(({ title, path, icon }, index) => (
          <li key={`item-${index}`}>
            <Link
              href={path}
              data-ui={
                (index === 0 && pathname === path) ||
                (index !== 0 && pathname.startsWith(path))
                  ? "active"
                  : undefined
              }
              className="w-full flex items-center my-1 px-6 gap-2 py-5 rounded-xl text-grey-400 data-active:text-white data-active:bg-primary-400 hover:bg-primary-400/80 hover:text-white transition-all duration-300"
            >
              {icon} {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
