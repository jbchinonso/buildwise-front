"use client";
import { Eye, EyeSlash } from "iconsax-react";
import { FiChevronRight } from "react-icons/fi";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

type IInput = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type ITextArea = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

type InputProps = ITextArea & IInput;

interface IInputProps extends InputProps {
  isTextArea?: boolean;
  label?: string;
  error?: string;
  touched?: boolean;
  containerStyle?: string;
  inputStyle?: string;
  labelStyle?: string;
  children?: React.ReactNode;
  rightIcon?: React.ReactNode;
  clickable?: boolean; // updated to boolean
}

export const Input = ({
  isTextArea,
  label,
  error,
  touched,
  className,
  containerStyle,
  labelStyle,
  inputStyle,
  children,
  rightIcon,
  clickable,
  ...props
}: IInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePassword = () => setIsPasswordVisible(!isPasswordVisible);
  const isPasswordInput =
    /password/gi.test(`${props.name}`) || /password/gi.test(`${props.type}`);

  return (
    <div
      className={twMerge(
        `w-full flex flex-col min-h-[64px] gap-1 py-1 overflow-hidden border bg-white rounded-2xl 
        has-[input:focus-within]:border-grey-600 
        ${clickable ? "cursor-pointer" : ""}`,
        error ? "text-error-5 border-red-600/[0.06]" : "border-[#E8E9EB]",
        containerStyle
      )}
      onClick={clickable ? props.onClick : undefined}
    >
      {label && (
        <label
          htmlFor={props.name}
          className={twMerge(
            `flex capitalize px-4 leading-[100%] items-center text-xs font-medium text-grey-500`,
            labelStyle
          )}
        >
          {label}
          {props.required && <>*</>}
        </label>
      )}
      <div
        className={twMerge(
          "relative rounded text-base flex-1 w-full flex items-center justify-between",
          className
        )}
      >
        <>{children}</>
        <input
          autoComplete="off"
          {...props}
          readOnly={clickable ? true : props.readOnly}
          type={
            isPasswordInput && isPasswordVisible ? "text" : props.type || "text"
          }
          className={twMerge(
            "border-none px-4 autofill:bg-white ring-0 outline-none rounded w-full placeholder:font-body bg-inherit",
            isPasswordInput && "pr-12",
            inputStyle
          )}
        />
        {clickable && (
          <FiChevronRight
            className="absolute right-3 top-1 -translate-y-1/2 text-black"
            size={20}
          />
        )}
        {rightIcon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightIcon}
          </span>
        )}
      </div>
      {error && (
        <span className="my-1 px-4 text-xs text-red-700 break-words max-w-fit">
          {error}
        </span>
      )}
    </div>
  );
};
