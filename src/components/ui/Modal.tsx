// "use client";
// import { motion } from "framer-motion";
// import SuccessIcon from "@/icons/SuccessIcon.svg";
// // import { SVGProps } from "react";
// import Image from "next/image";

// interface ModalProps {
//   title?: string;
//   message?: string;
//   type?: "success" | "error";
//   email?: string;
//   onClose: () => void;
// }

// const Modal = ({ title, message, type = "success", email, onClose }: ModalProps) => {
// //   const iconColor = type === "success" ? "text-green-500" : "text-red-500";

// //   const IconComponent =
// //     type === "success"

// //       ? <Image src={SuccessIcon} alt="Success" width={48} height={48} className="mx-auto mb-3" />
// //       : null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md text-center"
//       >
//         {/* {IconComponent && (
//           <IconComponent className={`mx-auto h-12 w-12 mb-3 ${iconColor}`} />
//         )} */}

//         {title && <h2 className="text-2xl font-semibold mb-2">{title}</h2>}

//         {message && <p className="text-gray-700">{message}</p>}

//         {email && (
//           <p className="text-sm text-gray-600 mt-2">
//             Use this link <span className="font-semibold text-blue-600">{email}</span> to complete your registration.
//           </p>
//         )}

//         <button
//           onClick={onClose}
//           className="mt-5 px-4 py-2 w-full  bg-[#024533] text-white rounded-4xl"
//         >
//           Done
//         </button>
//       </motion.div>
//     </div>
//   );
// };

// export default Modal;
"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ModalProps {
  onClose?: () => void;
  children?: ReactNode;
  width?: string; 
  height?: string; 
  backgroundColor?: string; 
  borderRadius?: string; 
  customClassName?: string; 
}

const Modal = ({
  onClose,
  children,
  width = "max-w-md",
  height = "h-auto",
  backgroundColor = "bg-white",
  borderRadius = "rounded-4xl",
  customClassName,
}: ModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={`shadow-xl text-center relative w-full p-6
          ${width} ${height} ${backgroundColor} ${borderRadius} ${customClassName || ""}`}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Modal;
