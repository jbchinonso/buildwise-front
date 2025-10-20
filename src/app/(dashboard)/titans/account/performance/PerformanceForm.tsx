"use client";
import { Input } from "@/components/ui";
import { toAmount } from "@/lib/utils";
import TotalCommissionEarned from "./TotalCommissionEarned";

const PerformanceForm = () => {
  const data = {
    totalSales: 0,
    totalRevenue: 0,
    outstanding: 0,
    salesCommission: 0,
    titanCommission: 0,
    totalCommission: 0,
    titans: 0,
  };
  return (
    <section className="w-full flex flex-wrap justify-between gap-4 gap-x-20">
      <Input
        label="Total sales volume"
        defaultValue={toAmount(data?.totalSales || 0)}
        labelStyle="text-[#292A2C]"
        readOnly
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />
      <Input
        label="Total revenue"
        defaultValue={toAmount(data?.totalRevenue || 0)}
        readOnly
        labelStyle="text-[#292A2C]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />
      <Input
        label="Outstanding payments"
        defaultValue={toAmount(data?.outstanding || 0)}
        readOnly
        labelStyle="text-[#292A2C]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />
      <Input
        label="Sales commission earned"
        defaultValue={toAmount(data?.salesCommission || 0)}
        readOnly
        labelStyle="text-[#292A2C]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />

      <Input
        label="Titans commission earned"
        defaultValue={toAmount(data?.titanCommission || 0)}
        readOnly
        labelStyle="text-[#292A2C]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />
      <TotalCommissionEarned
        totalCommissionEarned={data?.totalCommission || 0}
      />
      <Input
        label="Titans"
        defaultValue={toAmount(data?.titans || 0, false)}
        readOnly
        labelStyle="text-[#292A2C]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />
    </section>
  );
};

export default PerformanceForm;
