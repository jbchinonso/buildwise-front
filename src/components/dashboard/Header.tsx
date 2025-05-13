"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

export const Header = () => {
  const topHeaderRef = useRef<HTMLElement | null>(null);

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
    </section>
  );
};
