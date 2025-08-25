"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ClassNameValue, twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";

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

// Modal component
export const Modal = ({
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
      className="fixed top-0 translate-x-0 translate-y-0 left-0 z-[999] flex flex-col items-center justify-center w-screen min-h-dvh overflow-y-auto"
    >
      <button
        type="button"
        title="Close modal"
        onClick={closeModal}
        className="fixed cursor-auto w-screen h-full min-h-dvh top-0 left-0 z-[998] bg-[#1F1F1F33] backdrop-blur-[12px]"
      />

      <AnimatePresence>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.3 }}
          key={"modal-div"}
          className={twMerge(
            "w-full max-w-[95%] sm:max-w-[MIN(90%,600px)] h-full min-h-[300px] pb-2 overflow-hidden m-auto bg-white flex flex-col relative rounded-4xl border overflow-y-auto z-[999] gap-6 max-h-[95dvh]",
            className
          )}
        >
          <header
            className={`sticky top-0 text-[#292A2C] left-0 flex  z-10 items-center justify-between w-full bg-inherit`}
          >
            {typeof heading !== "string" ? (
              <>
                {heading}
                {canClose && (
                  <button
                    type="button"
                    className="absolute z-10 cursor-pointer text-inherit top-4 right-6 place-self-end "
                    onClick={closeModal}
                  >
                    <X color="currentColor" className="text-xl" />
                  </button>
                )}
              </>
            ) : (
              <div
                className={
                  "flex p-4 font-bold px-6 sm:px-8 w-full bg-inherit justify-between relative items-center"
                }
              >
                {heading}
                {canClose && (
                  <button
                    type="button"
                    className="absolute h-24 -translate-y-1/2 cursor-pointer right-6 top-1/2"
                    onClick={closeModal}
                  >
                    <X color="currentColor" className="text-xl" />
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
          <div className="relative flex flex-col flex-1 px-6 sm:px-7 pb-4 my-2 w-full max-h-[90dvh] overflow-y-auto border-t border-white/[0.06] bg-inherit mx-auto">
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
