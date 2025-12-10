"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { Logo, ProfileAvatar } from "../ui";
import { NotificationModal } from "./NotificationModal";

export const Header = ({ children }: { children?: React.ReactNode }) => {
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
      className="py-2 p-4 lg:px-10 min-h-[80px] gap-4 flex justify-between items-center"
    >
      <div className="self-start">
        <Logo className="mix-blend-darken" />
      </div>

      <div className="flex items-center gap-4 md:ml-auto md:flex-row-reverse">
        <Link href={"/account"} className="flex items-center gap-3 ">
          <ProfileAvatar
            name={session?.user?.full_name || "User"}
            img={session?.user?.profile_image as string}
          />

          <span className="hidden capitalize md:block">
            Hi {session?.user?.full_name || <small>...</small>}
          </span>
        </Link>
        {children}
      </div>
    </section>
  );
};
