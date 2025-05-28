import { clsx, type ClassValue } from "clsx"
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