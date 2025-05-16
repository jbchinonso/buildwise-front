"use client";
import { Eye, EyeSlash } from "iconsax-react";
import { useState } from "react";
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
  ...props
}: IInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePassword = () => setIsPasswordVisible(!isPasswordVisible);
  const isPasswordInput =
    /password/gi.test(`${props.name}`) || /password/gi.test(`${props.type}`);
  return (
    <div
      className={twMerge(
        `w-full flex flex-col min-h-[64px] gap-2 py-1  overflow-hidden border  bg-white rounded-2xl has-[input:focus-within]:border-grey-600`,
        error ? "text-error-5 border-red-600/[0.06]" : "border-[#E8E9EB]",
        containerStyle
      )}
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
      {isTextArea ? (
        <textarea
          {...props}
          className={twMerge(
            `border focus:ring-1 r.ing-offset-1 focus:outline-none  border-[#D1D1D1] p-3 text-brand-black-100 px-4 rounded flex-1 w-full  placeholder:font-body ${
              touched && error
                ? "text-error-1 border-error-1"
                : "border-[#CCC] text-[#020202]"
            }`,
            className
          )}
        />
      ) : props.type === "checkbox" ? (
        <CheckboxInput {...props} />
      ) : props.type === "radio" ? (
        <RadioInput {...props} />
      ) : (
        <>
          <div
            className={twMerge(
              "relative rounded text-base flex-1 w-full justify-start flex items-center",
              className
            )}
          >
            <>{children}</>
            <input
              {...props}
              type={`${
                isPasswordInput && isPasswordVisible ? "text" : props.type
              }`}
              className={twMerge(
                "border-none px-4 autofill:bg-white ring-0 outline-none rounded w-full placeholder:font-body bg-inherit",
                isPasswordInput && "pr-12",
                inputStyle
              )}
            />
            {isPasswordInput && props.value && (
              <button
                type="button"
                className={`text-black z-10 absolute text-sm right-3 top-[50%] -translate-y-[50%] px-2`}
                onClick={togglePassword}
              >
                {isPasswordVisible ? (
                  <Eye
                    size={16}
                    color="currentColor"
                    className="text-current"
                  />
                ) : (
                  <EyeSlash
                    size={16}
                    color="currentColor"
                    className="text-current"
                  />
                )}
              </button>
            )}
            {rightIcon && (
              <span
                className={`absolute text-sm right-3 top-[50%] -translate-y-[50%] px-2`}
              >
                {" "}
                {rightIcon}{" "}
              </span>
            )}
          </div>
        </>
      )}
      {/* </div> */}
      {error && (
        <span className="my-1 text-xs text-red-700 break-words max-w-fit">
          {error}
        </span>
      )}
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CheckboxInput = (props: any) => (
  <input
    type="checkbox"
    {...props}
    className={`w-[16px] h-[16px] rounded-[4px] border border-[#767778] cursor-pointer ${
      props.className || ""
    }`}
  />
);

interface ICheckboxInput
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  error?: string;
  touched?: boolean;
  containerStyle?: string;
  inputStyle?: string;
  labelStyle?: string;
  children?: React.ReactNode;
  text?: React.ReactNode;
  textStyle?: string;
}

export const CheckboxInputTim = ({
  label,
  // error,
  // touched,
  text,
  className,
  containerStyle,
  labelStyle,
  textStyle,
  ...props
}: ICheckboxInput) => (
  <>
    <legend
      className={twMerge(
        "flex gap-4 items-center",
        containerStyle ? containerStyle : ""
      )}
    >
      <input
        type="checkbox"
        {...props}
        className={`w-[16px] h-[16px] border border-brand-blue text-brand-blue placeholder:brand-blue cursor-pointer ${
          className ? className : ""
        }`}
      />
      <label
        className={twMerge(
          labelStyle ? labelStyle : "",
          "first-letter:capitalize"
        )}
        htmlFor={props.id}
      >
        {label}
      </label>
    </legend>
    {text && <div className={`${textStyle ? textStyle : ""} pl-8`}>{text}</div>}
  </>
);

interface IRadioButtonInput
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  error?: string;
  touched?: boolean;
  containerStyle?: string;
  inputStyle?: string;
  labelStyle?: string;
  children?: React.ReactNode;
  text?: React.ReactNode;
  textStyle?: string;
}

export const RadioInput = ({
  label,
  // error,
  // touched,
  text,
  className,
  containerStyle,
  labelStyle,
  textStyle,
  // children,
  ...props
}: IRadioButtonInput) => (
  <>
    <legend
      className={twMerge(
        "flex gap-4 items-center",
        containerStyle ? containerStyle : ""
      )}
    >
      <input
        type="radio"
        {...props}
        className={`w-[16px] h-[16px] border border-brand-blue text-brand-blue placeholder:brand-blue cursor-pointer ${
          className ? className : ""
        }`}
      />
      <label
        className={twMerge(labelStyle ? labelStyle : "", "cursor-pointer")}
        htmlFor={props.id}
      >
        {label}
      </label>
    </legend>
    {text && <div className={`${textStyle ? textStyle : ""} pl-8`}>{text}</div>}
  </>
);
interface ITIMRadioButtonInput
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  error?: string;
  touched?: boolean;
  containerStyle?: string;
  inputStyle?: string;
  labelStyle?: string;
  children?: React.ReactNode;
  text?: React.ReactNode;
  textStyle?: string;
}

export const RadioInputTim = ({
  label,
  // error,
  // touched,
  text,
  className,
  containerStyle,
  labelStyle,
  textStyle,
  // children,
  ...props
}: ITIMRadioButtonInput) => (
  <>
    <legend
      className={twMerge(
        "flex gap-4 items-center",
        containerStyle ? containerStyle : ""
      )}
    >
      {/* I'm yet to make this functional; so that when you uncheck 
      the radio input the div "covering" it should have a bg-color of white. I was planning to use state and the control the input's checked- state with  the state  */}
      <div
        className="flex items-center justify-center relative border-[2px] bg-white border-primarycolortadi6 
      rounded-full w-[20px] h-[20px]"
      >
        <input
          type="radio"
          {...props}
          className={`appearance-none z-10 w-[10.8px] opacity-0 h-[10.8px] border border-brand-blue text-brand-blue placeholder:brand-blue cursor-pointer ${
            className ? className : ""
          }`}
        />
        <div className="absolute w-[10.8px] h-[10.8px] bg-primarycolortadi6 rounded-full text-primarycolortadi6 overflow-hidden">
          .
        </div>
      </div>

      {label && (
        <label
          className={twMerge(labelStyle ? labelStyle : "")}
          htmlFor={props.id}
        >
          {label}
        </label>
      )}
    </legend>
    {text && <div className={`${textStyle ? textStyle : ""} pl-8`}>{text}</div>}
  </>
);
