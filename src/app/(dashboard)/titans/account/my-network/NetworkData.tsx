"use client";
import { Input } from "@/components/ui";
import { toAmount } from "@/lib/utils";

export const NetworkData = () => {
  const data = {
    titans: 0,
    subTitans: 0,
    totalRevenue: 0,
    totalRevenueMyTitans: 0,
    totalRevenueSubTitans: 0,
    totalCommission: 0,
  };
  return (
    <section className="w-full flex flex-wrap justify-between gap-4 gap-x-20">
      <Input
        label="Titans"
        defaultValue={toAmount(data?.titans || 0, false)}
        readOnly
        placeholder="Enter client residential address"
        labelStyle="text-[#292A2C]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />
      <Input
        label="Sub-Titans"
        defaultValue={toAmount(data?.subTitans || 0, false)}
        readOnly
        placeholder="Enter client residential address"
        labelStyle="text-[#292A2C]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />
      <Input
        label="Total revenue by all titans"
        defaultValue={toAmount(data?.totalRevenue || 0)}
        labelStyle="text-[#292A2C]"
        readOnly
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />

      <Input
        label="Total revenue by my titans"
        defaultValue={toAmount(data?.totalRevenueMyTitans || 0)}
        readOnly
        labelStyle="text-[#292A2C]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />
      <Input
        label="Total revenue by sub-titans"
        defaultValue={toAmount(data?.totalRevenueSubTitans || 0)}
        readOnly
        labelStyle="text-[#292A2C]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />
      <Input
        label="Total commission earned"
        defaultValue={toAmount(data?.totalCommission || 0)}
        readOnly
        labelStyle="text-[#292A2C]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />
    </section>
  );
};

export default NetworkData;
