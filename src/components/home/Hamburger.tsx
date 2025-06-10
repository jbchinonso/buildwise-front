"use client";

import { useNav } from "@/lib/hooks/useNav";
import { HambergerMenu } from "iconsax-react";

export const Hamburger = () => {
  const { isOpen, toggleNav } = useNav();
  return (
    <button
      onClick={toggleNav}
      className="flex lg:hidden rounded-full size-8 bg-[#F8EAE8] p-2 text-black justify-center items-center z-50"
    >
      {isOpen ? (
        <span
          title="close sidebar"
          className={`"relative p-.2 flex items-center justify-center rounded-full transition-all duration-500 size-7 hover:scale-110`}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="inherit"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="16" cy="16" r="16" fill="#F8EAE8" fillOpacity="0.4" />
            <path
              d="M22.4323 21.3255L17.1042 16.0002L22.4323 10.7142C22.6993 10.4049 22.6849 9.94084 22.3991 9.64904C22.1134 9.35723 21.6527 9.3361 21.3417 9.60053L15.998 14.8473L10.7478 9.56131C10.4439 9.25723 9.95324 9.25723 9.64942 9.56131C9.50195 9.70857 9.419 9.90903 9.419 10.1181C9.419 10.3273 9.50195 10.5277 9.64942 10.675L14.8919 15.9532L9.56373 21.2313C9.41626 21.3786 9.33331 21.5791 9.33331 21.7882C9.33331 21.9973 9.41626 22.1978 9.56373 22.345C9.71074 22.4918 9.90975 22.5737 10.1168 22.5725C10.3201 22.5737 10.5157 22.4949 10.6621 22.3529L15.998 17.059L21.3417 22.4391C21.4888 22.5859 21.6878 22.6678 21.8948 22.6666C22.0992 22.6657 22.295 22.584 22.4401 22.4391C22.5865 22.2908 22.6681 22.0898 22.6666 21.8807C22.6652 21.6715 22.5808 21.4717 22.4323 21.3255Z"
              fill="#AA2615"
            />
          </svg>
        </span>
      ) : (
        <HambergerMenu
          size="24"
          color="currentColor"
          className="text-black"
        />
      )}
    </button>
  );
};
