"use client";
import { Element3, User, Profile2User, Logout } from "iconsax-react";
import { House, Network, Wrench } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const AdminSidebar = () => {
  const pathname = usePathname();
  return (
    <div className="flex-[20]  flex flex-col ml-8 w-full max-w-[MIN(100%,260px)] max-h-[calc(100dvh-var(--scroll-padding))] sticky top-0 border rounded-2xl bg-white p-4 border-grey-50">
      <ul className="w-full">
        {[
          {
            title: "Dashboard",
            path: "/admin",
            icon: <Element3 color="currentColor" size="16" />,
          },
          {
            title: "Titans",
            path: "/admin/titans",
            icon: <Network color="currentColor" size="16" />,
          },
          {
            title: "Properties",
            path: "/admin/properties",
            icon: <House color="currentColor" size="16" />,
          },
          {
            title: "Clients",
            path: "/admin/clients",
            icon: <Profile2User color="currentColor" size="16" />,
          },
          {
            title: "System settings",
            path: "/admin/settings",
            icon: <Wrench color="currentColor" size="16" />,
          },
          {
            title: "Account",
            path: "/admin/account",
            icon: <User color="currentColor" size="16" />,
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
              className="flex items-center w-full gap-2 px-6 py-5 my-1 transition-all duration-300 whitespace-nowrap rounded-xl text-grey-400 data-active:text-white data-active:bg-primary-400 hover:bg-primary-400/80 hover:text-white"
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
