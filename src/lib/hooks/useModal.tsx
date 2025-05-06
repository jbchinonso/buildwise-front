"use client"
import { useCallback, useEffect, useRef, useState } from "react";

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);
  const toggleModal = useCallback(
    () => setIsModalOpen(!isModalOpen),
    [isModalOpen]
  );
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef?.current &&
        event.target instanceof Node &&
        !modalRef.current?.contains(event.target)
      ) {
        closeModal();
        document.body.style.overflow = "auto";
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscKey);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [closeModal, isModalOpen]);

  return {
    isModalOpen,
    openModal,
    toggleModal,
    closeModal,
    modalRef,
  };
};
