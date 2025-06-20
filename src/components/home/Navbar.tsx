"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { Hamburger } from "./Hamburger";
import { Button, Logo } from "../ui";
import { NavData } from "@/lib/data";
import { useSession } from "next-auth/react";

export const Navbar = () => {
  const pathname = usePathname();
  const navbarContainer = useRef<HTMLElement | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (navbarContainer.current) {
      const navHeight = navbarContainer.current.offsetHeight;

      document.documentElement.style.setProperty(
        "--navbar-scroll-padding",
        `${navHeight + 16}px`
      );
    }
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path: string, index: number) => {
    return (
      (index == 0 && pathname === path) ||
      (pathname.startsWith(path) && index != 0)
    );
  };

  return (
    <nav
      ref={navbarContainer}
      className={
        "flex-col -mb-[calc(var(--navbar-scroll-padding)-16px)] backdrop-blur-sm left-0 m/d:max-h-[108px] z-[100] w-full sticky top-0 flex place-items-center "
      }
    >
      <div className="w-full flex-1 gap-4 max-w-[1232px] mx-auto md:gap-2 shop-width pt-6 pb-4 md:py-6 px-2 py-4 sm:px-[MIN(100px,10%)] flex justify-between items-center">
        <div className="border bg-[#024533] shadow-navbar flex items-center justify-between flex-1 w-full gap-4 px-2 p-4 m-auto rounded-sm md:gap-2">
          <div className="flex items-center gap-4">
            <Hamburger />
            <Logo />
          </div>
          <ul
            className={twMerge(
              `transition-all mx-auto font-body px-2 md:px-4 duration-500 max-w-full gap-3 sm:gap-x-2 md:bg-transparent  md: justify-center items-center z-0 hi.dden w-full sm:flex`
            )}
          >
            {NavData.map(({ path, name }, index) => {
              return (
                <li
                  key={`nav-parents-links-${index}`}
                  className={`min-h-full w-fit items-center`}
                >
                  <Link
                    scroll={true}
                    href={path}
                    onClick={toggleMenu}
                    className={twMerge(
                      "whitespace-nowrap w-full text-white text-center justify-center transition-all  relative flex items-center p-2 lg:gap-2 group lg:hover:after:w-[90%] hover:after:bg-white lg:after:h-[2px] lg:animate-link",
                      isActive(path, index) ? "active after:bg-white" : ""
                    )}
                  >
                    <span className="hidden lg:flex">{name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <Button
            asLink
            href={session ? "/titans" : "/login"}
            className="bg-[#4A0001] rounded"
          >
            {session ? "Dashboard" : "Login"}
          </Button>
          {/* <SearchBar /> */}
        </div>
      </div>
    </nav>
  );
};
