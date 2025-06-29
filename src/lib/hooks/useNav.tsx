"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of your navigation state
interface NavState {
  isOpen: boolean;
  minimize: boolean;
  isCategorySidebarOpen: boolean;
  toggleNav: () => void;
  closeNav: () => void;
  toggleCategorySideBar: () => void;
  closeCategorySideBar: () => void;
  toggleMinimize: () => void;
  minimizeNav: () => void;
}

// Create the context
const NavContext = createContext<NavState | undefined>(undefined);

// Create a provider component to wrap your app
export const NavProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [minimize, setMinimize] = useState<boolean>(false);
  const [isCategorySidebarOpen, setIsCateogorySidebarOpen] =
    useState<boolean>(true);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const toggleMinimize = () => {
    setMinimize(!minimize);
  };

  const minimizeNav = () => {
    setIsOpen(true);
  };

  const closeNav = () => {
    setIsOpen(false);
  };

  const toggleCategorySideBar = () => {
    setIsCateogorySidebarOpen(!isCategorySidebarOpen);
  };

  const closeCategorySideBar = () => {
    setIsCateogorySidebarOpen(false);
  };

  return (
    <NavContext.Provider
      value={{
        isOpen,
        toggleNav,
        closeNav,
        isCategorySidebarOpen,
        toggleCategorySideBar,
        closeCategorySideBar,
        toggleMinimize,
        minimizeNav,
        minimize,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};

// Create a custom hook to access the navigation state
export const useNav = (): NavState => {
  const context = useContext(NavContext);
  if (context === undefined) {
    throw new Error("useNav must be used within a NavProvider");
  }
  return context;
};
