"use client";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";

type UseModalReturn = {
  isModalOpen: boolean;
  openModal: () => void;
  toggleModal: () => void;
  closeModal: () => void;
  modalRef: React.RefObject<HTMLDivElement | null>;
};

export const useModal = (): UseModalReturn => {
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

// Define the shape of the context value
export type ModalContextType = UseModalReturn;

export const useModalContext = (): ModalContextType => {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }

  return context;
};

const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

interface ModalProviderProps {
  children: React.ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const modalControls = useModal(); // Use your existing hook

  return (
    <ModalContext.Provider value={modalControls}>
      {children}
    </ModalContext.Provider>
  );
};
