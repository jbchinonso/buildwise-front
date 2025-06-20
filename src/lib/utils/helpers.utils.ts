import { clsx, type ClassValue } from "clsx"
import { User } from "next-auth";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Description placeholder
 *
 * @param {string} textToCopy 
 * @param {string} [name="Text"] 
 */
export const copyTextToClipboard = (textToCopy: string, name = "Text") => {
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toast.dismiss();
        toast.success(`${name} copied to clipboard`);
        // console.log("Text copied to clipboard");
      })
      .catch((err) => {
        toast.dismiss();
        toast.error("Unable to copy text to clipboard");
        console.error("Unable to copy text to clipboard", err);
      });
  } else {
    const textarea = document.createElement("textarea");
    textarea.value = textToCopy;
    document.body.appendChild(textarea);
    textarea.select();

    try {
      document.execCommand("copy");
      // console.log("Text copied to clipboard");
      toast.success(`${name} copied to clipboard`);
    } catch (err) {
      toast.error("Unable to copy text to clipboard");
      console.error("Unable to copy text to clipboard", err);
    } finally {
      document.body.removeChild(textarea);
    }
  }
};

export function exclude(user: User, keys: string[]) {
  for (let key of keys) {
    delete user[key as keyof User];
  }
  return user;
}

export const maskEmail = (email: string) => {
  // Split the email address into the local part and domain part
  const [localPart, domain] = email.split("@");

  // Determine how many characters to keep at the beginning and end of the local part
  const visibleCharsStart = 3;
  const visibleCharsEnd = 1;

  // Create the masked local part
  const maskedLocalPart =
    localPart.slice(0, visibleCharsStart) +
    "***" +
    localPart.slice(-visibleCharsEnd);

  // Reassemble the masked email address
  const maskedEmail = `${maskedLocalPart}@${domain}`;

  return maskedEmail;
};


type OutputType = "formData" | "object";

export const stripFormData = (
  data: { [key: string]: any } | FormData,
  keysToRemove: string[],
  outputType?: OutputType
  // outputType: OutputType = "formData"
) => {
  if (outputType === "formData") {
    const formData = new FormData();

    if (data instanceof FormData) {
      // If data is FormData, copy its entries to formData
      for (const [key, value] of data.entries()) {
        if (!keysToRemove.includes(key)) {
          formData.append(key, value);
        }
      }
    } else {
      // If data is a plain object, iterate over its keys
      for (const key in data) {
        if (data.hasOwnProperty(key) && !keysToRemove.includes(key)) {
          formData.append(key, data[key]);
        }
      }
    }

    return formData;
  } else {
    // If outputType is 'object', create a plain object
    const result: { [key: string]: any } = {};

    if (data instanceof FormData) {
      // If data is FormData, copy its entries to the plain object
      for (const [key, value] of data.entries()) {
        if (!keysToRemove.includes(key)) {
          result[key] = value;
        }
      }
    } else {
      // If data is a plain object, iterate over its keys
      for (const key in data) {
        if (data.hasOwnProperty(key) && !keysToRemove.includes(key)) {
          result[key] = data[key];
        }
      }
    }

    return result;
  }
};

export function formDataToObject(formData: FormData) {
  const object: any = {};
  formData.forEach((value, key) => {
    object[key] = value;
  });
  return object;
}