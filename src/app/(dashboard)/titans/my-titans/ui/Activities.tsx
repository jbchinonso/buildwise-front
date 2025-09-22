"use client";
import { Input } from "@/components/ui";
import Properties from "./Properties";
import SubTitans from "./SubTitans";


type Transaction = {
  id: string;
  titan: string;
  sales: string;
  revenue: string;
  commission: string;
  joined: string;
  status: string;
};



export default function Activities() {

  return (
    <form className="w-full flex flex-wrap justify-between gap-4">
  
      <Properties/>
      <Input
        label="Clients"
        defaultValue="3"
        name="clients"
        id="clients"
        type="text"
        labelStyle="text-[#7A7F83]"
        readOnly
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)] cursor-pointer"
      />
      <SubTitans/>
      <Input
        label="Total revenue"
        defaultValue="₦17,000,000"
        name="totalRevenue"
        id="totalRevenue"
        type="text"
        labelStyle="text-[#7A7F83]"
        readOnly
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)] cursor-pointer"
      />

      <Input
        label="My referral commission"
        defaultValue="₦67,000"
        name="referralCommission"
        id="referralCommission"
        type="text"
        labelStyle="text-[#7A7F83]"
        readOnly
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)] cursor-pointer"
      />
    </form>
  );
}
