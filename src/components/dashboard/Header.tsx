"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";

export const Header = () => {
  const topHeaderRef = useRef<HTMLElement | null>(null);
  const { data: session } = useSession();
  console.log({ session });

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
        <Image
          src="/image/BuildWiseLogo.svg"
          alt="Logo"
          width={120}
          height={40}
        />
      </div>

      <div className="flex gap-2 items-center md:ml-auto md:flex-row-reverse">
        <Link href={"profile"} className="flex items-center gap-3 lg:ml-8">
          <div className="size-10 bg-red-500 rounded-full border relative">
            {session?.user.profile_image && (
              <Image
                height={32}
                width={32}
                src={session?.user.profile_image}
                alt="Profile Pic"
                className={`${
                  session?.user.profile_image ? "rounded-[50%]" : ""
                } object-contain  aspect-square rounded-full overflow-hidden h-auto w-[32px] `}
              />
            )}
          </div>

          <span className="hidden capitalize md:block">
            Hi {session?.user?.full_name || <small>...</small>}
          </span>
        </Link>
        <div className="flex items-center  gap-1 relative h-fit">
          <span className="h-[7px] w-[7px] rounded-[50%] bg-red-500 absolute top-[6.5px] left-[16.3px]"></span>
          <IoMdNotificationsOutline className="text-[#000] text-[1.6rem] font-semibold" />
        </div>
      </div>
    </section>
  );
};
