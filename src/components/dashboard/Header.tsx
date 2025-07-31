"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Logo, ProfileAvatar } from "../ui";

export const Header = () => {
  const topHeaderRef = useRef<HTMLElement | null>(null);
  const { data: session } = useSession();
  // console.log({ session });

  useEffect(() => {
    if (topHeaderRef.current) {
      const navHeight = topHeaderRef.current.offsetHeight;
      document.documentElement.style.setProperty(
        "--scroll-padding",
        `${navHeight + 16}px`
      );
    }
  }, []);

  return (
    <section
      ref={topHeaderRef}
      className="py-2 px-10 min-h-[80px] flex justify-between items-center"
    >
      <div className="self-start">
        <Logo className="mix-blend-darken"/>
      </div>

      <div className="flex items-center gap-2 md:ml-auto md:flex-row-reverse">
        <Link href={"/account"} className="flex items-center gap-3 lg:ml-8">
          <div className="relative border rounded-full size-10">
            <ProfileAvatar
              name={session?.user?.full_name || "User"}
              img={session?.user?.profile_image as string}
            />
          </div>

          <span className="hidden capitalize md:block">
            Hi {session?.user?.full_name || <small>...</small>}
          </span>
        </Link>
        <div className="relative flex items-center gap-1 h-fit">
          <span className="h-[7px] w-[7px] rounded-[50%] bg-red-500 absolute top-[6.5px] left-[16.3px]"></span>
          <IoMdNotificationsOutline className="text-[#000] text-[1.6rem] font-semibold" />
        </div>
      </div>
    </section>
  );
};
