"use client";
import { MOBILE_BREAKPOINT } from "@/lib/constants";
import { useNav } from "@/lib/hooks/useNav";
import { cn } from "@/lib/utils";
import { Element3, Global, Logout, Profile2User, User } from "iconsax-react";
import { ChevronRight } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export const Sidebar = () => {
  const pathname = usePathname();

  const { toggleNav, isOpen, closeNav } = useNav();

  useEffect(() => {
    //  on resize close modal
    window.onresize = () => {
      if (isOpen && window.innerWidth <= MOBILE_BREAKPOINT) {
        // console.log("close nav", window.innerWidth);
        closeNav();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    if (typeof window != undefined && window.innerWidth >= MOBILE_BREAKPOINT && !isOpen) {
      toggleNav();
    } else if (window.innerWidth <= MOBILE_BREAKPOINT) {
      closeNav();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isOpen && (
        <button
          type="button"
          title="Close modal"
          onClick={toggleNav}
          className="fixed cursor-auto lg:hidden w-screen h-full min-h-dvh top-0 left-0 z-[998] bg-black/10 backdrop-blur-[2px]"
        />
      )}

      <div
        className={cn(
          "transition-transform top-1/2 -translate-y-1/2 min-h-full flex-[20] duration-100 z-[999] lg:z-10 flex flex-col lg:ml-8 w-full max-w-[MIN(100%,260px)] max-h-[calc(100dvh-var(--scroll-padding))] absolute lg:sticky lg:translate-y-0 lg:top-0 border rounded-r-2xl lg:rounded-2xl bg-white p-4 border-grey-50",
          isOpen ? "translate-x-0 " : "-translate-x-full lg:translate-x-0"
        )}
      >
        <span className="w-full relative lg:hidden">
          <button
            onClick={toggleNav}
            className="absolute -right-9 bg-white p-1 rounded-full shadow-sm"
          >
            <ChevronRight size={24} className={isOpen ? "rotate-180" : ""} />
          </button>
        </span>

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
          className="w-full mt-auto gap-4 text-red-500 flex items-center my-1 px-6 py-5 rounded-xl  data-active:text-white data-active:bg-primary-400 hover:bg-primary-400/80 hover:text-white transition-all duration-300"
        >
          <Logout size={24} color="currentColor" />
          <p>Logout</p>
        </button>
      </div>
    </>
  );
};
