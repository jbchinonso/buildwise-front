"use client";

import React, { useEffect, useRef } from "react";
import { ClassNameValue, twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { CloseCircle } from "iconsax-react";

interface IModalProps {
  heading?: string | React.ReactNode;
  subheading?: string | React.ReactNode;
  children?: React.ReactNode;
  canClose?: boolean;
  handleClose?: () => void;
  className?: ClassNameValue;
  backHref?: string;
  scroll?: boolean;
}

export const PageModal = ({
  heading,
  subheading,
  handleClose,
  children,
  className,
  backHref,
  scroll,
  canClose = true,
}: IModalProps) => {
  const modalRef = useRef<HTMLElement>(null);
  const router = useRouter();

  const closeModal = () => {
    if (handleClose) {
      handleClose();
    } else if (backHref) {
      router.replace(backHref, { scroll });
    } else {
      router.back();
    }
  };

  useEffect(() => {
    // close modal on pressing escape key
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      return;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      ref={modalRef}
      className="fixed top-0 translate-x-0 translate-y-0 left-0 z-[999] flex flex-col items-center justify-center w-screen min-h-dvh"
    >
      <button
        type="button"
        title="Close modal"
        onClick={closeModal}
        className="fixed cursor-auto w-screen h-full min-h-dvh top-0 left-0 z-[998] bg-black/25 backdrop-blur-[2px]"
      />

      <AnimatePresence>
        <motion.div
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          exit={{ x: 100 }}
          transition={{ duration: 0.3 }}
          key={"modal-div"}
          className={twMerge(
            "w-full max-w-[MIN(95%,880px)] rounded-4xl flex-1 text-grey-600 p-4 min-h-full pb-2 overflow-hidden m-auto mr-4 bg-white flex flex-col relative z-[999] max-h-[calc(100dvh+48px-var(--scroll-padding))]",
            className
          )}
        >
          <header
            className={`sticky top-0 left-0 flex z-10 items-center justify-between w-full bg-inherit`}
          >
            {typeof heading !== "string" ? (
              <>
                {heading}
                {canClose && (
                  <button
                    type="button"
                    className="absolute z-10 text-inherit top-4 right-6 place-self-end "
                    onClick={closeModal}
                  >
                    <CloseCircle color="currentColor" className="text-xl" />
                  </button>
                )}
              </>
            ) : (
              <div
                className={
                  "flex p-4 px-6 w-full font-medium justify-between relative items-center"
                }
              >
                {heading}
                {canClose && (
                  <button
                    type="button"
                    className="absolute h-24 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:enabled:scale-[1.05] right-4 top-1/2"
                    onClick={closeModal}
                  >
                    <CloseCircle
                      size={24}
                      color="currentColor"
                      className="text-xl"
                    />
                  </button>
                )}
              </div>
            )}
          </header>
          {subheading &&
            (typeof subheading === "string" ? (
              <div className="flex items-center justify-center w-full p-2 sm:p-[10px] bg-brand-blue-50">
                <p className="m-auto text-xs text-center max-w-[MIN(90%,465px)]">
                  {subheading}
                </p>
              </div>
            ) : (
              subheading
            ))}
          <div className="relative flex flex-col flex-1 p-4 px-6 pb-4 my-2 w-full max-h-full overflow-y-auto border-t border-white/[0.06] bg-inherit mx-auto ">
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};