"use client";
import { Element3, User, Profile2User } from "iconsax-react";
import { House, Network, Wrench,  } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const AdminSidebar = () => {
  const pathname = usePathname();
  return (
    <div className="flex-[20] w-full max-w-[MIN(100%,260px)] border rounded-2xl bg-white p-4 border-grey-50">
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
              className="w-full whitespace-nowrap flex items-center my-1 px-6 gap-2 py-5 rounded-xl text-grey-400 data-active:text-white data-active:bg-primary-400 hover:bg-primary-400/80 hover:text-white transition-all duration-300"
            >
              {icon} {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
