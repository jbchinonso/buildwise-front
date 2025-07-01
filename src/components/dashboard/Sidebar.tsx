"use client";
import { Element3, Global, Logout, Profile2User, User } from "iconsax-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="flex-[20] flex flex-col ml-8 w-full max-w-[MIN(100%,260px)] max-h-[calc(100dvh-var(--scroll-padding))] sticky top-0 border rounded-2xl bg-white p-4 border-grey-50">
      <ul className="w-full">
        {[
          {
            title: "Dashboard",
            path: "/titans",
            icon: <Element3 color="currentColor" size="14" />,
          },
          {
            title: "Clients",
            path: "/titans/clients",
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

      <button
        type="button"
        onClick={() => signOut()}
        className="w-full  mt-auto gap-4 text-red-500 flex items-center my-1 px-6 py-5 rounded-xl  data-active:text-white data-active:bg-primary-400 hover:bg-primary-400/80 hover:text-white transition-all duration-300"
      >
        <Logout size={24} color="currentColor" />
        <p>Logout</p>
      </button>
    </div>
  );
};
