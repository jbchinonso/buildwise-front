import { Input } from "@/components/ui";
import { X } from "lucide-react";


const RecoverPasswordModal = ({email,setEmail,onCancel,onRecover,}: {
  email: string;
  setEmail: (v: string) => void;
  onCancel: () => void;
  onRecover: () => void;
}) => {
  return (
    <div className="px-2">
      <div className="flex items-center justify-between mb-2 ">
        <h2 className="text-lg font-semibold ">Recover Password</h2>
        <button className="w-5 h-5 text-black " onClick={onCancel}>
        <X className="w-5 h-5" />
        </button>
      </div>
      <div className="text-left ">
      <p className="text-sm text-gray-600 mb-4">
        Enter your email to receive a link for resetting your password.
      </p>
      </div>

      
    <div className=" mt-9">
      <Input
        type="email"
        name="recoverEmail"
        placeholder="Enter your email"
        label="Email address"
        value={email}
        required    
        onChange={(e) => setEmail(e.target.value)}
        className="rounded-xs"
      />
     </div> 

      <div className="flex justify-between gap-2 mt-11">
        <button
          onClick={onCancel}
          className="w-72 px-2 py-4 rounded-4xl text-sm bg-[#E8E9EB]"
        >
          Cancel
        </button>
        <button
          onClick={onRecover}
          className="w-72 px-2 py-4 bg-[#024533] text-white rounded-4xl text-sm"
        >
          Recover Password
        </button>
      </div>
    </div>
  );
};
export default RecoverPasswordModal;
