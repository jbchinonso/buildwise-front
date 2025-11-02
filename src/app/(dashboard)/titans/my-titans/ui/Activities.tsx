import { Input } from "@/components/ui";
import Properties from "./Properties";
import SubTitans from "./SubTitans";
import { toAmount } from "@/lib/utils";

export default function Activities() {
  const activities = {
    properties: 0,
    clients: 0,
    subTitans: 0,
    totalRevenue: 0,
    referralCommission: 0,
  };
  return (
    <section className="w-full flex flex-wrap justify-between gap-4">
      <Properties data={activities?.properties || 0} />
      <Input
        label="Clients"
        defaultValue={toAmount(activities?.clients || 0, false)}
        type="text"
        labelStyle="text-[#7A7F83]"
        readOnly
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)] cursor-pointer"
      />
      <SubTitans data={activities?.subTitans || 0} />
      <Input
        label="Total revenue"
        defaultValue={toAmount(activities?.totalRevenue || 0)}
        type="text"
        labelStyle="text-[#7A7F83]"
        readOnly
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)] cursor-pointer"
      />

      <Input
        label="My referral commission"
        defaultValue={toAmount(activities?.referralCommission || 0)}
        type="text"
        labelStyle="text-[#7A7F83]"
        readOnly
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)] cursor-pointer"
      />
    </section>
  );
}
